import React, { Component } from 'react'
import { InputGroup, Input } from 'reactstrap'
import Button from '../UI/button'
import { connect } from 'react-redux'
import { login } from '../../actions/user'
import { withRouter } from 'react-router-dom'
import ErrorMessage from './errorMessage'
import { compose, withHandlers, withState, lifecycle } from 'recompose'
import { closeModal } from '../../actions/user';
 
const enhance = compose(
    withState( 'loginForm', 'handleChange', {email: '', password:'', error: ''} ),
    withHandlers({
        handleEmailChange: props => event => {
            props.handleChange({...props.loginForm, email: event.target.value})
        },
        handlePasswordChange: props => event => {
            props.handleChange({...props.loginForm, password: event.target.value})
        },
        submitLogin: props => event => {
            event.preventDefault();
            const loginData = { 
                email: props.loginForm.email, 
                password: props.loginForm.password 
            }
            props.dispatch(login(loginData));
        }
    }),
    lifecycle({
        componentWillReceiveProps(nextProps){
            if(nextProps.user.login.isAuth){
                nextProps.closeModal();
                nextProps.history.push('/');
            }
        } 
    })
)

const Login = enhance(({ 
    loginForm, 
    handleEmailChange, 
    handlePasswordChange, 
    submitLogin 
}) => 
    <form className="login" onSubmit={submitLogin}>
        <InputGroup>
            <Input 
                type="email"
                placeholder="Электронная почта"
                value={loginForm.email}
                onChange={handleEmailChange}
                className="login__input"
                name="email"
            />
        </InputGroup>
        <InputGroup>   
            <Input 
                type="password"
                placeholder="Пароль"
                value={loginForm.password}
                onChange={handlePasswordChange}
                className="login__input"
                name="password"
            />
        </InputGroup>
        <div className="button_wrapper" key="button">
            <Button   
                key="buttondassd"
                type="submit"
            >Войти</Button>
        </div>
        <ErrorMessage />
    </form>
)

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Login));