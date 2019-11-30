
import * as React from 'react';

import "./WelcomePage.styl"

export default class WelcomePage extends React.Component<{}, {}> {
    render() {
        return <div>
            <div className="hero is-primary is-large is-bold welcome-page">
                <div className="hero-body">
                    <div className="container">
                        <h2 className="title">Whiskey Bravo</h2>
                        <h1 className="subtitle is-1">
                            Student Clubs
                    </h1>
                        <h2 className="subtitle">
                            Start teaching your community
                    </h2>
                    </div>
                </div>
            </div>
            <section className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <div className="box has-background-primary">
                        <div className="content is-size-4 is-centered has-text-centered has-text-white">
                            Student Club's mission is to teach students the importance of our military through
                            service projects, lessons, and other initiatives. Throughout our nation, many students
                            are unaware of the issues our military and their families face everyday. Whiskey Bravo
                            Student Clubs will bring a new perspective and teach students more about the military.
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h1 className="title is-1 has-text-centered">
                    Start Making an Impact
                </h1>
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                        <p className="subtitle is-5 has-text-centered">
                            Start making change and building back the connection between civilians and the military.
                            Start right now by teaching your class military inspired lessons, or starting a club and
                            educating your friends.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    }
}