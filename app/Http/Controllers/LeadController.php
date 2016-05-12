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
        $lead->subproduct_id = $this->getSubproductId($request->subproduct); //this value can be null
        
        $lead->save();
        return response($lead);
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
		return response()->json(Lead::all());
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

    private function getSubproductId($slug)
    {
        $subproduct = Subproduct::whereSlug($slug)->first();

        if ($subproduct != null) {
            $subproduct->id;
        } 

        return null;
    }
}