import React from 'react';

class LeadsStatisticsChart extends React.Component {
    componentDidMount() {
        this.keys = ['twitter'];
        //const keys = ['facebook', 'twitter', 'my_source', 'website'];
        this.leadChart = Morris.Line({
            element: "leadChart",
            data: this.props.leadsStatistics,
            xkey: "date",
            ykeys: this.keys,
            labels: this.keys,
            hideHover: 'false',
        });
    }
    componentWillUpdate(nextProps, nextState) {
        this.keys = [];
        for(var k in nextProps.leadsStatistics[0]) {
            if (k!='date') {
                this.keys.push(k);  
            }
        }
        this.leadChart.options.ykeys = this.keys;
        this.leadChart.options.labels = this.keys;
        this.leadChart.setData(nextProps.leadsStatistics);
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

export default LeadsStatisticsChart;
