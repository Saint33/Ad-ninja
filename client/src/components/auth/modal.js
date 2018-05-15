import React, { Component } from 'react';
import Modal from 'react-modal';
import Login from '../auth/login';
import Register from '../auth/register';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/user';
import { Motion, spring, TransitionMotion } from 'react-motion';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      borderRadius         : '10px'
    }
  };

class LoginRegisterModal extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          login: true,
          register: false
        };
    }

    handleLogin = () => {
        this.setState((prevState) => ({...prevState, login: true, register: false}))
    }

    handleRegistration = () => {
        this.setState((prevState) => ({...prevState, login: false, register: true}))
    }
    handleOpenModal = () => {
        this.props.dispatch(openModal())
    }
    
    handleCloseModal = () => {
        this.props.dispatch(closeModal())
    }
    willLeave() {
        // triggered when c's gone. Keeping c until its width/height reach 0.
        return {width: spring(0), height: spring(0), opacity: spring(0)};
      }
    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.handleCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
            >   
            <Motion
                defaultStyle={{opacity: 0, x: 0, rotate: 0}}
                style={{
                    opacity: spring(1, {stiffness: 110, damping: 37}),
                    x: spring(this.state.login ? 0 : 115),
                    rotate: spring(this.state.login? -3 : 3)
                }}
            >
                { interpolatingStyle => 
                    <img 
                        style={{
                            opacity: interpolatingStyle.opacity,
                            transform: `translateX(${interpolatingStyle.x}px) rotate(${interpolatingStyle.rotate}turn)`
                        }}
                        src="/images/suricane.png" 
                        alt="suricane" 
                        className="modal-suricane"
                    />
                }
            </Motion>
            
            <h2 className="login__title">
                <span 
                    className={this.state.login ? 'modal-title-active modal-title': 'modal-title'} 
                    onClick={this.handleLogin}
                    >Вход</span> / 
                <span 
                    className={this.state.register ? 'modal-title-active modal-title' : 'modal-title'} 
                    onClick={this.handleRegistration}
                    > Регистрация</span> 
            </h2>
            <div>
                { this.state.login ? 
                    <Login  
                        closeModal={this.handleCloseModal} 
                     />
                    : 
                    <Register  
                         closeModal={this.handleCloseModal} />

                    }
            </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modalIsOpen: state.user.loginModalIsOpen
    }
}

export default connect(mapStateToProps)(LoginRegisterModal);