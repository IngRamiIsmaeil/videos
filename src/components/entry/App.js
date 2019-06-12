import React from 'react';
import './App.css';
import SearchBar from '../top/SearchBar'
import Youtube from '../../service/YoutubeService';
import Spinner from '../utility/Spinner';
import ErrorMessage from '../utility/ErrorMessage';
class App extends React.Component {
  state = { load: { active: false, header: null, message: null }, error: { present: false, header: null, errorMessage: null } }

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
          this.setState({
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


  render() {
    return (
      <div className="app ui raised very padded text container" style={{ padding: ".50em .50em", margin: "1em" }}>
        <div className="">
          <SearchBar onSearch={this.onRequestSearch} />
        </div>
        {this.state.load.active ?
          <Spinner /> : this.state.error.present ?
            <ErrorMessage header={this.state.error.header} errorMessage={this.state.error.errorMessage} onHideErrorMessage={() => this.setState(
              {
                error: { present: false, header: null, errorMessage: null }
              }
            )} /> :
            null}
      </div>
    );
  }
}

export default App;
