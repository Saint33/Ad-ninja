import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import {Animated} from "react-animated-css";

let ErrorMessage = (props) => {
	return (
        props.errorMessage ?
            <Animated animationIn="flash" animationOut="fadeOut" isVisible={true}>
                <Alert className="error" color="danger">
                    {props.errorMessage}
                </Alert> 
            </Animated>
        : null
	);
};


const mapStateToProps = (state) => ({
	errorMessage: state.user.login.errorMessage
});

ErrorMessage = connect(mapStateToProps)(ErrorMessage);

export default ErrorMessage;