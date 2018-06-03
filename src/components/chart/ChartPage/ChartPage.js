import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

class ChartPage extends React.Component {

    render() {
        return <div>ChartPage</div>
    }
}

export default withRouter(connect()(ChartPage));