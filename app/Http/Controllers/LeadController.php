<?php 
namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\Lead;
use Validator;
use Illuminate\Http\Request;
use App\Campaign;
use App\Entity;
use App\Product;
use App\Subproduct;
use App\Http\Utils\ErrorManager;
use Config;
use DB;

use App\Http\Requests;
/**
* 
*/
class LeadController extends Controller
{	
    /**
     * Create a new flight instance.
     *
     * @param  Request  $request
     * @return Response
     */
    public function create(Request $request)
    {
        $lead = new Lead;
        $lead->utm_source = $request->utm_source;
        $lead->utm_campaign_id = $this->getCampaignId($request->utm_campaign);
        $lead->utm_medium = $request->utm_medium;
        $lead->utm_content = $request->utm_content;
        $lead->utm_term = $request->utm_term;
        $lead->entity_id = $this->getEntityId($request->entity);
        $lead->product_id = $this->getProductId($request->product);
        $lead->subproduct_id = $this->getSubproductId($request->subproduct, $lead->product_id); //this value can be null
        
        $lead->save();
        return response(['lead' => $lead]);
    }

    public function delete($id)
	{
		$user = Lead::find($id);
		if ($user == null) {
            return ErrorManager::error400(ErrorManager::$OBJECT_DOES_NOT_EXIST, 'Lead does not exist.');
		}
		$user->delete();
	}

	public function view()
	{
		return response()->json(['leads'=>Lead::all()]);
	}

    public function count(Request $request)
    {
        if (!$this->validateCountInput($request)) {
            return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
        } 
        $count = "";
        //if entity_id is not provided return for all entities
        if (empty($request->entity)) {
            $count = DB::table('leads')
                ->whereBetween('created_at',[$request->date_from, $request->date_to])
                ->where('product_id', $request->product)
                ->count();
        } else {
            $count = DB::table('leads')
                ->whereBetween('created_at',[$request->date_from, $request->date_to])
                ->where('entity_id', $request->entity)
                ->where('product_id', $request->product)
                ->count();
        }
        
        return response()->json(['leads'=>['count'=>$count]]);
    }

    public function getLeadsAnalysis(Request $request)
    {
        $utm_sources = DB::select("SELECT DISTINCT utm_source FROM utm_source_medium");
        $coalesce = "";
        $sum = "";
        foreach ($utm_sources as $utm_source) {
            $source = preg_replace('/[^a-zA-Z0-9_.]/', '_', $utm_source->utm_source);
            $coalesce = $coalesce.", coalesce(".$source.",0) AS ".$source;
            $sum = $sum.", sum(case when utm_source  = '".
                $source.
                "' then 1 else 0 end) as ".
                $source;
        }

        $select = "SELECT
            date::date".$coalesce."
            FROM
             generate_series(
               '".$request->date_from."'::timestamp,
               '".$request->date_to."'::timestamp,
               '1 day') AS date
            LEFT OUTER JOIN
              (SELECT
                 date_trunc('day', created_at) as day".$sum."
               FROM leads 
            
                 GROUP BY day) results
            ON (date = results.day)";

        var_dump($select);
        $leads = DB::select($select);

        return $leads;
    }

    private function getCampaignId($slug)
    {
        $campaignGeneric = Campaign::whereSlug(Config::get('leads.campaign_generic.slug'))->first();
        $campaign = Campaign::whereSlug($slug)->first();

        if ($campaign != null) {
            if ($campaign->isActive()) {
                return $campaign->id;
            }
        }
        return $campaignGeneric->id;
    }

    private function getEntityId($slug)
    {
        $entityGeneric = Entity::whereSlug(Config::get('leads.entity_generic.slug'))->first();
        $entity = Entity::whereSlug($slug)->first();

        if ($entity != null) {
            return $entity->id;
        } else {
            return $entityGeneric->id;
        }
    }

    private function getProductId($slug)
    {
        $productGeneric = Product::whereSlug(Config::get('leads.product_generic.slug'))->first();
        $product = Product::whereSlug($slug)->first();

        if ($product != null) {
            return $product->id;
        } else {
            return $productGeneric->id;
        }
    }

    private function getSubproductId($slug, $productId)
    {
        $whereQuery = ['slug' => $slug, 'product_id' => $productId];
        $subproduct = Subproduct::where($whereQuery)->first();

        if ($subproduct != null) {
            return $subproduct->id;
        } 

        return null;
    }

    public function validateCountInput(Request $request)
    {
        if (empty($request->date_from) || empty($request->date_to) || empty($request->product)) {
            return false;
        } else {
            return true;
        }
    }

    public function populateLeads()
    {
        for ($i=0; $i < 10; $i++) { 
            Lead::create(['utm_source' => 'facebook',
                            'utm_campaign_id' => 1,
                            'utm_medium' => 'paid',
                            'utm_content' => 'content',
                            'utm_term' => 'terms',
                            'entity_id' => 2,
                            'product_id' => 3,
                            ]);
        }   

        for ($i=0; $i < 19; $i++) { 
            Lead::create(['utm_source' => 'facebook',
                            'utm_campaign_id' => 1,
                            'utm_medium' => 'post',
                            'utm_content' => 'content',
                            'utm_term' => 'terms',
                            'entity_id' => 2,
                            'product_id' => 3,
                            ]);
        }   

        for ($i=0; $i < 7; $i++) { 
            Lead::create(['utm_source' => 'website',
                            'utm_campaign_id' => 1,
                            'utm_medium' => 'header',
                            'utm_content' => 'content',
                            'utm_term' => 'terms',
                            'entity_id' => 2,
                            'product_id' => 3,
                            ]);
        }  

        for ($i=0; $i < 12; $i++) { 
            Lead::create(['utm_source' => 'twitter',
                            'utm_campaign_id' => 1,
                            'utm_medium' => 'standard',
                            'utm_content' => 'content',
                            'utm_term' => 'terms',
                            'entity_id' => 2,
                            'product_id' => 3,
                            ]);
        }   

    }
}