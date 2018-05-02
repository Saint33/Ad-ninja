import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import UserProfileAd from '../Ad/AdUserProfile';
import { logout } from '../../actions/user';
import { withRouter } from 'react-router-dom';

class UserProfile extends Component {
    state = { 
        user: {},
        userAdsActive: [],
        userAdsInactive: [],
        active: false,
        inactive: false
     }
    componentWillMount() {
        axios.get(`/api/user/${this.props.user.login.id}`)
            .then(response => this.setState({user: response.data}))
        axios.get(`/api/ad/user-ads?id=${this.props.user.login.id}`)
            .then(response => {
                console.log(response)
                let userAdsActive = [];
                let userAdsInactive = [];
                response.data.docs.map(ad => {
                    if(ad.active){
                        userAdsActive.push(ad)
                    } else {
                        userAdsInactive.push(ad)
                    }
                })
                this.setState({userAdsActive, userAdsInactive});
            })
    }

    logout = () => {
        this.props.dispatch(logout())
        this.props.history.push('/');
    }

    handleActiveFilter = () => {
        this.setState({active: true, inactive: false})
    }
    handleInactiveFilter = () =>{
        this.setState({active: false, inactive: true})
    }
    render() {
        return (
            <Row className="user-profile">
                <Col xs="3">
                    <p className="user-profile__navigation-link">Мои объявления</p>
                    <p className="user-profile__navigation-link">Сообщения</p>
                    <p className="user-profile__navigation-link">Настройки</p>
                    <p className="user-profile__navigation-link" onClick={this.logout}>Выйти</p>
                </Col>
                <Col>
                    <div>
                        <p 
                            className={this.state.active? 'user-profile__filter active-filter' : 'user-profile__filter'} 
                            onClick={this.handleActiveFilter}
                        >
                        Активные</p>
                        <p 
                            className={this.state.inactive? 'user-profile__filter active-filter' : 'user-profile__filter'} 
                            onClick={this.handleInactiveFilter}
                        >
                        Завершенные</p>
                    </div>
                    <div>
                        {this.state.active ?  this.state.userAdsActive.map(ad => <UserProfileAd key={ad._id} {...ad} />) : null}
                        {this.state.inactive ?  this.state.userAdsInactive.map(ad => <UserProfileAd key={ad._id} {...ad} />) : null}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default withRouter(UserProfile);