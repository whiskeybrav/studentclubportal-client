import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export interface slashResponse {
    status: string
    version: string
}

export default function Footer(props: { slash: slashResponse | undefined }) {
    return <footer className="footer">
        <div className="content has-text-centered">
            <p><strong>Whiskey Bravo Student Clubs Portal</strong>{props.slash && " server version " + props.slash.version}. Designed with <FontAwesomeIcon icon={faCoffee} /> in New York City by <a href="https://williambarkoff.com">William Barkoff</a>. Open Source <a href="https://github.com/whiskeybrav">on GitHub</a>.</p>
        </div>
    </footer>
}