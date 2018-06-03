import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loginAction} from './store/actions/auth';

import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Desk from './components/desk/Dashboard/Dashboard';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Registration/Register';
import ChartPage from './components/chart/ChartPage/ChartPage';


import Snackbar from 'material-ui/Snackbar';

import './App.css';
import {hideSnackbarAction} from "./store/actions/snackbar";

class App extends Component {

    handleRequestClose = () => {
        this.props.hideSnackbarAction();
    };

    render() {
        return (
            <div>
                {this.props.isRequesting ? <div className="fader"></div> : null}
                <main>
                    <Switch>
                        {/* TODO: Change <Desk/> to ' <Redirect to="/login" /> ' */}
                        <Route exact={true} path="/" render={() => (
                            this.props.isLoggedIn ? <Desk/> : <Desk/>
                        )} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/chart/:id" render={(props, thms) => {console.log(props, thms); return <ChartPage/>}}/>
                    </Switch>
                </main>

                <Snackbar
                    open={this.props.snackbarMessage !== ''}
                    message={this.props.snackbarMessage}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loginAction: (loginObj) => {
        dispatch(loginAction(loginObj));
    },
    hideSnackbarAction: () => {
        dispatch(hideSnackbarAction());
    },
});

const mapStateToProps = state => ({
    isRequesting: state.auth.isRequesting,
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    snackbarMessage: state.snackbar.snackbarMessage
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


