import React from 'react'
import './VideoItem.css'
class VideoItem extends React.Component {
    onSelectVideo = () => {
        this.props.onSelectVideo(this.props.targetVideo);
    }

    getClassName() {
        if (this.props.selected) {
            return 'video-section item relaxed selected'
        } else {
            return 'video-section item relaxed'
        }
    }
    render() {
        return (
            <div className={this.getClassName()} onClick={this.onSelectVideo}>
                <img className="ui image" alt="" src={this.props.targetVideo.snippet.thumbnails.medium.url} />
                <div className="content">
                    <span className="header">{this.props.targetVideo.snippet.title}</span>
                </div>
            </div>
        )
    }
}
export default VideoItem;