import React from 'react';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LineChart';
    }
    render() {
        return (
        	<div className="col-lg-12">
              <div className="content-panel">
                <h4><i className="fa fa-angle-right"></i> Leads</h4>
                <div className="panel-body">
                    <div id="leadChart" styles="height: 250px;"></div>
                </div>
              </div>
            </div>
        );
    }
}

export default LineChart;
