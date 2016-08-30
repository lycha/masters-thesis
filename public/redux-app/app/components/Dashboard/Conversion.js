import React from 'react';

class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Conversion';
        this.conversionLeadToOpen= 0;
    }
    
    componentWillUpdate(nextProps, nextState) {
      if (typeof nextProps.registrationsCount != 'undefined' && typeof nextProps.leadsCount != 'undefined') {
        this.conversionLeadToOpen = nextProps.registrationsCount.count/nextProps.leadsCount.count * 100;
      }
    }

    render() {
        return (
        	<div className="col-md-4 col-sm-4 mb">
              <div className="green-panel pn">
                <div className="green-header">
                  <h3>Conversion <val id="conversionNumber">{ this.conversionLeadToOpen }</val>%</h3>
                </div>
                <div id="conversionLeadToOpen" styles="height: 170px;"></div>

              </div>
            </div>
        );
    }
}

export default Conversion;
