import React from 'react';
import store from '../../store';
import { connect } from 'react-redux';
import ProductsSelect from './ProductsSelect'
import CampaignsSelect from './CampaignsSelect'
import EntitiesSelect from './EntitiesSelect'

class UrlGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UrlGenerator';
        this.state = {
          productSlug: null,
          campaignSlug: null,
          entitySlug: null,
          url: null,
        };

    }
    getQuery(e){
      e.preventDefault();
      console.log(this.state.productSlug);
      console.log(this.state.campaignSlug);
      console.log(this.state.entitySlug);
      let url = this.refs.url.value;
      if (url.indexOf("?") !== -1) {
        url = url + "&";
      } else {
        url = url + "?";
      }
      url = url + "product=" + this.state.productSlug
                + "&subproduct=" + this.refs.subproduct.value
                + "&utm_source=" + this.refs.utm_source.value
                + "&utm_medium=" + this.refs.utm_medium.value
                + "&utm_campaign=" + this.state.campaignSlug
                + "&entity=" + this.state.entitySlug;
      this.setState({ url: url });
      console.log(url);
    }
    setProduct(slug) {
      this.setState({ productSlug: slug });
    }
    setCampaign(slug) {
      this.setState({ campaignSlug: slug });
    }
    setEntity(slug) {
      this.setState({ entitySlug: slug });
    }
    render() {
        return (
        	<section id="main-content">
	          <section className="wrapper">
	          
	          <div className="row mt">
	          	<div className="col-lg-12">
                  <div className="form-panel">
                  	  <h4 className="mb"><i className="fa fa-angle-right"></i> Generate your tracking URL!</h4>
                      <form className="form-horizontal style-form" onSubmit={(e) => this.getQuery(e)} >
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">Website URL with tracking form</label>
                              <div className="col-sm-10">
                                <input type="text" 
                                  ref="url"
                                  required
                                	type="url"
                                  title="Please enter URL with http:// or https:// prefix."
                                  className="form-control" />
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">Which product you want to promote?</label>
                              <div className="col-sm-10">
                                <ProductsSelect products={this.props.products} setProduct={(e) => this.setProduct(e)}/>
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">Which subproduct you want to promote?</label>
                              <div className="col-sm-10">
                                <input type="text" 
                                  ref="subproduct"
                                  pattern="[a-z\\-]+"
                                  title="Accepted only small letters and -"
                                  className="form-control" />
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">Where you will promote it? (utm_source)</label>
                              <div className="col-sm-10">
                                <input type="text" 
                                  required
                                  ref="utm_source"
                                  title="Accepted only small letters and -"
                                  className="form-control" />
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">Which medium will you use? (utm_medium)</label>
                              <div className="col-sm-10">
                                <input type="text" 
                                  required
                                  ref="utm_medium"
                                  title="Accepted only small letters and -"
                                  className="form-control" />
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">Choose current campaign.</label>
                              <div className="col-sm-10">
                                <CampaignsSelect campaigns={this.props.campaigns} setCampaign={(e) => this.setCampaign(e)}/>
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">Choose entity.</label>
                              <div className="col-sm-10">
                                <EntitiesSelect entities={this.props.entities} setEntity={(e) => this.setEntity(e)}/>
                              </div>
                          </div>
                          <div className="form-group">
                            <div className="col-sm-10">
						                  <button className="btn btn-theme">Generate</button>
                            </div>
                          </div>
                      <div className="form-group">
                        <div className="col-sm-12">
                          <h3>Generated URL:</h3>
                        </div>
                        <div className="col-sm-12">
                          <h4>{this.state.url}</h4>
                        </div>
                      </div>
                      </form>
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
    entities: store.entityState.entities,
    products: store.productState.products,
    campaigns: store.campaignState.campaigns
  };
};
export default connect(mapStateToProps)(UrlGenerator);