import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {registerAction} from '../../../store/actions/auth';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../Login/Login.css'


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
        console.log(this.props)
        this.state = {
            emailValue: 'q',
            emailValueErrorText: '',
            passwordValue: 'q',
            passwordValueErrorText: '',
            confirmPasswordValue: 'q',
            confirmPasswordValueErrorText: '',
        }
    }


    onInput(event, newValue) {
        const errorVar = `${event.currentTarget.name}ErrorText`;
        console.log(event.currentTarget.name);
        this.setState({[event.currentTarget.name]: newValue});
        this.setState({[errorVar]: ''});
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.emailValue === '') {
            this.setState({emailValueErrorText: 'Email is required'})
            return;
        }
        if (this.state.passwordValue === '') {
            this.setState({passwordValueErrorText: 'Password is required'})
            return;
        }

        if (this.state.confirmPasswordValue === '') {
            this.setState({confirmPasswordValueErrorText: 'Confirm Password field is required'})
            return;
        }

        this.props.registerAction({
            password: this.state.passwordValue,
            email: this.state.emailValue
        });

        document.getElementsByTagName('form')[0].reset();

        console.log('validation passed: ',this.state);
    }

    render() {
        return (
            <div>
                {this.props.isRequesting ? <div className="fader"></div> : null}
                <Link to="/login"><RaisedButton label="Login" secondary={true} style={{width: '120px', color: 'black', position: 'absolute', top: 30, right: 35}} /></Link>

                <div className="auth-wrapper">
                    <div className="auth auth-logo"></div>
                    <div className="auth-divider"></div>
                    <form onSubmit={this.onSubmit} className="auth auth-form">
                        <div>
                            <TextField
                                fullWidth={true}
                                name="emailValue"
                                hintText="Enter your email"
                                floatingLabelText="Email"
                                errorText={this.state.emailValueErrorText}
                                onChange={(event, newValue) => this.onInput(event, newValue)}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth={true}
                                name="passwordValue"
                                hintText="Enter password"
                                floatingLabelText="Password"
                                type="password"
                                errorText={this.state.passwordValueErrorText}
                                onChange={(event, newValue) => this.onInput(event, newValue)}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth={true}
                                name="confirmPasswordValue"
                                hintText="Confirm password"
                                floatingLabelText="Confirm Password"
                                type="password"
                                errorText={this.state.confirmPasswordValueErrorText}
                                onChange={(event, newValue) => this.onInput(event, newValue)}
                            />
                        </div>
                        <div className="auth-raised-button">
                            <RaisedButton
                                type="submit"
                                label="Register"
                                primary={true}
                                style={{margin: '15px'}}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    registerAction: (loginObj) => {
        dispatch(registerAction(loginObj));
    }
});

const mapStateToProps = state => ({
    isRequesting: state.auth.isRequesting,
    isLoggedIn: state.auth.isLoggedIn,
    // token: state.auth.token,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));

