import * as React from 'react'
import api from '../../api';
import { Redirect } from 'react-router';
import { throws } from 'assert';
import handleInputChange from '../../handleInputChange';

interface registerStudentState {
    fname: string
    lname: string
    email: string
    password: string
    showLastName: string
    isLoading: boolean
    error: string
    redirectTo: string
    howDidYouHear: string
    gradeLevel: string
}

interface registerStudentProps {
    schoolId: number
    schoolName: string
    schoolDisplayName: string
    getAuthMe(): void
}

export default class RegisterStudent extends React.Component<registerStudentProps, registerStudentState> {
    constructor(props: registerStudentProps) {
        super(props);

        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            showLastName: "true",
            isLoading: false,
            error: "",
            redirectTo: "",
            howDidYouHear: "1",
            gradeLevel: ""
        }
    }

    async submit() {
        this.setState({
            isLoading: true,
            error: ""
        })
        let result = await api.POST("auth/registerStudent", {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password,
            howDidYouHear: this.state.howDidYouHear,
            showsLastName: this.state.showLastName,
            gradeLevel: this.state.gradeLevel,
            schoolId: this.props.schoolId.toString()
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
                redirectTo: "/s/" + this.props.schoolDisplayName
            })
        }
    }


    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
        if (this.state.isLoading) {
            return <div>
                <h4 className="title">Creating your account...</h4>
                <progress className="progress" max="100">Loading...</progress>
            </div>
        }
        return <div>
            {this.state.error && <div className="notification is-danger">
                <button className="delete" onClick={() => this.setState({ error: "" })}></button>
                {this.state.error}
            </div>}
            <h4 className="title">Personal Information</h4>
            <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Joe" name="fname" value={this.state.fname} onChange={handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Schmo" name="lname" value={this.state.lname} onChange={handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">How would you like your name displayed on the club portal?</label>
                {this.state.fname != "" && this.state.lname != "" ? <div className="control">
                    <div className="select">
                        <select value={this.state.howDidYouHear} onChange={handleInputChange.bind(this)} name="showLastName">
                            <option value="true">{this.state.fname} {this.state.lname}</option>
                            <option value="false">{this.state.fname}</option>
                        </select>
                    </div>
                </div> : <div className="notification is-warning">
                        Add a first and last name to access this setting
                </div>}
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input className="input" type="email" placeholder="jschmo@usna.edu" name="email" value={this.state.email} onChange={handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" type="password" placeholder="superSecurePassword1!" name="password" value={this.state.password} onChange={handleInputChange.bind(this)} />
                </div>
                <p className="help">Your password must be at least 8 digits and contain at least one letter and at least one number.</p>
            </div>
            <div className="field">
                <label className="label">School</label>
                <div className="control">
                    <input className="input" type="text" disabled value={this.props.schoolName} />
                </div>
                <p className="help">Access your school portal at myclub.whiskeybravo.org/{this.props.schoolDisplayName}.</p>
            </div>
            <div className="field">
                <label className="label">What grade are you in?</label>
                <div className="control">
                    <div className="select">
                        <select value={this.state.howDidYouHear} onChange={handleInputChange.bind(this)} name="gradeLevel">
                            <option value="1">First Grade</option>
                            <option value="2">Second Grade</option>
                            <option value="3">Third Grade</option>
                            <option value="4">Fourth Grade</option>
                            <option value="5">Fifth Grade</option>
                            <option value="6">Sixth Grade</option>
                            <option value="7">Seventh Grade</option>
                            <option value="8">Eighth Grade</option>
                            <option value="9">Ninth Grade</option>
                            <option value="10">Tenth Grade</option>
                            <option value="11">Eleventh Grade</option>
                            <option value="12">Twelfth Grade</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* <div className="field">
                <label className="label">How did you hear about Whiskey Bravo?</label>
                <div className="control">
                    <div className="select">
                        <select value={this.state.howDidYouHear} onChange={this.handleInputChange.bind(this)} name="howDidYouHear">
                            <option value="1">Through a friend</option>
                            <option value="1">Through a friend</option>
                        </select>
                    </div>
                </div>
            </div> */}
            <button className="button is-primary" onClick={this.submit.bind(this)}>Register!</button>
        </div>
    }
}