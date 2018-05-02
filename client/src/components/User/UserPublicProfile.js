import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import AdListItem from '../Ad/AdListItem';
import { memberSince } from '../../utility';

class UserPublicProfile extends Component {
    state = { 
        user: {},
        userAdsActive: [],
        userAdsInactive: [],
        active: true,
        inactive: false
    }
    handleActiveFilter = () => {
        this.setState({active: true, inactive: false})
    }
    handleInactiveFilter = () =>{
        this.setState({active: false, inactive: true})
    }

    componentWillMount() {
        axios.get(`/api/user/${this.props.match.params.id}`)
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

    render() {
        let user = this.state.user;
        return (
            <Row>
               <Col md="9">
                <div className="public-profile">
                    <h3 className="public-profile__name">{user.firstname}</h3>
                    <span className="public-profile__ads">{this.state.userAdsActive.length} активных объявлений</span>
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
                        {this.state.active ?  this.state.userAdsActive.map(ad => <AdListItem key={ad._id} {...ad} />) : null}
                        {this.state.inactive ?  this.state.userAdsInactive.map(ad => <AdListItem key={ad._id} {...ad} />) : null}
                    </div>
               </Col>
               <Col>

               </Col>
            </Row>
        );
    }
}

export default UserPublicProfile;