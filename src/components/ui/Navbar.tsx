import * as React from "react"

import "./Navbar.styl"

import { Link, withRouter } from 'react-router-dom'
import api from "../../api"

function Navbar(props: any) {

	//TODO: MAKE TYPES BETTER
	return <div>
		<nav className="navbar is-dark" role="navigation" aria-label="main navigation">
			<div className="container">
				<div className="flex-1"></div>
				<div className="flex-1">
					<a className="navbar-item" href="https://whiskeybravo.org">Home</a>
					<a className="navbar-item" href="https://whiskeybravo.org">Projects</a>
					<a className="navbar-item" href="https://whiskeybravo.org">Gallery</a>
					<a className="navbar-item" href="https://www.whiskeybravo.org/about-us">About Us</a>
					<a className="navbar-item" href="https://www.whiskeybravo.org/contact-us">Contact Us</a>
					<a className="navbar-item" href="https://www.whiskeybravo.org/press">Press</a>
					<a className="navbar-item is-donate-button" href="https://www.whiskeybravo.org/donate">Donate</a>
				</div>
				<div className="flex-1"></div>
			</div>
		</nav >
		<div className="is-login-banner-wrapper">
			<div className="container is-login-banner">
				<div className="level">
					<div className="level-left"></div>
					{props.me.error ? <div className="level-right">
						<div className="level-item">
							<Link to="/register">Register</Link>
						</div>
						<div className="level-item">
							<Link to="/login">Log in</Link>
						</div>
					</div> : <div className="level-right">
							<div className="level-item">
								<span className="name">{props.me.me.fname} {props.me.me.lname} {props.me.me.user_level > 0 && <span className="tag is-primary">Admin</span>}</span>
							</div>
							<div className="level-item">
								<Link to={"/s/" + props.me.me.school}>{props.me.me.school_name}</Link>
							</div>
							<div className="level-item">
								<a onClick={async () => {
									await api.POST("auth/logout", {})
									props.getAuthMe()
								}}>
									Log Out
								</a>
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	</div>
}

export default withRouter(Navbar)