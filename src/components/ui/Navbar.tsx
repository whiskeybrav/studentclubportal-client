import * as React from "react"

import "./Navbar.styl"

import { Link, withRouter } from 'react-router-dom'
import api from "../../api"

function Navbar(props: any) {

	//TODO: MAKE TYPES BETTER
	return <nav className={`navbar ${props.location.pathname == "/" ? "merged" : "is-dark"}`} role="navigation" aria-label="main navigation">
		<div className="navbar-brand">
			<a className="navbar-item" href="https://whiskeybravo.org">
				<strong>Whiskey Bravo Student Clubs</strong>
			</a>
			<a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>
		<div id="navbarBasicExample" className="navbar-menu">
			<div className="navbar-start">
				<Link className="navbar-item" to="/">Home</Link>
			</div>
			{props.me.error ? <div className="navbar-end">
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
			}
		</div>
	</nav >
}

export default withRouter(Navbar)