import * as React from 'react';
import { MessageDisplayProps } from '../containers/MessageDisplayContainer';
import '../../../ListStyling.css';
import { IMessageBoard, Cycle, Duration } from '../../../models/MessageBoard';

type LifeType = Cycle | Duration;
/**
 * GLITCH: If the user posts a message with X cycles, they can change the cycle when the message is scrolling thru
 * the screen and it will change accordingly. SOLUTION: life cycle methods of the component. Probably the (if (this.props.IMessage !== this.prevProps) kinda
 * deal
 */
class MessageDisplay extends React.Component<MessageDisplayProps.IProps, MessageDisplayProps.IState> {
    constructor(props: MessageDisplayProps.IProps) {
        super(props);

        this.createAnnouncementPost = this.createAnnouncementPost.bind(this);
    }

    componentWillReceiveProps() {
    }

    componentWillUnmount() {
        
    }

    createAnnouncementPost() {
        if (this.props.messagesBoard.length < 1) {
            return null;
        }
        return this.props.messagesBoard.map((message) => {
            if (message.caps) {

                return (
                    //{ animationIterationCount: this.props.cycle, textTransform: 'uppercase'  }
                    <p key={message.timeStamp} style={{}} className="scroll-right-p">{message.message}</p>
                );
            }
            return (
                //animationIterationCount: this.props.cycle
                <p key={message.timeStamp} style={{}} className="scroll-right-p">{message.message}</p>
            );
        });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.createAnnouncementPost()}
                </ul>
            </div>
        );
    }
}

export default MessageDisplay;