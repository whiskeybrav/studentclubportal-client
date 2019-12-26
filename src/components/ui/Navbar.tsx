import * as React from "react"

import "./Navbar.styl"

import { Link, withRouter } from 'react-router-dom'
import api from "../../api"

function Navbar(props: any) {

	//TODO: MAKE TYPES BETTER
	return <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
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
		{/* {props.me.error ? <div className="navbar-end">
				<div className="navbar-item">
					<div className="buttons">
						<Link to="/register" className="button is-primary"><strong>Register</strong></Link>
						<Link to="/login" className="button is-light">Log in</Link>
					</div>
				</div>
			</div> : <div className="navbar-end">
					<p className="navbar-item">{props.me.me.fname} {props.me.me.lname} {props.me.me.user_level > 0 && <span className="tag is-primary">Admin</span>}</p>
					<Link className="navbar-item" to={"/s/" + props.me.me.school}>{props.me.me.school_name}</Link>
					<a className="navbar-item" onClick={async () => {
						await api.POST("auth/logout", {})
						props.getAuthMe()
					}}>
						Log Out
					</a>
				</div>
			} */}
	</nav >
}

export default withRouter(Navbar)