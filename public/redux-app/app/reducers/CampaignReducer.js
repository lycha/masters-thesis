import * as types from '../actions/ActionTypes';
import _ from 'lodash';
import moment from 'moment';

const initialState = {
  campaigns: [],
  expirationDate: moment()
};

const CampaignReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_CAMPAIGNS_SUCCESS:
      var campaigns = _.sortBy(action.campaigns, 'expires_on');
      return Object.assign({}, state, { campaigns: campaigns });

    case types.DELETE_CAMPAIGN_SUCCESS:
      var newData = _.filter(state.campaigns, campaign => campaign.id != action.campaignId);
      var campaigns = _.sortBy(newData, 'expires_on');
      return Object.assign({}, state, { campaigns: campaigns });

    case types.ADD_CAMPAIGN_SUCCESS:
      var newCampaign = state.campaigns.concat([action.campaign]);
      var campaigns = _.sortBy(newCampaign, 'expires_on');
      return Object.assign({}, state, { campaigns: campaigns });

    case types.UPDATE_CAMPAIGN_SUCCESS:
      var newData = _.filter(state.campaigns, campaign => campaign.id != action.campaign.id);
      var newCampaigns = newData.concat([action.campaign]);
      var campaigns = _.sortBy(newCampaigns, 'expires_on');
      return Object.assign({}, state, { campaigns: campaigns });

    case types.EXPIRATION_DATE_SELECTED:
      return Object.assign({}, state, { expirationDate: action.expirationDate });
  }

  return state;
}

export default CampaignReducer;
