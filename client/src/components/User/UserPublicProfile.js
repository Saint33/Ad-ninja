import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import AdListItem from '../Ad/AdListItem';
import { memberSince } from '../../utility';
import { getUserWithAds } from '../../actions/user';
import { connect } from 'react-redux';
import Loader from '../UI/spinner';

class UserPublicProfile extends Component {
    state = { 
        active: true,
        inactive: false,
        userFetched: false,
        userAdsFetched: false
    }
    handleActiveFilter = () => {
        this.setState({active: true, inactive: false})
    }
    handleInactiveFilter = () =>{
        this.setState({active: false, inactive: true})
    }

    componentDidMount() {
        this.props.dispatch(getUserWithAds(this.props.match.params.id));
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.user.currentUser._id === this.props.match.params.id){
            this.setState({...this.state, userFetched: true })
        }
        if(newProps.ad.currentUserAds){
            this.setState({...this.state, userAdsFetched: true })
        }
    }

    render() {

        let user = this.props.user.currentUser;
        let userAds = this.props.ad.currentUserAds;

        return (
            <div>
                { !( this.state.userAdsFetched && this.state.userAdsFetched )? <Loader />: 
                            <Row>
                            <Col md="9">
                             <div className="public-profile">
                                 <h3 className="public-profile__name">{user.firstname}</h3>
                                 <span className="public-profile__ads">{userAds.activeAds.length} активных объявлений</span>
                                 <span className="public-profile__since">На Add-Ninja с {memberSince(user.createdAd)}</span>
                                 <span className="public-profile__address">{user.address}</span>
                             </div>
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
                                     {this.state.active ?  userAds.activeAds.map(ad => <AdListItem key={ad._id} {...ad} />) : null}
                                     {this.state.inactive ?  userAds.inactiveAds.map(ad => <AdListItem key={ad._id} {...ad} />) : null}
                                 </div>
                            </Col>
                            <Col>
             
                            </Col>
                         </Row>

                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        ad: state.ad
    }
}

export default connect(mapStateToProps)(UserPublicProfile);