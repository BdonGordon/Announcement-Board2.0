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
                <div key={message.timeStamp} className="msgboard-list-div">
                    <p className="p-inline-msgboard">{message.timeStamp} <b>Message:</b> {message.message}</p>
                    <button className="msgboard-delete-button" onClick={() => this.props.deleteMessageBoard(message)}>Delete</button>
                    <br/>
                </div>
            );
        });
    }
    
    render() {
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