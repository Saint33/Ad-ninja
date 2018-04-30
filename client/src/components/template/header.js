import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Modal from 'react-modal';
import Login from '../auth/login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
          modalIsOpen: false
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
                    >
                        <Login closeModal={this.closeModal}/>
                    </Modal>
                </Row>
                <Row className="header">
                    <Col md="3" lg="4">
                        <Link to="/" className="header__title">Ad Ninja</Link>
                    </Col>
                    <Col>
                        <Link to="/" className="header__link">Авто</Link>
                        <Link to="/" className="header__link">Недвижимость</Link>
                        <Link to="/" className="header__link">Работа</Link>
                        <Link to="/" className="header__link">Услуги</Link>
                    </Col>
                    <Col >
                        <div className="header__button-wrapper"><Link to="/additem" className="header__button">Подать объявление</Link></div>
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