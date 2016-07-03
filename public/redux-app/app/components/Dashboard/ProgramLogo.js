import React from 'react';

class ProgramLogo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProgramLogo';
    }
    render() {
        return (
        	<div className="col-lg-4 col-md-4 col-sm-4 mb">
              <div className="darkblue-panel pn">
                <div id="profile-program">
                  <div className="user">
                    <img className="img-circle" width="200" src="../public/assets/img/gt-logo.png" />
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default ProgramLogo;
