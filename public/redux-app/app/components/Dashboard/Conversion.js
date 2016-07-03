import React from 'react';

class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Conversion';
        this.state = {
          conversionLeadToOpen: '22'
        };
    }
    render() {
        return (
        	<div className="col-md-4 col-sm-4 mb">
              <div className="green-panel pn">
                <div className="green-header">
                  <h3>Conversion <val id="conversionNumber">{ this.state.conversionLeadToOpen }</val>%</h3>
                </div>
                <div id="conversionLeadToOpen" styles="height: 170px;"></div>

              </div>
            </div>
        );
    }
}

export default Conversion;
