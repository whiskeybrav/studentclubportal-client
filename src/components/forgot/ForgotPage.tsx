
import * as React from 'react';
import api from '../../api';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import handleInputChange from '../../handleInputChange';

interface fogotPageState {
    isDone: boolean
    email: string
    isLoading: boolean
    error: string
}

export default class ForgotPage extends React.Component<{}, fogotPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isDone: false,
            email: "",
            isLoading: false,
            error: ""
        }
    }

    async submit() {
        this.setState({
            isLoading: true
        })
        let result = await api.POST("auth/requestPasswordReset", { email: this.state.email })
        if (result.error) {
            this.setState({
                error: result.error,
                isLoading: false
            })
        } else {
            this.setState({
                isDone: true,
                isLoading: false
            })
        }
    }

    render() {
        if (this.state.isDone) {
            return <div>
                <div className="hero is-success is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h1 className="title">
                                Password Reset Request Submitted
                            </h1>
                            <h2 className="subtitle">
                                We've sent you an email with instructions to select a new password.
                            </h2>
                        </div>
                    </div>
                </div></div>
        }
        return <div>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Forgot Password
                        </h1>
                        <h2 className="subtitle">
                            No worries, it happens to the best of us.
                    </h2>
                    </div>
                </div>
            </div>
            <div className="section">
                {this.state.isLoading ? <div className="container">
                    <h4 className="title">Submitting Request...</h4>
                    <progress className="progress" max="100">Loading...</progress>
                </div> :
                    <div className="container">
                        <div className="columns">
                            <div className="column two-thirds">
                                {this.state.error != "" && <div className="notification is-danger">{api.parseError(this.state.error)}</div>}
                                <div className="field">
                                    <label className="label">Email Address</label>
                                    <div className="control">
                                        <input className="input" type="email" name="email" value={this.state.email} onChange={handleInputChange.bind(this)} />
                                    </div>
                                </div>
                                <button className="button is-primary" onClick={this.submit.bind(this)}>Send password reset!</button>
                            </div>
                            <div className="column one-third">
                                <h1 className="title is-6">Forgot which email you used?</h1>
                                <p>Reach out to us at <a href="mailto:studentclubs@whiskeybravo.org">studentclubs@whiskeybravo.org</a>.</p>
                                <hr />
                                <p className="title is-6">Know your password?</p>
                                <p><Link to="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    }
}