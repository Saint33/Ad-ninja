import React, { Component } from 'react';
import { InputGroup, Input } from 'reactstrap';
import Button from '../UI/button';
import { connect } from 'react-redux';
import { login } from '../../actions/user';
import { withRouter } from 'react-router-dom';
import ErrorMessage from './errorMessage';

export class Login extends Component {
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
        if(nextProps.user.login.isAuth){
            this.props.closeModal();
            this.props.history.push('/');
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        let loginData = {email:this.state.email, password: this.state.password}
        this.props.dispatch(login(loginData));
    }

    render() {
        return (
                <form className="login" onSubmit={this.submitForm} >
                    <InputGroup>
                        <Input 
                            type="email"
                            placeholder="Электронная почта"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                            className="login__input"
                            name="email"
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
                            name="password"
                        />
                    </InputGroup>
                    <div className="button_wrapper" key="button">
                        <Button   key="buttondassd"
                            type="submit"
                        >Войти</Button>
                    </div>
                    
                        <ErrorMessage />

                </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Login));