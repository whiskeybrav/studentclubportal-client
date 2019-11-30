
import * as React from 'react';
import api from '../../api';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import handleInputChange from '../../handleInputChange';

interface loginPageState {
    email: string
    password: string
    error: string
    isLoading: boolean
    redirectTo: string
}

interface loginPageProps {
    getAuthMe(): void
}

export default class LoginPage extends React.Component<loginPageProps, loginPageState> {
    constructor(props: loginPageProps) {
        super(props);
        this.state = {
            redirectTo: "",
            email: "",
            password: "",
            error: "",
            isLoading: false
        }
    }

    async login() {
        this.setState({
            isLoading: true,
            error: ""
        })
        let result = await api.POST("auth/login", {
            email: this.state.email,
            password: this.state.password,
        })
        if (result.error) {
            this.setState({
                isLoading: false,
                error: api.parseError(result.error)
            })
            return;
        }
        else {
            this.props.getAuthMe()
            this.setState({
                isLoading: false,
                redirectTo: "/s/" + result.school
            })
        }
    }

    render() {
        if (this.state.redirectTo != "") {
            return <Redirect to={this.state.redirectTo} />
        }
        return <div>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Log in
                        </h1>
                        <h2 className="subtitle">
                            Welcome back!
                    </h2>
                    </div>
                </div>
            </div>
            <div className="section">
                {this.state.isLoading ? <div className="container">
                    <h4 className="title">Logging in...</h4>
                    <progress className="progress" max="100">Loading...</progress>
                </div> :
                    <div className="container">
                        <div className="columns">
                            <div className="column two-thirds">
                                {this.state.error && <div className="notification is-danger">
                                    <button className="delete" onClick={() => this.setState({ error: "" })}></button>
                                    {this.state.error}
                                </div>}
                                <div className="field">
                                    <label className="label">Email Address</label>
                                    <div className="control">
                                        <input className="input" type="email" name="email" value={this.state.email} onChange={handleInputChange.bind(this)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input className="input" type="password" name="password" value={this.state.password} onChange={handleInputChange.bind(this)} />
                                    </div>
                                </div>
                                <button className="button is-primary" onClick={this.login.bind(this)}>Log in!</button>
                            </div>
                            <div className="column one-third">
                                <h1 className="title">Login trouble?</h1>
                                <p className="subtitle">No problem! It happens to the best of us.</p>
                                <hr />
                                <p className="title is-6">Forgot your password?</p>
                                <p><Link to="/forgot">Regain access to your account.</Link></p>
                                <hr />
                                <p className="title is-6">Lost access to your registration email?</p>
                                <p>Reach out to us at <a href="mailto:studentclubs@whiskeybravo.org">studentclubs@whiskeybravo.org</a> so we can help.</p>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    }
}