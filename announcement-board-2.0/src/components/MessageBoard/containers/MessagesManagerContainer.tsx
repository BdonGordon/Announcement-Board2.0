import * as React from 'react';
import { connect } from 'react-redux';
import MessagesManager from '../components/MessagesManager';
import { IMessageBoard, Cycle, Duration } from '../../../models/MessageBoard';

export namespace MessagesManagerProps {
    export interface IStateProps {
        message: string;
        messagesBoard: Array<IMessageBoard>;
    }

    export interface IDispatchProps {
    }

    export interface IOwnProps { }
    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }
    
    export interface IState {
    }
}

function mapStateToProps(state: any) {
    return {
        message: state.messageBoard.message,
        messagesBoard: state.messageBoard.messagesBoard
    };
}

//nothing to do yet
function mapDispatchToProps(dispatch: any) {
    return {
    };
}

export default connect<MessagesManagerProps.IStateProps, MessagesManagerProps.IDispatchProps, MessagesManagerProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(MessagesManager); //with connect and all that fancy stuff