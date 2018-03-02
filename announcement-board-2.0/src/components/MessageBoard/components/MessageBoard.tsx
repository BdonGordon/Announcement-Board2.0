import * as React from 'react';
import '../../../ListStyling.css';

class MessageBoard extends React.Component {
    render() {
        return (
            <div>
                <h5> Announcements </h5>
                <input type="text" className="textarea-dimens"/>
                <br />
                <button className="submit-button"> Post Announcement</button>
                <button className="submit-button">Enter Announcement</button>

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