import React from 'react';
import ProgramLogo from './Dashboard/ProgramLogo';
import GlobalStatistics from './Dashboard/GlobalStatistics';
import Conversion from './Dashboard/Conversion';
import ProductStatistics from './Dashboard/ProductStatistics';
import LineChart from './Dashboard/LineChart';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Dashboard';
    }
    render() {
        return (
          <section id="main-content">
          <section className="wrapper">
          <div className="row mt">
            <div className="col-md-12 col-sm-12 mb">
              <h4>Select parameters of analysis</h4>
      
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
            <LineChart />
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

export default Dashboard;
