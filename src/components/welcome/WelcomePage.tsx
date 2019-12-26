
import * as React from 'react';

export default class WelcomeRedirect extends React.Component<{}, {}> {
    render() {
        location.href = "https://www.whiskeybravo.org/studentclubs"

        return null;
    }
}