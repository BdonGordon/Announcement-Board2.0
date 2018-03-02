import * as React from 'react';
import '../../../ListStyling.css';
import { MessageBoardProps } from '../containers/MessageBoardContainer';
import MessageBoardContainer from '../containers/MessageBoardContainer';
import { IAnnouncement } from '../../../models/Announcements';

const initialState: MessageBoardProps.IState = {
    timeStamp: '',
    message: '',
    isCaps: false,
    isCycle: true,
};

class MessageBoard extends React.Component<MessageBoardProps.IProps, MessageBoardProps.IState> {
    constructor(props: MessageBoardProps.IProps) {
        super(props);

        this.state = initialState;
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleCapsToggle = this.handleCapsToggle.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleLifeTypeChange = this.handleLifeTypeChange.bind(this);
        this.toggleLifeType = this.toggleLifeType.bind(this);
        this.handleDurationTypeChange = this.handleDurationTypeChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    handleMessageChange(e: React.FormEvent<HTMLInputElement>) {
        var message: string = e.currentTarget.value;

        this.setState({
            message: message
        });
    }

    /**
     * Simply checks if the allcaps checkbox is checked or not and sets the state
     * @param e
     */
    handleCapsToggle(e: React.FormEvent<HTMLInputElement>) {
        var checked = e.currentTarget.checked;

        this.setState({
            isCaps: checked
        });
    }

    /**
     * lifeType of the announcement: cycle or duration. 
     * @param e
     */
    handleLifeTypeChange(e: React.FormEvent<HTMLInputElement>) {
        var isCycle: boolean;
        
        if (e.currentTarget.value === "Cycles") {
            isCycle = true;
        }
        else {
            isCycle = false;
        }

        this.setState({
            isCycle: isCycle,
            
        });

        return isCycle;
    }

    /**
     * Gets the lifeType of cycles or duration to hide or render the radio buttons for minutes/hrs/days of the Duration lifeType
     */
    toggleLifeType() {
        var lifeType: boolean = this.state.isCycle;

        return lifeType;
    }

    /**
     * Make sure to set the durationType to "Minutes" somehow
     * @param e
     */
    handleDurationTypeChange(e: React.FormEvent<HTMLInputElement>) {
        var durationType: string = e.currentTarget.value;

        switch (durationType) {
            case "Minutes":
                console.log("Minutes");
                break;

            case "Hours":
                console.log("Hours");
                break;

            case "Days":
                console.log("Days");
                break;

            default:
                break;
        }
    }

    handleSliderChange(e: React.FormEvent<HTMLInputElement>) {
        e.currentTarget.max = "100";
        console.log(e.currentTarget.value);
    }

    handlePost(e: React.FormEvent<HTMLButtonElement>) {
        let newAnnouncement: IAnnouncement = {
            timeStamp: new Date().toLocaleString(),
            message: this.state.message,
            caps: this.state.isCaps,
            lifeType: this.state.isCycle
        };

        console.log(newAnnouncement.timeStamp + " && " + newAnnouncement.message + " && " + newAnnouncement.caps + " && " + newAnnouncement.lifeType);
    }

    render() {
        return (
            <div>
                <h5> Announcements </h5>
                <input type="text" className="textarea-dimens" onChange={this.handleMessageChange} />
                <br />
                <br />

                {/*Option div*/}
                <div>
                    <label> All Caps: </label>
                    <input type="checkbox" name="caps" onChange={this.handleCapsToggle} />
                    <br />
                    <br />
                    <label> Cycles: </label>
                    <input type="radio" name="life-type" className="life-type-radio" defaultChecked={true} value="Cycles" onChange={this.handleLifeTypeChange} />
                    <label> Duration: </label>
                    <input type="radio" name="life-type" value="Duration" onChange={this.handleLifeTypeChange} />
                    <br />
                </div>

                {/*Range slider and radio buttons div*/}
                <div>
                    <input type="range" className="custom-range" min="1" onChange={this.handleSliderChange} defaultValue="1" />
                    <input type="radio" name="duration-type" className="custom-radio" defaultChecked={true} hidden={this.toggleLifeType()} value="Minutes" onChange={this.handleDurationTypeChange} />
                    <input type="radio" name="duration-type" className="custom-radio" hidden={this.toggleLifeType()} value="Hours" onChange={this.handleDurationTypeChange}/>
                    <input type="radio" name="duration-type" className="custom-radio" hidden={this.toggleLifeType()} value="Days" onChange={this.handleDurationTypeChange}/>
                </div>
                <br />

                {/*Button div*/}
                <div>
                    <button className="submit-button" onClick={this.handlePost}> Post Announcement</button>
                    <button className="submit-button"> Enter Announcement</button>
                </div>
                <div className="announcement-strip">
                    <label> Hello </label>
                </div>

                <div className="announcement-list">
                    <h4 className="h4-list"> Announcement List </h4>
                </div>

            </div>

        );
    }
}


export default MessageBoard;