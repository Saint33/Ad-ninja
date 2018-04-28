import React from 'react';
import Header from '../components/template/header';
import Footer from '../components/template/footer';
import { Container } from 'reactstrap';

const Layout = (props) => {
    return (
        <Container>
            <Header />
                {props.children}
            <Footer />
        </Container>
    )
};

export default Layout;