import * as React from 'react';
import { connect } from 'react-redux';
import MessageDisplay from '../components/MessageDisplay';
import '../../../ListStyling.css';
import { IMessageBoard } from '../../../models/MessageBoard';

export namespace MessageDisplayProps {
    export interface IStateProps {
        message: string;
        messagesBoard: Array<IMessageBoard>;
        //cycle: string;
    }

    export interface IDispatchProps {
    }

    export interface IOwnProps {
    }

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

function mapDispatchToProps(dispatch: any) {
    return {
    };
}

export default connect<MessageDisplayProps.IStateProps, MessageDisplayProps.IDispatchProps, MessageDisplayProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(MessageDisplay);
