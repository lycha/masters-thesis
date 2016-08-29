import React from 'react';
import ProgramLogo from './ProgramLogo';
import NumberStatistics from './NumberStatistics';
import Conversion from './Conversion';
import LeadsStatisticsChart from './LeadsStatisticsChart';
import RegisterationsStatisticsChart from './RegisterationsStatisticsChart';
import AnalysisParameters from './AnalysisParameters'
import store from '../../store';
import {getCampaigns} from '../../api/CampaignsApi';
import {getLeadsStatistics, getRegistrationsStatistics} from '../../api/AnalysisApi';
import { connect } from 'react-redux';
import _ from 'lodash';

class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DashboardContainer';
        this.showAnalysis = this.showAnalysis.bind(this);
        getCampaigns();
        this.entity = "";
        this.product = "";
    }
    
    componentWillUpdate() {
      let pathArray = this.props.location.pathname.split("/");
      //getLeadsStatistics(this.props.startDate, this.props.endDate, this.props.analysisProduct.id, this.props.analysisEntity.id);
      //getRegistrationsStatistics(this.props.startDate, this.props.endDate, this.props.analysisProduct.id, this.props.analysisEntity.id);
    }

    showAnalysis() {
      // getLeadsStatistics(this.props.startDate,
      //   this.props.endDate, 2,1);
      // getRegistrationsStatistics(this.props.startDate,
      //   this.props.endDate, 2,1);
    }
    render() {
        let title = "";
        return (
          <section id="main-content">
          <section className="wrapper">
          <div className="row mt">
            <div className="col-md-12 col-sm-12 mb">
            <h1>Total Analysis</h1>
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
            
            <NumberStatistics type="Leads" entityName="total"/>

            <NumberStatistics type="Registrations" entityName="total"/>
            
            <Conversion />
            
          </div>
          <div className="row mt">
            <LeadsStatisticsChart leadsStatistics={this.props.leadsStatistics}/>
          </div>
          <div className="row mt">
            <RegisterationsStatisticsChart registrationsStatistics={this.props.registrationsStatistics}/>
          </div>
          </section>
          </section>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    campaigns: store.campaignState.campaigns,
    startDate: store.analysisState.startDate,
    endDate: store.analysisState.endDate,
    leadsStatistics: store.analysisState.leadsStatistics,
    registrationsStatistics: store.analysisState.registrationsStatistics
  };
};

export default connect(mapStateToProps)(DashboardContainer);
