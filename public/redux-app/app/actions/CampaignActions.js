import * as types from '../actions/ActionTypes';

export function getCampaignsSuccess(campaigns) {
  return {
    type: types.GET_CAMPAIGNS_SUCCESS,
    campaigns
  };
}

export function deleteCampaignSuccess(campaignId) {
  return {
    type: types.DELETE_CAMPAIGN_SUCCESS,
    campaignId
  };
}

export function updateCampaignSuccess(campaign) {
  return {
    type: types.UPDATE_CAMPAIGN_SUCCESS,
    campaign
  };
}

export function addCampaignSuccess(campaign) {
  return {
    type: types.ADD_CAMPAIGN_SUCCESS,
    campaign
  };
}

export function expirationDateSelected(expirationDate) {
  return {
    type: types.EXPIRATION_DATE_SELECTED,
    expirationDate
  };
}