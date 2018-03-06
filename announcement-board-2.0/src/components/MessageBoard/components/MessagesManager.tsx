import * as React from 'react';
import { MessagesManagerProps } from '../containers/MessagesManagerContainer';
import MessagesManagerContainer from '../containers/MessagesManagerContainer';

class MessagesManager extends React.Component<MessagesManagerProps.IProps, MessagesManagerProps.IState> {
    constructor(props: MessagesManagerProps.IProps) {
        super(props);

        this.createMessageBoardList = this.createMessageBoardList.bind(this);
    }

    createMessageBoardList() {
        if (this.props.messagesBoard.length < 1) {
            return null;
        }
        return this.props.messagesBoard.map((message) => {
            return (
                <li key={message.timeStamp}>{message.message}</li>
            );
        });
    }

    render() {
        console.log(this.props.messagesBoard.length);

        return (
            <div>
                <h4>Messageboard Manager</h4>
                <div>
                    <ul>
                        {this.createMessageBoardList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MessagesManager;