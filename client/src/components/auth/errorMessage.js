import React from 'react';
import { connect } from 'react-redux';

let ErrorMessage = (props) => {
	return (
		props.errorMessage ?
			<div className="error-wrapper">
				<p className="error">{props.errorMessage}</p>
			</div>
			:<div></div>
	);
};

const mapStateToProps = (state) => ({
	errorMessage: state.user.login.errorMessage
});

ErrorMessage = connect(mapStateToProps)(ErrorMessage);

export default ErrorMessage;