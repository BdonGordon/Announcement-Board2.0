import * as React from 'react';
import '../../../ListStyling.css';
import { MessageBoardProps } from '../containers/MessageBoardContainer';
import MessageBoardContainer from '../containers/MessageBoardContainer';

const initialState: MessageBoardProps.IState = {
    isCaps: false,
    isCycle: true
};

class MessageBoard extends React.Component<MessageBoardProps.IProps, MessageBoardProps.IState> {
    constructor(props: MessageBoardProps.IProps) {
        super(props);

        this.state = initialState;
        this.handleCapsToggle = this.handleCapsToggle.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleLifeTypeChange = this.handleLifeTypeChange.bind(this);
        this.toggleLifeType = this.toggleLifeType.bind(this);
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
            isCycle: isCycle
        });

        return isCycle;
    }

    toggleLifeType() {
        var lifeType: boolean = this.state.isCycle;

        return lifeType;
    }

    handlePost(e: React.FormEvent<HTMLButtonElement>) {
        console.log(this.state.isCaps + " && " + this.state.isCycle);
    }

    render() {
        return (
            <div>
                <h5> Announcements </h5>
                <input type="text" className="textarea-dimens"/>
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
                    <input type="range" className="custom-range" />
                    <input type="radio" name="duration-type" className="custom-radio" defaultChecked={true} hidden={this.toggleLifeType()} value="Minutes" />
                    <input type="radio" name="duration-type" className="custom-radio" hidden={this.toggleLifeType()} value="Hours" />
                    <input type="radio" name="duration-type" className="custom-radio" hidden={this.toggleLifeType()} value="Days"/>
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