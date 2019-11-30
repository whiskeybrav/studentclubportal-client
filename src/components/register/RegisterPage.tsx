
import * as React from 'react';

import { faUserGraduate, faChalkboardTeacher, faPlusCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons"

import Question from "../ui/Question"

import "./RegisterPage.styl"
import SchoolPicker from './SchoolPicker';
import CreateSchool from './RegisterSchool';
import RegisterStudent from './RegisterStudent';

interface registerPageState {
    answers: number[]
    schoolId: number
    schoolName: string
    displayName: string
    isTeacher: boolean
}

interface registerPageProps {
    getAuthMe(): void
}

export default class RegisterPage extends React.Component<registerPageProps, registerPageState> {
    constructor(props: registerPageProps) {
        super(props);
        this.state = {
            answers: [],
            schoolId: -1,
            schoolName: "",
            displayName: "",
            isTeacher: false
        }
    }

    addResponse(response: number) {
        let answers = this.state.answers
        answers.push(response)
        this.setState({
            answers: answers
        })
    }

    selectSchool(schoolId: number, name: string, displayName: string) {
        this.setState({
            schoolId: schoolId,
            schoolName: name,
            displayName: displayName,
        })
    }

    askQuestions() {
        if (this.state.schoolId != -1) {
            if (this.state.answers[0] == 1) {
                return <p>TODO TEACHER FORM</p>
            }
            return <RegisterStudent schoolId={this.state.schoolId} schoolName={this.state.schoolName} schoolDisplayName={this.state.displayName} getAuthMe={this.props.getAuthMe} />
        }
        if (this.state.answers.length == 0) {
            return <Question question="Are you a student or a teacher?" onClick={this.addResponse.bind(this)} answers={[
                {
                    title: "Student",
                    icon: faUserGraduate
                },
                {
                    title: "Teacher",
                    icon: faChalkboardTeacher
                }
            ]} />
        } else if (this.state.answers.length == 1 && this.state.answers[0] == 0) {
            // They are a student and need to pick a school
            return <SchoolPicker onPick={this.selectSchool.bind(this)} />
        } else if (this.state.answers.length == 1) {
            // They're a teacher.
            // We need to ask them if they want to create a school, or join one
            return <Question question="Do you need to create a school, or join one?" onClick={this.addResponse.bind(this)} answers={[
                {
                    title: "Create",
                    icon: faPlusCircle
                },
                {
                    title: "Join",
                    icon: faUserPlus
                }
            ]} />
        } else if (this.state.answers.length == 2 && this.state.answers[0] == 1 && this.state.answers[1] == 1) {
            // They are a teacher who is joining a school and need to pick their school
            return <SchoolPicker onPick={this.selectSchool.bind(this)} />
        } else if (this.state.answers.length == 2 && this.state.answers[0] == 1) {
            // They are a teacher who needs to create a school 
            return <CreateSchool getAuthMe={this.props.getAuthMe} />
        }
        return <p>Hi</p>;
    }

    render() {
        return <div>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Register
                    </h1>
                        <h2 className="subtitle">
                            Create a student or teacher account.
                    </h2>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container welcome-container">
                    <h1 className="title">Welcome!</h1>
                    <p>Answer a few quick questions to create your account.</p>
                    <hr />
                    {this.askQuestions.bind(this)()}
                </div>
            </div>
        </div>
    }
}