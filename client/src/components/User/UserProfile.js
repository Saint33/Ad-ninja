import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import UserProfileAd from '../Ad/AdUserProfile';
import { logout } from '../../actions/user';
import { userAds } from '../../actions/ad';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UserProfile extends Component {
    state = { 

        userAdsActive: [],
        userAdsInactive: [],
        active: false,
        inactive: false
     }
    componentWillMount() {
        // this.props.dispatch(getUser(this.props.user.login.id))
        // axios.get(`/api/user/${this.props.user.login.id}`)
        //     .then(response => this.setState({user: response.data}))
        this.props.dispatch(userAds(this.props.user.login.id));
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
        let activeAds = [], inactiveAds = [];
        if(this.props.ad.currentUserAds){
            activeAds = this.props.ad.currentUserAds.activeAds;
            inactiveAds = this.props.ad.currentUserAds.inactiveAds;
        }

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
                        {this.state.active ?  activeAds.map(ad => <UserProfileAd key={ad._id} {...ad} />) : null}
                        {this.state.inactive ?  inactiveAds.map(ad => <UserProfileAd key={ad._id} {...ad} />) : null}
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ad: state.ad
    }
}

export default connect(mapStateToProps)(withRouter(UserProfile));