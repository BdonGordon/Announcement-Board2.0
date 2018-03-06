import MessageBoard from '../components/MessageBoard';
import { IMessageBoard, Cycle, Duration } from '../../../models/MessageBoard';
import { connect } from 'react-redux';
import { addMessageBoard } from '../../../modules/messageBoard';

type LifeType = Cycle | Duration;

export namespace MessageBoardProps {
    export interface IStateProps {
        message: string | null;
        messagesBoard: Array<IMessageBoard>;
    }

    export interface IDispatchProps {
        addMessageBoard: (messageBoard: IMessageBoard) => Promise<void>;
    }

    export interface IOwnProps { }
    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    //in this case, we will just want to define IAnnouncement variable in order to access properties of IAnnouncement
    export interface IState {
        timeStamp: string;
        message: string;
        isCaps: boolean;
        isCycle: boolean;
        lifeType?: string;
        durationType?: string;
        lifeLength: string;
        canPost?: boolean;
        isValid?: boolean;
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
        addMessageBoard: (messageBoard: IMessageBoard): Promise<void> => dispatch(addMessageBoard(messageBoard))
    };
}

export default connect<MessageBoardProps.IStateProps, MessageBoardProps.IDispatchProps, MessageBoardProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(MessageBoard);