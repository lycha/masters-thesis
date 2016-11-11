import React from 'react';
import ProgramLogo from './ProgramLogo';
import NumberStatistics from './NumberStatistics';
import Conversion from './Conversion';
import LeadsStatisticsChart from './LeadsStatisticsChart';
import RegisterationsStatisticsChart from './RegisterationsStatisticsChart';
import AnalysisParameters from './AnalysisParameters'
import store from '../../store';
import {getCampaigns} from '../../api/CampaignsApi';
import {getCsvFile, getLeadsCount, getRegistrationsCount} from '../../api/AnalysisApi';
import { connect } from 'react-redux';import _ from 'lodash';

class HomeDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'HomeDashboard';
        this.showAnalysis = this.showAnalysis.bind(this);
        getCampaigns();
        this.entity = "";
        this.product = "";
    }
    
    componentWillMount() {
      getLeadsCount(this.props.startDate, this.props.endDate);
      getRegistrationsCount(this.props.startDate, this.props.endDate);
    }

    showAnalysis() { 
      getLeadsCount(this.props.startDate,
        this.props.endDate, undefined, undefined, this.props.analysisCampaign.slug);
      getRegistrationsCount(this.props.startDate,
        this.props.endDate, undefined, undefined, this.props.analysisCampaign.slug);
    }

    getCsv() {
      getCsvFile(this.props.startDate,
        this.props.endDate, undefined, undefined, this.props.analysisCampaign.slug);
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
    
              <button className="btn btn-success" 
                id="generate-xls-button" 
                type="button"
                onClick={(e) => this.getCsv(e)} >Generate Data</button>
            </div>
          </div>
          <div className="row mt">
            
            <NumberStatistics type="Leads" entityName="total" stats={this.props.leadsCount}/>

            <NumberStatistics type="Registrations" entityName="total" stats={this.props.registrationsCount}/>
              
            <Conversion leadsCount={this.props.leadsCount} registrationsCount={this.props.registrationsCount}/>
            
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
    analysisCampaign: store.analysisState.analysisCampaign,
    leadsCount: store.analysisState.leadsCount,
    registrationsCount: store.analysisState.registrationsCount
  };
};

export default connect(mapStateToProps)(HomeDashboard);
