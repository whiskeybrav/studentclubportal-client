
import * as React from 'react';
import api from '../../api';

import "./SchoolPicker.styl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface schoolPickerState {
    isLoading: boolean
    searchQuery: string
    results: school[]
}

interface school {
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
}

interface person {
    id: number
    name: string
    grade_level: number
}

interface schoolPickerProps {
    onPick(schoolId: number, name: string, displayName: string): void
}

export default class SchoolPicker extends React.Component<schoolPickerProps, schoolPickerState> {
    constructor(props: schoolPickerProps) {
        super(props);
        this.state = {
            isLoading: false,
            searchQuery: "",
            results: []
        }
    }

    updateSearch(event: any) {
        let query: string = event.target.value;
        this.setState({ searchQuery: query });

        if (query.length > 2) {
            this.search(query)
        }
    }

    async search(query: string) {
        this.setState({
            isLoading: true
        })
        let response: school[] = (await api.GET("schools/search", { q: query })).schools;
        this.setState({
            isLoading: false,
            results: response
        })
    }

    render() {
        return <div>
            <h3 className="question is-size-3">Select your school</h3>
            <div className={`control school-search-field ${this.state.isLoading ? "is-loading" : ""}`}>
                <input className="input" type="text" placeholder="Find a school" value={this.state.searchQuery} onChange={this.updateSearch.bind(this)} />
            </div>
            {this.state.searchQuery.length <= 2 && <div className="notification is-primary">
                Type three or more characters to search
            </div>}
            {this.state.searchQuery.length > 2 && !this.state.results && <div className="notification is-primary">
                No results found. <strong>Don't see your school?</strong> Ask a teacher to create an account and create a new school.
            </div>}
            {this.state.results && <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pick</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.results.map((school, i) => {
                        return <tr key={i}>
                            <td><a href={school.website} target="_blank" rel="noopener noreferrer">{school.name}</a></td>
                            <td>{school.city}</td>
                            <td>{school.state}</td>
                            <td><button onClick={() => this.props.onPick(school.id, school.name, school.display_name)} className="button is-primary"><FontAwesomeIcon icon={faChevronRight} /></button></td>
                        </tr>
                    })}
                </tbody>
            </table>}
        </div>
    }
}