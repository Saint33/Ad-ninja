import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Modal from 'react-modal';
import Login from '../auth/login';
import Register from '../auth/register';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../UI/button';
import { Animated } from "react-animated-css";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Header extends Component {
    constructor() {
        super();
    
        this.state = {
          modalIsOpen: false,
          login: true,
          register: false
        };
    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleLogin = () => {
        this.setState((prevState) => ({...prevState, login: true, register: false}))
    }

    handleRegistration = () => {
        this.setState((prevState) => ({...prevState, login: false, register: true}))
    }

    render(){
        let user = this.props.user.login;
        return (
            <div>
                <Row className="header-login">
                { user.isAuth ? <Link to="/user/profile" className="header-login__user">{user.username}</Link>
                    : <Link to="" className="header-login__user" onClick={this.openModal}>Вход и регистрация</Link>}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >   <h2 className="login__title">
                            <span className={this.state.login ? 'modal-title-active modal-title': 'modal-title'} onClick={this.handleLogin}>Вход</span> / 
                            <span className={this.state.register ? 'modal-title-active modal-title' : 'modal-title'} onClick={this.handleRegistration}>Регистрация</span> 
                        </h2>
                        <div>
                            { this.state.login ? 
                            <Login closeModal={this.closeModal}/> : 
                            <Register closeModal={this.closeModal}/>
                            }
                        </div>
                    </Modal>
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