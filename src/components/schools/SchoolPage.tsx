
import * as React from 'react';
import api from '../../api';
import { meResponse } from '../App';
import { match } from 'react-router';
import Events from './Events';
import Posts from './Posts';
import MemberManagement from './MemberManagement';


interface schoolPageState {
    isLoading: boolean
    displayName: string
    school: school | null
    error?: string
}

interface schoolPageProps {
    me: meResponse | undefined
    match: match
    location: Location
    history: History
}

interface schoolResponse {
    status: string
    school: school
    error?: string
}

export interface school {
    id: number
    display_name: string
    name: string
    website: string
    donations_raised: number
    donation_goal: number
    founded_date: string
    city: string
    state: string
    address: string
    drive_folder: string
    club_head: person
    faculty_adviser: person
    is_verified: boolean
}

interface person {
    id: number
    name: string
    grade_level: number
}

export default class SchoolPage extends React.Component<schoolPageProps, schoolPageState> {
    constructor(props: schoolPageProps) {
        super(props);
        this.state = {
            isLoading: true,
            displayName: (props.match.params as any).school,
            school: null
        }
        this.load()
    }

    async load() {
        let result: schoolResponse = await api.GET("schools/get/" + this.state.displayName, {})
        this.setState({
            isLoading: false,
            school: result.school,
            error: result.error
        })
    }

    render() {
        if (this.state.isLoading) {
            return <section className="section">
                <div className="container">
                    <h1 className="title has-text-centered">Just a moment...</h1>
                    <progress className="progress is-large is-primary">Loading</progress>
                </div>
            </section>
        }
        if (this.state.error) {
            return <div className="hero is-danger is-fullheight-with-navbar">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            Uh oh...
                        </h1>
                        <h2 className="subtitle">
                            {api.parseError(this.state.error)}
                        </h2>
                    </div>
                </div>
            </div>
        }
        if (this.state.school == null) {
            return <img src="https://imgs.xkcd.com/comics/unreachable_state.png" alt="unreachable state" />
        }
        return <div>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            {this.state.school.name}
                        </h1>
                        <h2 className="subtitle">
                            {this.state.school.city}, {this.state.school.state}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    {!this.state.school.is_verified && <div className="notification is-info">
                        <strong>Your school isn't verified.</strong> That means that only you will be able to access the portal until a member
                        of our team verifies your school. If it's been more than a few days and your school still hasn't been verified, feel free
                        to reach out to us at <a href="mailto:studentclubs@whiskeybravo.org">studentclubs@whiskeybravo.org</a>.
                    </div>}
                    <div className="columns">
                        <div className="column">
                            <h1 className="title">Events</h1>
                            <h3 className="subtitle">Upcoming club meetings and events</h3>
                            {/* TODO: fix
                            // @ts-ignore */}
                            <Events schoolId={this.state.school.id} isAdministrator={this.props.me.me && this.state.school.faculty_adviser && (this.props.me.me.id == this.state.school.club_head.id || this.props.me.me.id == this.state.school.faculty_adviser.id)} />
                        </div>
                        <div className="column is-three-fifths">
                            <h1 className="title">News</h1>
                            <p className="subtitle">Updates from your club head and advisor</p>
                            {/* TODO: fix
                            // @ts-ignore */}
                            <Posts schoolId={this.state.school.id} isAdministrator={this.props.me.me && this.state.school.faculty_adviser && (this.props.me.me.id == this.state.school.club_head.id || this.props.me.me.id == this.state.school.faculty_adviser.id)} />

                        </div>
                        <div className="column">
                            <h1 className="title">About</h1>
                            <p className="subtitle">About the Whiskey Bravo Student Club at {this.state.school.name}</p>
                            <div className="box">
                                <strong>{this.state.school.name}</strong> <br />
                                {this.state.school.address} <br />
                                {this.state.school.city}, {this.state.school.state}
                            </div>
                            <div className="box">
                                <strong>Faculty Advisor:</strong> <br />
                                {this.state.school.faculty_adviser.name}
                            </div>
                            {this.state.school.club_head.id != -1 && <div className="box">
                                <strong>Club Head:</strong> <br />
                                {this.state.school.club_head.name} (Grade {this.state.school.club_head.grade_level})
                            </div>}
                            {this.props.me && this.props.me.me && this.state.school.faculty_adviser.id == this.props.me.me.id && <MemberManagement me={this.props.me} school={this.state.school} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}