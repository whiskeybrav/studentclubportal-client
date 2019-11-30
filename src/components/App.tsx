
import * as React from 'react';

import WelcomePage from "./welcome/WelcomePage"
import RegisterPage from './register/RegisterPage';

import { HashRouter as Router, Switch, Route, match } from "react-router-dom"

import "./App.scss"

import "./App.styl"
import Navbar from './ui/Navbar';
import api from '../api';
import LoginPage from './login/LoginPage';
import SchoolPage from './schools/SchoolPage';
import Footer, { slashResponse } from "./ui/Footer"

interface appState {
	me: meResponse | undefined
	slash: slashResponse | undefined
}

export interface meResponse {
	status: "error" | "ok"
	error?: string
	me?: me
}

interface me {
	id: number
	fname: number
	lname: number
	shows_last_name: boolean
	email: number
	school_id: number
	school: string
	school_name: string
	how_did_you_hear: number
	user_level: number
	registration: string
}

export default class App extends React.Component<{}, appState> {
	constructor(props: {}) {
		super(props);
		this.getAuthMe()
		this.getSlash()
		this.state = {
			me: {
				status: "error",
				error: "not_loaded"
			},
			slash: undefined
		}
	}

	async getAuthMe() {
		let me: meResponse = await api.GET("auth/me", {})
		this.setState({
			me: me
		})
	}

	async getSlash() {
		let slash: slashResponse = await api.GET("", {})
		this.setState({
			slash: slash
		})
	}

	render() {
		return <Router>
			<Navbar me={this.state.me} getAuthMe={this.getAuthMe.bind(this)} />
			<Switch>
				<Route exact path="/" children={<WelcomePage />} />
				<Route exact path="/register" children={<RegisterPage getAuthMe={this.getAuthMe.bind(this)} />} />
				<Route exact path="/login" children={<LoginPage getAuthMe={this.getAuthMe.bind(this)} />} />
				{/* There's gotta be a better way of doing this */}
				{/* TOOD: Clean up */}
				<Route path="/s/:school" children={(props: { match: match, location: Location, history: History }) => <SchoolPage me={this.state.me} match={props.match} location={props.location} history={props.history} />} />
			</Switch>
			<Footer slash={this.state.slash} />
		</Router>
	}
}