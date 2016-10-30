import React from 'react';

class RegisterationsStatisticsChart extends React.Component {
    componentDidMount() {
        this.keys = ['twitter'];
        //const keys = ['facebook', 'twitter', 'my_source', 'website'];
        this.registrationChart = Morris.Line({
            element: "registrationChart",
            data: this.props.registrationsStatistics,
            xkey: "date",
            ykeys: this.keys,
            labels: this.keys,
            hideHover: 'false',
        });
    }
    componentWillUpdate(nextProps, nextState) {
        this.keys = [];
        for(var k in nextProps.registrationsStatistics[0]) {
            if (k!='date') {
                this.keys.push(k);  
            }
        }
        this.registrationChart.options.ykeys = this.keys;
        this.registrationChart.options.labels = this.keys;
        this.registrationChart.setData(nextProps.registrationsStatistics);
    }
    render() {
        return (
        	<div className="col-lg-12">
              <div className="content-panel">
                <h4><i className="fa fa-angle-right"></i> Registrations</h4>
                <div className="panel-body">
                    <div id="registrationChart" styles="height: 250px;"></div>
                </div>
              </div>
            </div>
        );
    }
}

export default RegisterationsStatisticsChart;
