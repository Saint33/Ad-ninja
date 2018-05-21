import React, { Component } from 'react'
import Modal from 'react-modal'
import Login from '../auth/login'
import Register from '../auth/register'
import { connect } from 'react-redux'
import { openModal, closeModal } from '../../actions/user'
import { Motion, spring } from 'react-motion'
import { compose, withHandlers, withState, withProps } from 'recompose'

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

const enhance = compose(
    withState( 'modal', 'handleChange', { login: true, register: false } ),
    withHandlers({
        switchToLogin: props => event => {
            props.handleChange( { login: true, register: false } )
        },
        switchToRegister: props => event => {
            props.handleChange( { login: false, register: true } )
        },
        handleCloseModal: props => () => {
            props.dispatch(closeModal())
        },
        handleOpenModal: props => () => {
            props.dispatch(openModal())
        }
    })
)

const LoginRegisterModal = enhance(({
    modal,
    switchToLogin,
    switchToRegister,
    handleCloseModal,
    handleOpenModal,
    modalIsOpen
}) =>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
    >   
        <Motion
            defaultStyle={{opacity: 0, x: 0, rotate: 0}}
            style={{
                opacity: spring(1, {stiffness: 110, damping: 37}),
                x: spring(modal.login ? 0 : 115),
                rotate: spring(modal.login? -3 : 3)
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

        <h2 className="modal__title-group">
        <span 
            className="modal__title-item" 
            onClick={switchToLogin}
            >Вход</span> / 
        <span 
            className="modal__title-item" 
            onClick={switchToRegister}
            > Регистрация</span> 
        </h2>
        <div>
        { modal.login ? 
            <Login  
                closeModal={handleCloseModal} 
            />
            : 
            <Register  
                closeModal={handleCloseModal} />

            }
        </div>
    </Modal>

)

const mapStateToProps = (state) => {
    return {
        modalIsOpen: state.user.loginModalIsOpen
    }
}

export default connect(mapStateToProps)(LoginRegisterModal);