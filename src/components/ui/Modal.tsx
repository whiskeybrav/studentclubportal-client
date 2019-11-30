import * as React from 'react';

interface modalProps {
    isOpen: boolean
    buttons: button[]
    canClose: boolean
    onClose(): void
    title: string
}

export interface button {
    content: string | JSX.Element
    onClick(): void
    modifiers?: string
    disabled?: boolean
}

export default class Modal extends React.Component<modalProps> {
    constructor(props: modalProps) {
        super(props);
    }

    render() {
        return <div className={"modal " + (this.props.isOpen ? "is-active" : "")}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{this.props.title}</p>
                    {this.props.canClose && <button className="delete" aria-label="close" onClick={this.props.onClose}></button>}
                </header>
                <section className="modal-card-body">
                    {this.props.children}
                </section>
                {this.props.buttons.length != 0 && <footer className="modal-card-foot">
                    {this.props.buttons.map((btn, i) => {
                        return <button key={i} className={"button " + btn.modifiers} onClick={btn.onClick} disabled={btn.disabled}>{btn.content}</button>
                    })}
                </footer>}
            </div>
        </div>
    }
}