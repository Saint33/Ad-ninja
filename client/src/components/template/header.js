import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../UI/button';
import { Animated } from "react-animated-css";
import { openModal } from '../../actions/user';


class Header extends Component {

    handleLogin = () => {
        this.setState((prevState) => ({...prevState, login: true, register: false}))
    }

    handleRegistration = () => {
        this.setState((prevState) => ({...prevState, login: false, register: true}))
    }

    handleOpenModal = () => {
        this.props.dispatch(openModal());
    }

    render(){
        let user = this.props.user.login;
        return (
            <div>
                <Row className="header-login">
                { user.isAuth ? <Link to="/user/profile" className="header-login__user">{user.username}</Link>
                    : <Link to="" className="header-login__user" onClick={this.handleOpenModal}>Вход и регистрация</Link>}
                </Row>
                <Row className="header">
                    <Col xs="3" md="3" lg="4">

                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                        <Link to="/" className="header__title" key="title">Ad Ninja</Link>
                    </Animated>
                    </Col>
                    <Col>
                        <Link to="/" className="header__link">Авто</Link>
                        <Link to="/" className="header__link">Недвижимость</Link>
                        <Link to="/" className="header__link">Работа</Link>
                        <Link to="/" className="header__link">Услуги</Link>
                    </Col>
                    <Col >
                        <div className="header__button-wrapper"><Link to="/additem" className="button">Подать объявление</Link></div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);