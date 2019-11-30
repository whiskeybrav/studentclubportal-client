import * as React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import "./Question.styl"

interface questionProps {
    question: string
    answers: answer[]
    onClick(answer: number): void
}

interface answer {
    icon: IconProp
    title: string
}

export default function Question(props: questionProps) {
    return <div>
        <h3 className="question is-size-3">{props.question}</h3>
        <div className="columns is-3">
            {props.answers.map((answer, i) => {
                return <div className="column" key={i}>
                    <div className="answer-choice" onClick={() => props.onClick(i)}>
                        <h1 className="title"><FontAwesomeIcon icon={answer.icon} /> {answer.title}</h1>
                    </div>
                </div>
            })}
        </div>
    </div>
}
