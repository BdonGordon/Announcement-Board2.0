import * as React from 'react';
import { MessagesManagerProps } from '../containers/MessagesManagerContainer';
import MessagesManagerContainer from '../containers/MessagesManagerContainer';

class MessagesManager extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4>Messageboard Manager</h4>
            </div>
        );
    }
}

export default MessagesManager;