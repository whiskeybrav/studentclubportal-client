import * as React from 'react'
import api from '../../api';
import { Redirect } from 'react-router';

interface createSchoolState {
    fname: string
    lname: string
    email: string
    password: string
    displayname: string
    name: string
    website: string
    city: string
    state: string
    address: string
    drivefolder: string
    isLoading: boolean
    error: string
    redirectTo: string
}

interface createSchoolProps {
    getAuthMe(): void
}

export default class CreateSchool extends React.Component<createSchoolProps, createSchoolState> {
    constructor(props: createSchoolProps) {
        super(props);

        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            displayname: "",
            name: "",
            website: "",
            city: "",
            state: "MD",
            address: "",
            drivefolder: "dfsuahfhds",
            isLoading: false,
            error: "",
            redirectTo: ""
        }
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value: string = target.value;
        const name: string = target.name;

        // Hopefully i'll come back and fix this at some point, but for now, 
        // @ts-ignore
        this.setState({
            [name]: value
        });

    }

    async submit() {
        this.setState({
            isLoading: true,
            error: ""
        })
        let result = await api.POST("schools/register", {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password,
            displayname: this.state.displayname,
            name: this.state.name,
            website: this.state.website,
            city: this.state.city,
            state: this.state.state,
            address: this.state.address,
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
                redirectTo: "/s/" + this.state.displayname
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
                    <input className="input" type="text" placeholder="Joe" name="fname" value={this.state.fname} onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Schmo" name="lname" value={this.state.lname} onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input className="input" type="email" placeholder="jschmo@usna.edu" name="email" value={this.state.email} onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" type="password" placeholder="superSecurePassword1!" name="password" value={this.state.password} onChange={this.handleInputChange.bind(this)} />
                </div>
                <p className="help">Your password must be at least 8 digits and contain at least one letter and at least one number.</p>
            </div>
            <h4 className="title">School Information</h4>
            <div className="field">
                <label className="label">School Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="United States Naval Academy" name="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">School Display Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="usna" name="displayname" value={this.state.displayname} onChange={this.handleInputChange.bind(this)} />
                </div>
                <p className="help">Your school's club portal will live at {this.state.displayname}.clubs.whiskeybravo.org.</p>
            </div>
            <div className="field">
                <label className="label">Website</label>
                <div className="control">
                    <input className="input" type="text" placeholder="https://usna.edu" name="website" value={this.state.website} onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Address</label>
                <div className="control">
                    <input className="input" type="text" placeholder="121 Blake Road" name="address" value={this.state.address} onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">City</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Annapolis" name="city" value={this.state.city} onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="field">
                <label className="label">State</label>
                <div className="control">
                    <div className="select">
                        <select value={this.state.state} onChange={this.handleInputChange.bind(this)} name="state">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                            <option value="AS">American Samoa</option>
                            <option value="GU">Guam</option>
                            <option value="MP">Northern Mariana Islands</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="UM">United States Minor Outlying Islands</option>
                            <option value="VI">Virgin Islands</option>
                            <option value="AA">Armed Forces Americas</option>
                            <option value="AP">Armed Forces Pacific</option>
                            <option value="AE">Armed Forces Others</option>
                        </select>
                    </div>
                </div>
            </div>
            <button className="button is-primary" onClick={this.submit.bind(this)}>Create school!</button>
        </div>
    }
}