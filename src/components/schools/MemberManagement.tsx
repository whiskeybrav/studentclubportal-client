import * as React from 'react'
import { meResponse } from '../App';
import { school } from './SchoolPage';
import api from '../../api';
import { number } from 'prop-types';

interface MemberManagementProps {
    me: meResponse
    school: school
}

interface MemberManagementState {
    isLoading: boolean
    members: member[]
}

interface member {
    id: number
    name: string
    grade_level: number
}

export default class MemberManagement extends React.Component<MemberManagementProps, MemberManagementState> {
    constructor(props: MemberManagementProps) {
        super(props)
        this.state = {
            isLoading: true,
            members: []
        }
        this.load()
    }

    async load() {
        let members = await api.GET(this.props.school.id + "/getMembers", {})
        this.setState({
            isLoading: false,
            members: members.users
        })
    }

    async makeHead(id: number) {
        this.setState({
            isLoading: true
        })
        await api.POST("schools/setClubHead", { id: id.toString() })
        location.reload()
    }

    render() {
        return <div className="box">
            <strong>Member Management</strong> <br />
            {this.state.isLoading ? <progress className="progress">Loading..</progress> :
                <ul>{this.state.members.map((member, i) =>
                    <li key={i}>{member.name} (Grade {member.grade_level}) {this.props.school.club_head.id != member.id && <button className="button is-small" onClick={() => this.makeHead(member.id)}>Make head</button>}</li>
                )}</ul>
            }
        </div>
    }
}