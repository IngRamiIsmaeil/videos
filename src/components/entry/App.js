import React from 'react';
import './App.css';
import SearchBar from '../top/SearchBar';
import VideoDisplay from '../middel/VideoDisplay';
import VideosList from '../right/VideosList';
import Youtube from '../../service/YoutubeService';
import Spinner from '../utility/Spinner';
import ErrorMessage from '../utility/ErrorMessage';
class App extends React.Component {
  state = {
    videos: [],
    currentSelectedVideo: null,
    load: {
      active: false,
      header: null,
      message: null
    },
    error: {
      present: false,
      header: null,
      errorMessage: null
    }
  }

  onYouTubeRequestHelper = async (searchedVideoTerm) => {
    let userKey = null;
    await this.getPublicYouTubeKey().then(d => {
      userKey = d;
    }

    ).catch(err => {
      userKey = null;
      this.setState({
        load: { active: false, header: null, message: null },
        error: { present: true, header: 'User Key', errorMessage: err.message }
      })
    });

    if (userKey) {
      await Youtube.get('/search', { params: { key: userKey, q: searchedVideoTerm } }).then(
        d => {
          console.log('data ', d.data.items);
          this.setState({
            videos: d.data.items,
            currentSelectedVideo: d.data.items[0],
            load: { active: false, header: null, message: null },
            error: { present: false, message: null }
          })
        }
      ).catch(err => {
        this.setState({
          load: { active: false, header: null, message: null },
          error: { present: true, header: 'Google Developer Error', errorMessage: err.message + '\nthis mean ur key may be invalid.\nplease lern how to make one in console.developers.google' }
        })
      });
    }
  }

  onRequestSearch = (searchedVideoTerm) => {
    this.setState({
      load: { active: true, header: 'YouTube DevolperKey', message: 'Please Enter the Google Devolper Key' },
      error: { present: false, header: null, errorMessage: null }
    })
    setTimeout(() => {
      this.onYouTubeRequestHelper(searchedVideoTerm);
    }, 500)

  }

  getPublicYouTubeKey() {
    return new Promise((resolve, reject) => {
      const devKey = window.prompt('please give ur google.devlover youtube v3 key', 'zero');
      if (devKey !== 'zero') {
        resolve(devKey);
      } else {
        reject('user type no key');
      }
    })
  }

  onVideoItemSelect = (videoItem) => {
    this.setState({ currentSelectedVideo: videoItem });
    console.log(videoItem);
  }

  getSpinnerOrError() {
    if (this.state.load.active) {
      return (
        <div className="ui segment">
          <Spinner />
        </div>
      )
    } else if (this.state.error.present) {
      return (
        <div className="ui segment">
          <ErrorMessage header={this.state.error.header} errorMessage={this.state.error.errorMessage} onHideErrorMessage={() => this.setState(
            {
              error: { present: false, header: null, errorMessage: null }
            }
          )} />
        </div>
      )
    } else {
      return null;
    }
  }

  getVideoDisplay() {
    if (this.state.videos.length) {
      return (
        <VideoDisplay video={this.state.currentSelectedVideo} />
      )
    } else {
      return <div></div>
    }
  }

  getVideoList() {
    if (this.state.videos.length) {
      return (
        <VideosList videos={this.state.videos} currentSelectedVideo={this.state.currentSelectedVideo} onVideoItemSelect={this.onVideoItemSelect} />
      )
    } else {
      return <div></div>
    }
  }
  render() {
    return (
      <div className="ui container" style={{ padding: ".50em .50em", margin: "1em" }}>
        <SearchBar onSearch={this.onRequestSearch} />

        {this.getSpinnerOrError()}

        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              {
                this.getVideoDisplay()
              }
            </div>
            <div className="five wide column">
              {
                this.getVideoList()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
