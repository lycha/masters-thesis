import React from 'react';

class Conversion extends React.Component {
    
    constructor(props) {
        super(props);
        this.displayName = 'Conversion';
        this.conversionLeadToOpen= 0;
    }
    
    componentWillUpdate(nextProps, nextState) {
      if (typeof nextProps.registrationsCount != 'undefined' && typeof nextProps.leadsCount != 'undefined') {
        let conversion = Number((nextProps.registrationsCount.count/nextProps.leadsCount.count * 100).toFixed(1));
        this.conversionLeadToOpen = conversion;
      }
    }

    render() {
        return (
        	<div className="col-md-4 col-sm-4 mb">
              <div className="green-panel pn">
                <div className="green-header">
                  <h3>Conversion</h3>
                </div>
                <div id="conversionLeadToOpen"></div>
                  <div className="centered">
                    <h1><val id="conversionNumber">{ this.conversionLeadToOpen }</val>%</h1>
                    <h4>That is a kickass conversion!</h4>
                    <h1><i className="fa fa-thumbs-o-up"></i></h1> 
                  </div>
              </div>
            </div>
        );
    }
}

export default Conversion;
