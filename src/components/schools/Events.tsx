
import * as React from 'react';
import api from '../../api';
import CreateEventButton from './CreateEventButton';
import ReactMarkdown from 'react-markdown'

interface eventsProps {
    schoolId: number
    isAdministrator: boolean
}

interface eventsState {
    isLoading: boolean
    events?: eventsResponse
    showPastEvents: boolean
}

interface eventsResponse {
    status: string
    events: event[]
    error?: string
}

interface event {
    id: number
    title: string
    attendance: string
    start: string
    end: string
    description: string
}

export default class Events extends React.Component<eventsProps, eventsState> {
    constructor(props: eventsProps) {
        super(props);
        this.state = {
            isLoading: true,
            showPastEvents: false
        }
        this.load();
    }

    async load() {
        this.setState({
            isLoading: true
        })
        let events = await api.GET(this.props.schoolId + "/getEvents", {})
        this.setState({
            isLoading: false,
            events: events as eventsResponse
        })
    }

    async showPastEvents() {
        this.setState({
            isLoading: true
        })
        let events = await api.GET(this.props.schoolId + "/getAllEvents", {})
        this.setState({
            isLoading: false,
            events: events as eventsResponse,
            showPastEvents: true
        })
    }

    render() {
        if (this.state.isLoading) {
            return <div className="container">
                <progress className="progress is-primary">Loading</progress>
            </div>
        } else if (this.state.events && this.state.events.error) {
            return <div className="notification is-danger">
                {api.parseError(this.state.events.error)}
            </div>
        } else if (this.state.events && (!this.state.events.events || this.state.events.events.length == 0)) {
            return <div>
                {this.props.isAdministrator && <CreateEventButton load={this.load.bind(this)} />}
                <div className="notification">
                    There are no {!this.state.showPastEvents && "upcoming"} events.
               {!this.state.showPastEvents && <button className="button" onClick={this.showPastEvents.bind(this)}>Show past events</button>}
                </div>
            </div>
        }
        if (!this.state.events) {
            return <p>If you're seeing this, something really bad happened.</p>
        }
        return <div>
            {this.props.isAdministrator && <CreateEventButton load={this.load.bind(this)} />}
            {this.state.events.events.map((event, i) => {
                return <div key={i} className="box">
                    <h3 className="title is-5">{event.title}</h3>
                    <h5 className="subtitle is-6">{new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}</h5>
                    <div className="content">
                        <ReactMarkdown source={event.description} />
                    </div>
                    <p>{event.attendance}</p>
                </div>
            })}
        </div>
    }
}