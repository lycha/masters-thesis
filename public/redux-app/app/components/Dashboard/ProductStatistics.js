import React from 'react';

class ProductStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProductStatistics';
    }
    render() {
        return (
        	<div className="col-md-4 col-sm-4 mb">
              <div className="darkblue-panel pn">
                <div className="darkblue-header">
                    <h3>GLOBAL CITIZEN STATISTICS</h3>
                </div>
                <footer>
                    <div className="centered">
                        <p>Number of leads in total. Whoohoo!</p>
                        <h4><i className="fa fa-trophy"></i> <val id="numberOfLeadsGC"></val></h4>
                        <p>Number of open in total!</p>
                        <h4><i className="fa fa-trophy"></i> <val id="numberOfOpenGC"></val></h4>
                        <p>Conversion rate from lead to open.</p>
                        <h4><i className="fa fa-trophy"></i> <val id="conversionLeadToOpenGC">%</val></h4>
                    </div>
                </footer>
              </div>
            </div>
        );
    }
}

export default ProductStatistics;
