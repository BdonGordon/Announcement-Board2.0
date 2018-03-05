type LifeType = Cycle | Duration;

export interface IAnnouncement {
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
