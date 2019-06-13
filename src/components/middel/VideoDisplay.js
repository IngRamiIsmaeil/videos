import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class VideoDisplay extends React.Component {
    getVideoFrame = () => {
        if (this.props.video) {
            return (
                <div className="ui embed">
                    <iframe title="video" src={'https://www.youtube.com/embed/' + this.props.video.id.videoId} />
                </div>
            )
        }
        return null
    }
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100%' }} />
                    {
                        this.getVideoFrame()
                    }
                    <h4 className="header">
                        {this.props.video ? this.props.video.snippet.channelTitle : null}
                    </h4>
                    <p>
                        {this.props.video ? this.props.video.snippet.description : null}
                    </p>
                </Container>
            </React.Fragment>
        )
    }
}
export default VideoDisplay;