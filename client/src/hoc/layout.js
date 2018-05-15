import React from 'react';
import Header from '../components/template/header';
import Footer from '../components/template/footer';
import { Container } from 'reactstrap';
import LoginRegisterModal from '../components/auth/modal';

const Layout = (props) => {
    return (
        <Container className="main-wrapper">
            <Header />
            <LoginRegisterModal />
                {props.children}
            <Footer />
        </Container>
    )
};

export default Layout;