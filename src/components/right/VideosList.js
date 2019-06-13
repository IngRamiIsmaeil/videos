import React from 'react';
import VideoItem from './VideoItem';

import './VideoList.css';

class VideosList extends React.Component {

    selectVideo = (currentVideo) => {
        this.props.onVideoItemSelect(currentVideo);
    }

    getVideoItemCheckCurrent = (videoItem, id) => {

        if (this.props.currentSelectedVideo === videoItem) {
            return (
                <VideoItem key={'item_' + (id)} targetVideo={videoItem} onSelectVideo={this.selectVideo} selected={true} />
            )
        } else {
            return (
                <VideoItem key={'item_' + (id)} targetVideo={videoItem} onSelectVideo={this.selectVideo} selected={false} />
            )
        }
    }
    render() {
        let id = 0;
        return (
            <div className="ui relaxed divided list">
                {
                    this.props.videos.map((videoItem) => {
                        return (
                            this.getVideoItemCheckCurrent(videoItem, ++id)
                        )
                    })
                }
            </div>
        )
    }
}
export default VideosList;