import * as React from 'react';

export interface IProps { }

export interface IState {
    date: string;
    timerID: NodeJS.Timer;
}

const initialState: IState = {
    date: '',
    timerID: null
};

class MessageBoardClock extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = initialState;
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        let timerID: NodeJS.Timer = setInterval(
            () => this.tick(), 1000
        );

        this.setState({
            timerID: timerID
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }

    tick() {
        this.setState({
            date: new Date().toLocaleTimeString()
        });
    }

    render() {
        return (
            <div>
                <h5>Clock: {this.state.date} </h5>
            </div>
        );
    }
}

export default MessageBoardClock;