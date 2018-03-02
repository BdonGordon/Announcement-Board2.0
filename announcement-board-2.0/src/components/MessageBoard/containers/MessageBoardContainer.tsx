import MessageBoard from '../components/MessageBoard';
import { IAnnouncement, Cycle, Duration } from '../../../models/Announcements';
import { connect } from 'react-redux';

type LifeType = Cycle | Duration;

export namespace MessageBoardProps {
    export interface IStateProps {
    }

    export interface IDispatchProps {
    }

    export interface IOwnProps { }
    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    //in this case, we will just want to define IAnnouncement variable in order to access properties of IAnnouncement
    export interface IState {
        timeStamp: string;
        message: string;
        isCaps: boolean;
        isCycle: boolean;
        lifeType?: LifeType;
    }
}

export default MessageBoard;