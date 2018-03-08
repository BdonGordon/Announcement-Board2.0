import * as React from 'react';
import '../../../ListStyling.css';
import { MessageBoardProps } from '../containers/MessageBoardContainer';
import MessageBoardContainer from '../containers/MessageBoardContainer';
import { IMessageBoard, Cycle, Duration } from '../../../models/MessageBoard';
import MessagesManager from '../containers/MessagesManagerContainer';

type LifeType = Cycle | Duration;

const initialCycle: Cycle = {
    type: "cycle",
    cycleNo: 1
};

const initialDuration: Duration = {
    type: "duration",
    durationType: "Minutes",
    durationTime: 1
};

const initialState: MessageBoardProps.IState = {
    timeStamp: '',
    message: '',
    isCaps: false,
    isCycle: true,
    lifeType: initialCycle.type, //initialize lifeType to "cycle" 
    durationType: "Minutes",
    lifeLength: '',
    canPost: true, //TRUE === Message input IS DISABLED && FALSE === Message input is ENABLED
    isValid: true
};

class MessageBoard extends React.Component<MessageBoardProps.IProps, MessageBoardProps.IState> {
    constructor(props: MessageBoardProps.IProps) {
        super(props);

        this.state = initialState;
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleCapsToggle = this.handleCapsToggle.bind(this);
        this.handleLifeTypeChange = this.handleLifeTypeChange.bind(this);
        this.toggleLifeType = this.toggleLifeType.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleDurationTypeChange = this.handleDurationTypeChange.bind(this);
        this.handleLifeTimeChange = this.handleLifeTimeChange.bind(this);
        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    /**
     * Sets the state.message here
     * @param e
     */
    handleMessageChange(e: React.FormEvent<HTMLInputElement>) {
        //var message: string = e.currentTarget.value;
        //this.setState({ message: message })
        let message = e.currentTarget.value;
        let isValid = this.state.isValid;

        if (message.length < 5) {
            isValid = true; //Post Announcement button is disabled until the char length is greater than 4
        }
        else {
            isValid = false;
        }

        this.setState({
            message: message,
            isValid: isValid
        });
    }

    /**
     * Enables and disables to input area
     * @param e
     */
    handleEdit(e: React.FormEvent<HTMLButtonElement>) {
        let clearAnnouncement = this.state.message;
        clearAnnouncement = '';
        this.setState({
            message: clearAnnouncement,
            canPost: false
        });
    }

    /**
     * Simply checks if the allcaps checkbox is checked or not and sets the state.isCaps
     * @param e
     */
    handleCapsToggle(e: React.FormEvent<HTMLInputElement>) {
        var checked = e.currentTarget.checked;

        this.setState({
            isCaps: checked
        });
    }

    /**
     * lifeType of the announcement: cycle or duration. state.lifeType and state.isCycle is set here 
     * @param e
     */
    handleLifeTypeChange(e: React.FormEvent<HTMLInputElement>) {
        let lifeValue = e.currentTarget.value;
        let isCycle = this.state.isCycle; //initially false

        if (lifeValue === "cycle") {
            isCycle = true;
        }
        else {
            isCycle = false;
        }

        this.setState({
            isCycle: isCycle,
            lifeType: lifeValue
        });
    }

    /**
     * Gets the lifeType of cycles or duration to hide or render the radio buttons for minutes/hrs/days of the Duration lifeType
     */
    toggleLifeType() {
        return this.state.isCycle;
    }

    /**
     * state.durationType is set here.
     * @param e
     */
    handleDurationTypeChange(e: React.FormEvent<HTMLInputElement>) {
        let durationType = e.currentTarget.value;
        this.setState({
            durationType: durationType
        });
    }

    /**
     * Changes the label beside the number input based on Cycle, Duration (min/hr/day)
     */
    handleLabelChange() {
        if (this.state.lifeType === initialCycle.type) {
            return "Cycle(s)";
        }
        return this.state.durationType;
    }

    /**
     * Sets a maximum limit based on the lifetype that the user chooses for the announcement
     * @param e
     */
    handleLifeTimeChange(e: React.FormEvent<HTMLInputElement>) {
        let lifeType = this.state.lifeType;

        switch (lifeType) {
            case initialCycle.type:
                e.currentTarget.max = "100";
                break;

            case initialDuration.type:
                switch (this.state.durationType) {
                    case "Minutes":
                        e.currentTarget.max = "59";
                        break;
                    case "Hours":
                        e.currentTarget.max = "23";
                        break;
                    case "Days":
                        e.currentTarget.max = "365";
                        break;
                    default:
                        break;
                }
                break;

            default:
                break;
        }

        this.setState({
            lifeLength: e.currentTarget.value
        });
    }

    /**
     * This simply is the submission of the IMessageBoard object into the redux list
     * @param e
     */
    handlePost(e: React.FormEvent<HTMLButtonElement>) {
        let stateLife = this.state.lifeType;
        let lifeType: LifeType;

        switch (stateLife) {
            case initialCycle.type:
                lifeType = {
                    type: stateLife,
                    cycleNo: +this.state.lifeLength
                };
                break;

            case initialDuration.type:
                lifeType = {
                    type: stateLife,
                    durationType: this.state.durationType,
                    durationTime: +this.state.lifeLength
                };
                break;

            default:
                break;
        }

        let announcementPost: IMessageBoard = {
            timeStamp: new Date().toLocaleString(),
            message: this.state.message,
            caps: this.state.isCaps,
            lifeType: lifeType
        };
        this.props.addMessageBoard(announcementPost);

        this.setState({
            isValid: true,
            canPost: true
        });
    }

    render() {
        return (
            <div>
                <h5> Announcements </h5>
                {/*Message input*/}
                <input type="text" className="textarea-dimens" onChange={this.handleMessageChange} disabled={this.state.canPost} value={this.state.message} />
                <br />
                <br />

                {/*Option div*/}
                <div>
                    <label className="label1"> All Caps: </label>
                    <input type="checkbox" name="caps" onChange={this.handleCapsToggle} />
                    <br />
                    <br />
                    <label className="label1"> Cycles: </label>
                    <input type="radio" name="life-type" className="life-type-radio" defaultChecked={true} value="cycle" onChange={this.handleLifeTypeChange}/>
                    <label className="label1"> Duration: </label>
                    <input type="radio" name="life-type" value="duration" onChange={this.handleLifeTypeChange} />
                    <br />
                </div>

                {/*Number input and radio buttons div*/}
                <div>
                    <input type="number" className="life-length-input" min="1" defaultValue="1" onChange={this.handleLifeTimeChange} />
                    <label className="label1">{this.handleLabelChange()}</label>
                    <input type="radio" name="duration-type" className="custom-radio" defaultChecked={true} hidden={this.toggleLifeType()} value="Minutes" onChange={this.handleDurationTypeChange}/>
                    <input type="radio" name="duration-type" className="custom-radio" hidden={this.toggleLifeType()} value="Hours" onChange={this.handleDurationTypeChange} /> 
                    <input type="radio" name="duration-type" className="custom-radio" hidden={this.toggleLifeType()} value="Days" onChange={this.handleDurationTypeChange} />
                    <br />
                </div>
                <br />

                {/*Button div*/}
                <div>
                    <button className="submit-button" onClick={this.handlePost} disabled={this.state.isValid}> Post Announcement</button>
                    <button className="submit-button" onClick={this.handleEdit}> Enter Announcement</button>
                </div>
                <div className="announcement-strip">
                    <UpdateLabel posted={this.state.canPost} announcement={this.state.message} caps={this.state.isCaps} />
                </div>

                <div className="announcement-list">
                    <MessagesManager />
                    <Testing />
                </div>

            </div>
        );
    }
}

function UpdateLabel(props: any) {
    if (props.posted) {
        if (props.caps) {
            return <label className="label3-announcement-caps">{props.announcement}</label>;
        }
        return <p style={scrollRight}>{props.announcement}</p>;
       // return <p style={scrollRight}>{props.announcenment}</p>;
        //return <p className="scroll-right-p">{props.announcement}</p>;
        //className="label2-announcement"
    }
    return null;
}

const divStyle = {
    color: 'green'
};

const scrollRight = {
    color: 'blue',
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    margin: 0,
    lineHeight: '50px',
    textAlign: 'center',
    transform: 'translate(-100%)',
    animationName: 'scroll-right',
    animationDuration: '10s',
    animationIterationCount: '2'
};

function Testing() {
    return <p style={scrollRight}>Word</p>;
}

export default MessageBoard;