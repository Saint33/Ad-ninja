import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import UserProfileAd from '../Ad/AdUserProfile';
import { logout } from '../../actions/user';
import { userAds } from '../../actions/ad';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { Switch, Route } from 'react-router';
import UserMessages from './UserMessages';
import UserFavorites from './UserFavorites';
import UserAds from './UserAds';
import { NavLink } from 'react-router-dom';

class UserProfile extends Component {
    state = { 
        userAdsActive: [],
        userAdsInactive: [],
        showActive: false,
        showInactive: false
    }

    componentWillMount() {
        // this.props.dispatch(getUser(this.props.user.login.id))
        // axios.get(`/api/user/${this.props.user.login.id}`)
        //     .then(response => this.setState({user: response.data}))
        this.props.dispatch(userAds(this.props.user.id));
    }

    logout = () => {
        this.props.dispatch(logout())
        this.props.history.push('/');
    }

    handleActiveFilter = () => {
        this.setState({showActive: true, showInactive: false})
    }
    handleInactiveFilter = () =>{
        this.setState({showActive: false, showInactive: true})
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
                    <NavLink activeClassName="active-filter" to="/user/profile/ads" className="user-profile__navigation-link">Мои объявления</NavLink>
                    {/* <Motion
                        defaultStyle={{x: -300, opacity: 0}} 
                        style={{x: spring(0), opacity: spring(1, {stiffness: 110, damping: 50})}}
                    >
                        {style => <p className="user-profile__navigation-link" 
                                    style={{ 
                                        transform: `translateX(${style.x}px)`,
                                        opacity: style.opacity 
                                    }}
                                    >Сообщения</p>}
                    </Motion> */}
                    <NavLink 
                        exact 
                        activeClassName="active-filter" 
                        to="/user/profile/messages" 
                        className="user-profile__navigation-link">
                    Сообщения</NavLink>
                    <NavLink 
                        exact 
                        activeClassName="active-filter" 
                        to="/user/profile/favorites" 
                        className="user-profile__navigation-link">
                    Избранное</NavLink>
                    <NavLink 
                        exact 
                        activeClassName="active-filter" 
                        to="/" className="user-profile__navigation-link">
                        Настройки</NavLink>
                    <NavLink 
                        exact 
                        activeClassName="active-filter" 
                        to="/" 
                        className="user-profile__navigation-link" 
                        onClick={this.logout}>Выйти</NavLink>
                </Col>
                <Col>    
                    <div>
                        <Switch>
                            <Route path="/user/profile/messages" component={UserMessages} />
                            <Route path="/user/profile/favorites" component={UserFavorites}/>
                            <Route path="/user/profile/ads" render={() => 
                                <UserAds 
                                    ads={this.props.ad.currentUserAds}
                                    showActive={this.state.showActive}
                                    showInactive={this.state.showInactive}
                                    handleActiveFilter={this.handleActiveFilter.bind(this)}
                                    handleInactiveFilter={this.handleInactiveFilter.bind(this)}
                                />} 
                            />
                        </Switch>
                            {/* {this.state.active ?  activeAds.map(ad => <UserProfileAd key={ad._id} {...ad} />) : null}
                            {this.state.inactive ?  inactiveAds.map(ad => <UserProfileAd key={ad._id} {...ad} />) : null} */}
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