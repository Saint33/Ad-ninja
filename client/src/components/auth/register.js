import React, { Component } from 'react';
import { InputGroup, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/user';
import axios from 'axios';

class Register extends Component {
    state = { 
        email: '',
        password: '',
        error: ''
    }
    
    handleInputEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handleInputPassword = (e) => {
        this.setState({password: e.target.value})
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

    submitForm = (e) => {
        e.preventDefault();
        let loginData = {email:this.state.email, password: this.state.password}
        axios.post('/api/auth/register', loginData)
            .then(response => console.log(response))
    }

    render() {
        return (
                <form className="login" onSubmit={this.submitForm}>
                    <h2 className="login__title">Регистрация</h2>
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
                        color="primary"
                        type="submit"
                        className="login__button"
                    >Войти</Button>
                    </div>
                </form>
        );
    }
}


export default Register;