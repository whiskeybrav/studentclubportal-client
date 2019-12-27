import * as React from 'react'

import "./Footer.styl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCoffee, faHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faYoutube, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons"
import { withRouter } from 'react-router-dom';

export interface slashResponse {
    status: string
    version: string
}

function Footer(props: any) {
    if (props.location.pathname == "/frame") {
        return null;
    }

    return <footer className="footer is-dark">
        <div className="container">
            <div className="columns">
                <div className="column is-one-third is-footer-column">
                    <strong>Need help?</strong>
                    <p><a href="mailto:studentclubs@whiskeybravo.org">studentclubs@whiskeybravo.org</a></p>
                    <p><a href="tel:+19179941955">(917) 994-1955</a></p>
                </div>
                <div className="column is-one-third is-footer-column">
                    <p className="social-links">
                        <a href="https://www.youtube.com/channel/UCHFNfnhkXoJ5kzHpEZp6a5g">
                            <FontAwesomeIcon icon={faYoutube as IconDefinition} mask={faCircle} transform="shrink-6" />
                        </a>
                        <a href="https://www.facebook.com/Whiskey-Bravo-2029554653975370">
                            <FontAwesomeIcon icon={faFacebookF as IconDefinition} mask={faCircle} transform="shrink-6" />
                        </a>
                        <a href="https://www.instagram.com/whiskeybrav/">
                            <FontAwesomeIcon icon={faInstagram as IconDefinition} mask={faCircle} transform="shrink-6" />
                        </a>
                        <a href="https://github.com/whiskeybrav">
                            <FontAwesomeIcon icon={faGithub as IconDefinition} mask={faCircle} transform="shrink-6" />
                        </a>
                    </p>
                    <p>© 2020 Whiskey Bravo</p>
                    <a className="button is-primary is-donate-button" href="https://www.whiskeybravo.org/donate">Donate</a>
                </div>
                <div className="column is-one-third is-footer-column">
                    <p><strong>Whiskey Bravo Student Clubs Portal</strong>{props.slash && " server version " + props.slash.version}. Designed with <FontAwesomeIcon icon={faHeart} /> {" "}
                        and lots of <FontAwesomeIcon icon={faCoffee} /> in New York City. This site is open source <a href="https://github.com/whiskeybrav">on GitHub</a>.</p>
                </div>
            </div>
        </div>
    </footer>
}

export default withRouter(Footer)