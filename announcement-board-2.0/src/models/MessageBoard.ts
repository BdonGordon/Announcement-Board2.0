import { AnyAction } from 'redux';

type LifeType = Cycle | Duration;

export interface IMessageBoard {
    messageID?: number; //not needed since there's no DB to keep track of the ID
    timeStamp: string;
    message: string;
    caps?: boolean;
    lifeType?: LifeType;
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

export interface MessagesBoardAction extends AnyAction {
    error?: boolean;
    payload: {
        announcements: Array<IMessageBoard>;
    };
}