import React from 'react'

class Spinner extends React.Component {

    render() {
        return (
            <div className="ui icon message">
                <i className="notched circle loading icon"></i>
                <div className="content">
                    <div className="header">
                        {this.props.header || 'Just one second'}
                    </div>
                    <p>{this.props.message || 'We\'re fetching that content for you.'}</p>
                </div>
            </div>
        )
    }
}
export default Spinner;