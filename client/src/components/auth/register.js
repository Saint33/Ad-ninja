import React, { Component } from 'react';
import { InputGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Button from '../UI/button';
import { register } from '../../actions/user';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withState, lifecycle } from 'recompose'

const enhance = compose(
    withState( 'registerForm', 'handleChange', 
        {   
            email: '',
            password: '',
            error: '',
            username: '',
            phone: ''
        }),
    withHandlers({
        handleInputChange: props => ( name, event ) => {
            props.handleChange({...props.registerForm, [name]: event.target.value })
        },
        submitRegister: props => event => {
            event.preventDefault();
            let registrationData = {
                email: props.registerForm.email, 
                password: props.registerForm.password,
                phone: props.registerForm.phone,
                username: props.registerForm.username
            }
            props.dispatch(register(registrationData));
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

const Register = enhance(({
    registerForm,
    handleInputChange,
    submitRegister
}) =>
    <form className="login" onSubmit={submitRegister}>
        <InputGroup>
            <Input 
                type="text"
                placeholder="Имя пользователя"
                value={registerForm.username}
                onChange={(event) => handleInputChange('username', event)}
                className="login__input"
                name="username"
                />
                <br />
        </InputGroup>
        <InputGroup>
            <Input 
                type="text"
                placeholder="Телефон"
                value={registerForm.phone}
                onChange={(event) => handleInputChange('phone', event)}
                className="login__input"
                name="phone"
                />
                <br />
        </InputGroup>
        <InputGroup>
            <Input 
                type="email"
                placeholder="Электронная почта"
                value={registerForm.email}
                onChange={(event) => handleInputChange('email', event)}
                className="login__input"
                />
                <br />
        </InputGroup>
        <InputGroup>
        <Input 
                type="password"
                placeholder="Пароль"
                value={registerForm.password}
                onChange={(event) => handleInputChange('password', event)}
                className="login__input"
            />
        </InputGroup>
        <div className="button_wrapper">
        <Button 
            type="submit"
        >Зарегистрироваться</Button>
        </div>
    </form>)

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Register));