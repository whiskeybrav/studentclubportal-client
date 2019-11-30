
import * as React from 'react';
import api from '../../api';
import DateTimePicker from "react-datetime-picker"

import "./CreateEventButton.styl"
import Modal, { button } from '../ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import handleInputChange from '../../handleInputChange';

interface createEventButtonState {
    modalIsShown: boolean
    isLoading: boolean
    startDate: Date
    endDate: Date
    title: string
    description: string
    attendance: string
    error: string
}

interface createEventButtonProps {
    load(): void
}

export default class CreateEventButton extends React.Component<createEventButtonProps, createEventButtonState> {
    constructor(props: createEventButtonProps) {
        super(props);
        this.state = {
            modalIsShown: false,
            isLoading: false,
            startDate: new Date(),
            endDate: new Date(new Date().valueOf() + (1000 * 60 * 60)),
            title: "",
            description: "",
            attendance: "",
            error: ""
        }
    }

    toggleModal() {
        this.setState({
            modalIsShown: !this.state.modalIsShown
        })
    }

    async submit() {
        this.setState({ isLoading: true })
        let result = await api.POST("events/new", {
            title: this.state.title,
            attendance: this.state.attendance,
            start: this.state.startDate.toJSON(),
            end: this.state.endDate.toJSON(),
            description: this.state.description
        })
        if (result.error) {
            this.setState({
                isLoading: false,
                error: result.error
            })
        } else {
            this.setState({
                isLoading: false,
                modalIsShown: false
            })
        }
        this.props.load()
    }

    changeStartDate = (startDate: Date) => this.setState({ startDate })
    changeEndDate = (endDate: Date) => this.setState({ endDate })

    render() {
        let isDisabled = this.state.startDate.valueOf() > this.state.endDate.valueOf()

        let buttons: button[]

        if (this.state.isLoading) {
            buttons = [
                { content: <FontAwesomeIcon icon={faCircleNotch} spin />, onClick: () => { }, modifiers: "is-success ", disabled: true },
                { content: "Cancel", onClick: () => { }, disabled: true },
            ]
        } else {
            buttons = [
                { content: "Sumbit", onClick: this.submit.bind(this), modifiers: "is-success ", disabled: isDisabled },
                { content: "Cancel", onClick: this.toggleModal.bind(this) },
            ]
        }

        return <div>
            <Modal isOpen={this.state.modalIsShown}
                canClose={!this.state.isLoading}
                onClose={this.toggleModal.bind(this)}
                title="Create event"
                buttons={buttons}
            >
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" name="title" placeholder="Club Meeting" onChange={handleInputChange.bind(this)} value={this.state.title} />
                    </div>
                    <p className="help">The public facing name of this event.</p>
                </div>
                <div className="field">
                    <label className="label">Attendance information</label>
                    <div className="control">
                        <input className="input" type="text" name="attendance" placeholder="Club members must attend in room 401" onChange={handleInputChange.bind(this)} value={this.state.attendance} />
                    </div>
                    <p className="help">A quick sentence or two describing attendance policies for the event, for example, "Club members must attend in room 401," or "Register to attend at this link: https://example.com."</p>
                </div>
                <div className="field">
                    <label className="label">Start Time</label>
                    <div className="control">
                        <DateTimePicker className={"input " + (this.state.startDate.valueOf() > this.state.endDate.valueOf() ? "is-danger" : "")} value={this.state.startDate} onChange={this.changeStartDate.bind(this)} />
                    </div>
                    {this.state.startDate.valueOf() > this.state.endDate.valueOf() && <p className="help is-danger">The start date is after the end date.</p>}
                </div>
                <div className="field">
                    <label className="label">End Time</label>
                    <div className="control">
                        <DateTimePicker className="input" value={this.state.endDate} onChange={this.changeEndDate.bind(this)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Come and support our nation's military!" onChange={handleInputChange.bind(this)} value={this.state.description} name="description"></textarea>
                    </div>
                    <p className="help">Use <a href="https://guides.github.com/features/mastering-markdown/" target="_blank" rel="noopener noreferrer">Markdown</a> for formatting.</p>
                </div>
            </Modal>
            <div className="button-container has-text-centered">
                <button className="button is-success" onClick={this.toggleModal.bind(this)}>Create Event</button>
            </div>
        </div>
    }

}