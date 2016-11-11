import React from 'react';

class NumberStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NumberStatistics';
        this.statsCount = "";
        this.entityName = "total";
    }

    componentWillUpdate(nextProps, nextState) {
        if(typeof nextProps.stats != "undefined") {
            this.statsCount = nextProps.stats.count;
        }
        if (typeof nextProps.entity != "undefined") {
            this.entityName = nextProps.entity.name;
        } else {
            this.entityName = nextProps.entityName;
        }
    }

    render() {
        return (
        	<div className="col-md-4 col-sm-4 mb">
              <div className="darkblue-panel pn">
                <div className="darkblue-header">
                    <h3>{this.props.type} in {this.entityName}</h3>
                </div>
                <footer>
                  <div className="centered">
                    <h1>#<val id="stats">{ this.statsCount }</val></h1>
                    <h4>Whoohoo! Good Job!</h4>
                    <h1><i className="fa fa-trophy"></i> </h1>
                  </div>
                </footer>
              </div>
            </div>
        );
    }
}

export default NumberStatistics;
