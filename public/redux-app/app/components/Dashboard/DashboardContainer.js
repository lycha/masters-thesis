import React from 'react';
import ProgramLogo from './ProgramLogo';
import GlobalStatistics from './GlobalStatistics';
import Conversion from './Conversion';
import ProductStatistics from './ProductStatistics';
import LeadsStatisticsChart from './LeadsStatisticsChart';
import AnalysisParameters from './AnalysisParameters'
import store from '../../store';
import {getCampaigns} from '../../api/CampaignsApi';
import {getLeadsStatistics} from '../../api/AnalysisApi';
import { connect } from 'react-redux';

class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DashboardContainer';
        this.showAnalysis = this.showAnalysis.bind(this);
        getCampaigns();
        getLeadsStatistics(this.props.startDate,
          this.props.endDate, 1);
    }
    showAnalysis() {
      getLeadsStatistics(this.props.startDate,
        this.props.endDate, 3,1);
    }
    render() {
        return (
          <section id="main-content">
          <section className="wrapper">
          <div className="row mt">
            <div className="col-md-12 col-sm-12 mb">
              <AnalysisParameters 
                campaigns={this.props.campaigns} 
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                showAnalysis={this.showAnalysis}/>
      
              <h4>Generate CSV file</h4>
    
              <button className="btn btn-success" id="generate-xls-button" type="button">Generate Data</button>
            </div>
          </div>
          <div className="row mt">
            
            <ProgramLogo />

            <GlobalStatistics />
            
            <Conversion />

            <ProductStatistics />
            
          </div>
          <div className="row mt">
            <LeadsStatisticsChart leadsStatistics={this.props.leadsStatistics}/>
          </div>
          <div className="row mt">
            <div className="col-lg-12">
              <div className="content-panel">
                  <h4><i className="fa fa-angle-right"></i> Open</h4>
                  <div className="panel-body">
                      <div id="openChart" styles="height: 250px;"></div>
                  </div>
              </div>
            </div>
          </div>
          </section>
          </section>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    campaigns: store.campaignState.campaigns,
    entities: store.entityState.entities,
    products: store.productState.products,
    startDate: store.analysisState.startDate,
    endDate: store.analysisState.endDate,
    leadsStatistics: store.analysisState.leadsStatistics
  };
};

export default connect(mapStateToProps)(DashboardContainer);
