import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loaders'
import moment from 'moment';

class Ad extends Component {
    state = { 
        currentAd: {},
        currentAdOwner: {},
        loading: true
     }

    memberSince(date){
        return moment(date).format("MMMM YYYY")
    }

    componentWillMount(){
        axios.get(`/api/ad?id=${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    currentAd: response.data
                })
                axios.get(`/api/user/${response.data.ownerId}`)
                    .then(response => {
                        this.setState({
                            currentAdOwner: response.data,
                            loading: false
                        }) 
                    })
            });
    }
    render() {
        let ad = this.state.currentAd;
        let adOwner = this.state.currentAdOwner;
        let loader = <Loader innerClassName="loader-position" type="ball-clip-rotate-multiple" />
        return (
            <div>
                {this.state.loading ? loader : 
            
            <Row className="adv-item">
            <Col xs={{ size: 7, offset: 1 }}>
                <div>
                    <h3 className="adv-item__title">{ad.title}</h3>
                    <span className="adv-item__number">№ 991446249, размещено сегодня в 10:32</span>
                </div>
                <img 
                    src={`/api/file/${ad.image}`}
                    className="adv-item__image"
                    />
                <div className="adv-item__info">
                    <div className="adv-item__info-address">
                        <span className="adv-item__info-address_title">Адрес:</span>
                        <span className="adv-item__info-address_value">{ad.address}</span>
                    </div>
                    <p className="adv-item__info-description"> 
                        {ad.description}
                    </p>

                </div>
            </Col>
            <Col className="adv-item__sideinfo" xs={{ size: 3 }}>
                <span className="adv-item__price">{ad.price} ₽</span>
                <div className="adv-item__selers-info">
                    <div className="adv-item__selers-info_phone">
                        Телефон
                        {adOwner.phone}
                    </div>
                        <Link to="" className="adv-item__selers-info_name">{adOwner.lastname}</Link>
                        <span className="adv-item__selers-info_reg">На Add-ninja c {this.memberSince(adOwner.createdAt)}</span>
                        
                    <Link to="" className="adv-item__selers-info_ads">
                        4 объявления пользователя
                    </Link>
                    <div className="adv-item__selers-info_adress">
                        <span className="adv-item__selers-info_adress-title">Адрес:</span>
                        <span className="adv-item__selers-info_adress-value">{adOwner.address}</span>

                    </div>
                </div>

                
            </Col>
            </Row>
            }
            </div>

        );
    }
}

export default Ad;