import { IMessageBoard, MessageBoardAction, MessagesBoardAction } from '../models/MessageBoard';

export const ANNOUNCEMENT_POST = 'ANNOUNCEMENT_POST';
export const ANNOUNCEMENT_STORE = 'ANNOUNCEMENT_STORE';
export const ANNOUNCEMENT_REMOVE = 'ANNOUNCEMENT_REMOVE';

export interface IMessageBoardState {
    readonly message: string | null;
    readonly messagesBoard: Array<IMessageBoard>;
}

const initialState: IMessageBoardState = {
    message: null,
    messagesBoard: []
};

export function addMessageBoard(messageBoard: IMessageBoard): MessageBoardAction {
    return {
        type: ANNOUNCEMENT_POST,
        payload: {
            announcement: messageBoard 
        }
    };
}

export function deleteMessageBoard(messageBoard: IMessageBoard): MessageBoardAction {
    console.log(messageBoard.message + " && " + messageBoard.timeStamp);

    return {
        type: ANNOUNCEMENT_REMOVE,
        payload: {
            announcement: messageBoard
        }
    };
}

type MessageBoardActions = MessageBoardAction & MessagesBoardAction;

/**
 * Reducer
 * @param state
 * @param action
 */
export function messageBoardReducer(state: IMessageBoardState = initialState, action: MessageBoardActions) {
    switch (action.type) {
        case ANNOUNCEMENT_POST:
            let list = state.messagesBoard.slice();
            list.unshift(action.payload.announcement);

            return Object.assign({}, state, {
                message: action.payload,
                messagesBoard: list
            });

        case ANNOUNCEMENT_REMOVE:
            let deletedMessage: IMessageBoard = action.payload.announcement;
            //don't wan't to delete the message from memory (or database). Just filter it out
            let newMessagesBoard: Array<IMessageBoard> = state.messagesBoard.filter((msg: IMessageBoard) => msg.timeStamp !== deletedMessage.timeStamp);

            return Object.assign({}, state, {
                message: action.payload,
                messagesBoard: newMessagesBoard
            });
            

        default:
            return state;
    }
}