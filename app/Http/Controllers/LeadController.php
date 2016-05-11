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

use App\Http\Requests;
/**
* 
*/
class LeadController extends Controller
{
	private $LEAD_DOES_NOT_EXIST = "LEAD_DOES_NOT_EXIST";
	
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
        $campaign = Campaign::whereSlug($request->utm_campaign)->first();
        if ($campaign->isActive()) {
            $lead->utm_campaign_id = $campaign->id;
        } else {
            return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'campaign not active.');
        }
        $lead->utm_medium = $request->utm_medium;
        $lead->utm_content = $request->utm_content;
        $lead->utm_term = $request->utm_term;
        $lead->entity_id = Entity::whereSlug($request->entity)->first()->id;
        $lead->product_id = Product::whereSlug($request->product)->first()->id;
        $lead->subproduct_id = Subproduct::whereSlug($request->subproduct)->first()->id;
        
        $lead->save();
        return response($lead);
    }

    public function delete($id)
	{
		$user = Lead::find($id);
		if ($user == null) {
			return response()->json(['error' => ['code' => $this->LEAD_DOES_NOT_EXIST, 
				'title' => 'Lead does not exist.']], 400);
		}
		$user->delete();
	}

	public function view()
	{
		return response()->json(Lead::all());
	}
}