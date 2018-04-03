import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {logoutAction} from '../../../store/actions/auth';
import DeskArea from '../DeskArea/DeskArea';
import ItemModal from '../ItemModal/ItemModal';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutAction();
    }


    render() {
        return (
            <div>
                {this.props.isAuthRequesting || this.props.isDeskRequesting ? <div className="fader"></div> : null}
                <Toolbar style={{
                    backgroundColor: '#b7b7b7',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }} >
                    <ToolbarGroup>
                        <ToolbarTitle text="Simple React Desk"/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <RaisedButton label="Logout" secondary={true} style={{width: '120px'}} onClick={this.handleLogout} />
                    </ToolbarGroup>
                </Toolbar>

                <DeskArea />
                
                <ItemModal/>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logoutAction: () => {
        dispatch(logoutAction());
    }
});

const mapStateToProps = state => ({
    isAuthRequesting: state.auth.isRequesting,
    isDeskRequesting: state.desk.isRequesting,
    isLoggedIn: state.auth.isLoggedIn,
    // token: state.auth.token,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));