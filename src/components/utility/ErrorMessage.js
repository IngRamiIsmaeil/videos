import React from 'react';

class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
        this.messageRef = React.createRef();
    }
    onHideErrorMessage = (e) => {
        this.props.onHideErrorMessage(e);
    }
    render() {
        return (
            <div ref={this.messageRef} className="ui negative message">
                <i className="close icon" onClick={this.onHideErrorMessage}></i>
                <div className="header">
                    {this.props.header || 'We\'re sorry we can\'t apply that discount'}
                </div>
                <p>
                    {this.props.errorMessage || 'That offer has expired'}
                </p>
            </div>
        )
    }
}
export default ErrorMessage;