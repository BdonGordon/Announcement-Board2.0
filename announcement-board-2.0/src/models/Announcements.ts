export interface IAnnouncement {
    timeStamp: string;
    message: string;
    caps?: boolean;
    duration?: number; //optional for now
    cycles?: number; 
}