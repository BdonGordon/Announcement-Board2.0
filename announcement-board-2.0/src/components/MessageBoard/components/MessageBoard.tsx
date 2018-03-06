import * as React from 'react';
import '../../../ListStyling.css';
import { MessageBoardProps } from '../containers/MessageBoardContainer';
import MessageBoardContainer from '../containers/MessageBoardContainer';
import { IMessageBoard, Cycle, Duration } from '../../../models/MessageBoard';

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
    canPost: true,
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
        //this.setState({ message: message });
        let message: string = this.state.message;
        message = e.currentTarget.value; // this is where we get the inputted value from the InputElement

        if (message.length < 5) {
            this.setState({
                isValid: true
            });
        }
        else {
            //Now we can setState legally by doing so:
            this.setState({
                message: message,
                isValid: false
            });
        }
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

    handleLabelChange() {
        if (this.state.lifeType === initialCycle.type) {
            return "Cycle(s)";
        }
        return this.state.durationType;
    }

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
                <input type="text" className="textarea-dimens" onChange={this.handleMessageChange} disabled={this.state.canPost}/>
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

                {/*Range slider and radio buttons div*/}
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
                    <UpdateLabel posted={this.state.canPost} announcement={this.state.message} />
                </div>

                <div className="announcement-list">
                    <h4 className="h4-list"> Announcement List </h4>
                </div>

            </div>
        );
    }
}

function UpdateLabel(props: any) {
    if (props.posted) {
        return <label className="label2-announcement">{props.announcement}</label>;
    }
    return null;
}


export default MessageBoard;