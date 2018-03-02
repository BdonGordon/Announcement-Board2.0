import * as React from 'react';
import MessageBoard from '../components/MessageBoard/containers/MessageBoardContainer';

class CoreLayout extends React.Component {
    render() {
        return (
            <div>
                <MessageBoard />
            </div>
        );
    }
}

export default CoreLayout;