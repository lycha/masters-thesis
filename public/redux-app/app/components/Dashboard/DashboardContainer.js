import React from 'react';
import ProgramLogo from './ProgramLogo';
import Conversion from './Conversion';
import NumberStatistics from './NumberStatistics';
import LeadsStatisticsChart from './LeadsStatisticsChart';
import RegisterationsStatisticsChart from './RegisterationsStatisticsChart';
import AnalysisParameters from './AnalysisParameters'
import DashboardHeader from './DashboardHeader'
import store from '../../store';
import {getCampaigns} from '../../api/CampaignsApi';
import {getLeadsStatistics, getRegistrationsStatistics, getLeadsCount, getRegistrationsCount} from '../../api/AnalysisApi';
import { connect } from 'react-redux';
import _ from 'lodash';

class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DashboardContainer';
        this.showAnalysis = this.showAnalysis.bind(this);
        getCampaigns();
        this.entitySlug = "";
        this.productSlug = "";
        this.entity = {};
        this.product = {};
    }
    
    componentWillMount() {
      getLeadsStatistics(this.props.startDate, this.props.endDate, 
        this.props.params.product, 
        this.props.params.entity);
      getRegistrationsStatistics(this.props.startDate, this.props.endDate, 
        this.props.params.product, 
        this.props.params.entity);
      getLeadsCount(this.props.startDate, this.props.endDate, 
        this.props.params.product, 
        this.props.params.entity);
      getRegistrationsCount(this.props.startDate, this.props.endDate, 
        this.props.params.product, 
        this.props.params.entity);

    }

    componentWillUpdate(nextProps, nextState) {
      this.entity = _.find(nextProps.entities, function(o) { return o.slug == nextProps.params.entity; }.bind(this));
      this.product = _.find(nextProps.products, function(o) { return o.slug == nextProps.params.product; }.bind(this));
      if (this.entitySlug != nextProps.params.entity || this.productSlug != nextProps.params.product) {
        getLeadsStatistics(nextProps.startDate, nextProps.endDate, 
          nextProps.params.product, 
          nextProps.params.entity);
        getRegistrationsStatistics(nextProps.startDate, nextProps.endDate, 
          nextProps.params.product, 
          nextProps.params.entity);

        getLeadsCount(nextProps.startDate, nextProps.endDate, 
          nextProps.params.product, 
          nextProps.params.entity);
        getRegistrationsCount(nextProps.startDate, nextProps.endDate, 
          nextProps.params.product, 
          nextProps.params.entity);
      }
      
      this.entitySlug = nextProps.params.entity;
      this.productSlug = nextProps.params.product;
    }

    showAnalysis() {
      getLeadsStatistics(this.props.startDate,
        this.props.endDate, this.product.slug, this.entity.slug, this.props.analysisCampaign.slug);
      getRegistrationsStatistics(this.props.startDate,
        this.props.endDate, this.product.slug, this.entity.slug, this.props.analysisCampaign.slug);

      getLeadsCount(this.props.startDate,
        this.props.endDate, this.product.slug, this.entity.slug, this.props.analysisCampaign.slug);
      getRegistrationsCount(this.props.startDate,
        this.props.endDate, this.product.slug, this.entity.slug, this.props.analysisCampaign.slug);
    }
    render() {
        return (
          <section id="main-content">
          <section className="wrapper">
          <div className="row mt">
            <div className="col-md-12 col-sm-12 mb">
            <DashboardHeader 
              entity={this.entity}
              product={this.product}
            />
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

            <NumberStatistics type="Leads" entity={this.entity} stats={this.props.leadsCount}/>

            <NumberStatistics type="Registrations" entity={this.entity} stats={this.props.registrationsCount}/>
            
            <Conversion leadsCount={this.props.leadsCount} registrationsCount={this.props.registrationsCount}/>

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
    entities: store.entityState.entities,
    products: store.productState.products,
    startDate: store.analysisState.startDate,
    endDate: store.analysisState.endDate,
    leadsStatistics: store.analysisState.leadsStatistics,
    registrationsStatistics: store.analysisState.registrationsStatistics,
    analysisEntity: store.analysisState.analysisEntity,
    analysisProduct: store.analysisState.analysisProduct,
    leadsCount: store.analysisState.leadsCount,
    registrationsCount: store.analysisState.registrationsCount,
    analysisCampaign: store.analysisState.analysisCampaign
  };
};

export default connect(mapStateToProps)(DashboardContainer);
