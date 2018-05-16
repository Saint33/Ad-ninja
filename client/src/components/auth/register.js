import React, { Component } from 'react';
import { InputGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Button from '../UI/button';
import { register, login } from '../../actions/user';
import { withRouter } from 'react-router-dom';

export class Register extends Component {
    state = { 
        email: '',
        password: '',
        error: '',
        username: '',
        phone: ''
    }
    
    handleInputEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handleInputPassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleInputUsername = (e) => {
        this.setState({username: e.target.value})
    }

    handleInputPhone = (e) => {
        this.setState({phone: e.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            console.log(nextProps)
            this.props.closeModal();
            this.props.history.push('/');
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        let registrationData = {
            email: this.state.email, 
            password: this.state.password,
            phone: this.state.phone,
            username: this.state.username
        }
        this.props.dispatch(register(registrationData));
    }

    render() {
        return (
                <form className="login" onSubmit={this.submitForm}>
                    <InputGroup>
                        <Input 
                            type="text"
                            placeholder="Имя пользователя"
                            value={this.state.username}
                            onChange={this.handleInputUsername}
                            className="login__input"
                            name="username"
                            />
                            <br />
                    </InputGroup>
                    <InputGroup>
                        <Input 
                            type="text"
                            placeholder="Телефон"
                            value={this.state.phone}
                            onChange={this.handleInputPhone}
                            className="login__input"
                            name="phone"
                            />
                            <br />
                    </InputGroup>
                    <InputGroup>
                        <Input 
                            type="email"
                            placeholder="Электронная почта"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                            className="login__input"
                            />
                            <br />
                    </InputGroup>
                    <InputGroup>
                    <Input 
                            type="password"
                            placeholder="Пароль"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                            className="login__input"
                        />
                    </InputGroup>
                    <div className="button_wrapper">
                    <Button 
                        type="submit"
                    >Зарегистрироваться</Button>
                    </div>
                </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Register));