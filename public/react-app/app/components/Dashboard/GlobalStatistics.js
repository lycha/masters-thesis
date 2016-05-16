import React from 'react';

class GlobalStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'GlobalStatistics';
        this.state = {
          numberOfLeads: '1', 
          numberOfOpen: '22'
        };
    }
    render() {
        return (
        	<div className="col-md-4 col-sm-4 mb">
              <div className="darkblue-panel pn">
                <div className="darkblue-header">
                  <h3>GENERAL STATISTICS</h3>
                </div>
                <footer>
                  <div className="centered">
                    <h4>Number of leads in total. Whoohoo!</h4>
                    <h3><i className="fa fa-trophy"></i> <val id="numberOfLeads">{ this.state.numberOfLeads }</val></h3>
                    <h4>Number of open in total!</h4>
                    <h3><i className="fa fa-trophy"></i> <val id="numberOfOpen">{ this.state.numberOfOpen }</val></h3>
                  </div>
                </footer>
              </div>
            </div>
        );
    }
}

export default GlobalStatistics;
