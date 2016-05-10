<?php 
namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\Lead;
use Validator;
use Illuminate\Http\Request;

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
        $lead->utm_campaign = $request->utm_campaign;
        $lead->utm_medium = $request->utm_medium;
        $lead->utm_content = $request->utm_content;
        $lead->utm_term = $request->utm_term;
        $lead->entity = $request->entity;
        $lead->product = $request->product;
        $lead->subproduct = $request->subproduct;
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