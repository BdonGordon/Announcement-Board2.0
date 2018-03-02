type LifeType = Cycle | Duration;

export interface IAnnouncement {
    timeStamp: string;
    message: string;
    caps?: boolean;
    lifeType?: LifeType;
}

export interface Cycle {
    type: string;
    cycleNo: number;
}

export interface Duration {
    type: string;
    durationType?: string;
    durationTime?: number;
}
