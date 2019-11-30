
import * as React from 'react';
import api from '../../api';
import DateTimePicker from "react-datetime-picker"

import "./CreateEventButton.styl"
import Modal, { button } from '../ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import handleInputChange from '../../handleInputChange';

interface createPostButtonState {
    modalIsShown: boolean
    isLoading: boolean
    title: string
    error: string
    text: string
}

interface createPostButtonProps {
    load(): void
}

export default class CreatePostButton extends React.Component<createPostButtonProps, createPostButtonState> {
    constructor(props: createPostButtonProps) {
        super(props);
        this.state = {
            modalIsShown: false,
            isLoading: false,
            title: "",
            text: "",
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
        let result = await api.POST("posts/new", {
            title: this.state.title,
            text: this.state.text,
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

    render() {
        let buttons;

        if (this.state.isLoading) {
            buttons = [
                { content: <FontAwesomeIcon icon={faCircleNotch} spin />, onClick: () => { }, modifiers: "is-success ", disabled: true },
                { content: "Cancel", onClick: () => { }, disabled: true },
            ]
        } else {
            buttons = [
                { content: "Submit", onClick: this.submit.bind(this), modifiers: "is-success" },
                { content: "Cancel", onClick: this.toggleModal.bind(this) },
            ]
        }

        return <div>
            <Modal isOpen={this.state.modalIsShown}
                canClose={!this.state.isLoading}
                onClose={this.toggleModal.bind(this)}
                title="Create post"
                buttons={buttons}
            >
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" name="title" placeholder="Club Meeting" onChange={handleInputChange.bind(this)} value={this.state.title} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Come and support our nation's military!" onChange={handleInputChange.bind(this)} value={this.state.text} name="text"></textarea>
                    </div>
                    <p className="help">Use <a href="https://guides.github.com/features/mastering-markdown/" target="_blank" rel="noopener noreferrer">Markdown</a> for formatting.</p>
                </div>
            </Modal>
            <div className="button-container has-text-centered">
                <button className="button is-success" onClick={this.toggleModal.bind(this)}>Create Post</button>
            </div>
        </div>
    }

}