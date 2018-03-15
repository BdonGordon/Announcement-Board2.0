import { AnyAction } from 'redux';

type LifeType = Cycle | Duration;

export interface IMessageBoard {
    messageID?: number; //not needed since there's no DB to keep track of the ID
    timeStamp: string;
    message: string;
    caps?: boolean;
    lifeType?: LifeType; //this is pretty much useless since I can't access the cycleNo, durationType/durationTime with it 
}

export interface Cycle {
    type?: "cycle";
    cycleNo: number;
}

export interface Duration {
    type?: "duration";
    durationType?: string;
    durationTime?: number;
}

export interface MessageBoardAction extends AnyAction {
    error?: boolean;
    payload: {
        announcement: IMessageBoard;
    };
}

export interface MessageBoardEditAction extends AnyAction {
    error?: boolean;
    payload: {
        newMessage: string;
    };
}

export interface MessagesBoardAction extends AnyAction {
    error?: boolean;
    payload: {
        announcements: Array<IMessageBoard>;
    };
}