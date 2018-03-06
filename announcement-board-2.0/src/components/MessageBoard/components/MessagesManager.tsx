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
                <div key={message.timeStamp} onClick={() => this.props.deleteMessageBoard(message)}>
                    <h4>{message.message}</h4>
                </div>
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
                        <div className="msgboard-list-div">
                            <p className="msgboard-msg-style">Hello</p>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}


//{this.createMessageBoardList()}

export default MessagesManager;