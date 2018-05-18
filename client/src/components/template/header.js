import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
                    <Col xs="6" sm="4" md="3" lg="3">

                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                        <Link to="/" className="header__title" key="title">Ad Ninja</Link>
                    </Animated>
                    </Col>
                    <Col xs="4" sm={{ size: 4, offset: 0}} md={{ size: 4, offset: 0}} lg={{ size: 4, offset: 1 }} xl={{ size: 4, offset: 1 }} className="header__navigation">
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