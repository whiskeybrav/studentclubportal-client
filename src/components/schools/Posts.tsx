
import * as React from 'react';
import api from '../../api';
import ReactMarkdown from 'react-markdown'
import CreatePostButton from './CreatePostButton';

interface postsProps {
    schoolId: number
    isAdministrator: boolean
}

interface postsState {
    isLoading: boolean
    posts?: postsResponse
    showPastEvents: boolean
}

interface postsResponse {
    status: string
    posts: post[]
    error?: string
}

interface post {
    id: number
    title: string
    date: string
    text: string
    school_id: number
    author: string
}

export default class Events extends React.Component<postsProps, postsState> {
    constructor(props: postsProps) {
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
        let events = await api.GET(this.props.schoolId + "/getPosts", {})
        this.setState({
            isLoading: false,
            posts: events as postsResponse
        })
    }

    async showPastEvents() {
        this.setState({
            isLoading: true
        })
        let events = await api.GET(this.props.schoolId + "/getAllEvents", {})
        this.setState({
            isLoading: false,
            posts: events as postsResponse,
            showPastEvents: true
        })
    }

    render() {
        if(this.state.posts && this.state.posts.posts) {
            this.state.posts.posts.reverse()
        }
        if (this.state.isLoading) {
            return <div className="container">
                <progress className="progress is-primary">Loading</progress>
            </div>
        } else if (this.state.posts && this.state.posts.error) {
            return <div className="notification is-danger">
                {api.parseError(this.state.posts.error)}
            </div>
        } else if (this.state.posts && (!this.state.posts.posts || this.state.posts.posts.length == 0)) {
            return <div>
                {this.props.isAdministrator && <CreatePostButton load={this.load.bind(this)} />}
                <div className="notification">
                    There are no posts.
                </div>
            </div>
        }
        if (!this.state.posts) {
            return <p>If you're seeing this, something really bad happened.</p>
        }
        return <div>
            {this.props.isAdministrator && <CreatePostButton load={this.load.bind(this)} />}
            {this.state.posts.posts.map((post, i) => {
                return <div key={i} className="box">
                    <h3 className="title is-5">{post.title}</h3>
                    <h5 className="subtitle is-6">{post.author} {post.date}</h5>
                    <div className="content">
                        <ReactMarkdown source={post.text} />
                    </div>
                </div>
            })}
        </div>
    }
}