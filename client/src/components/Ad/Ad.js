import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Loader from '../UI/spinner'
import FaPhone from 'react-icons/lib/fa/phone'
import { formatDate, memberSince } from '../../utility'
import { connect } from 'react-redux'
import { getAd } from '../../actions/ad'
import Map from '../Map'
import axios from 'axios'
import { Motion, spring } from 'react-motion'
import AdListItem from './AdListItem'
import Button from '../UI/button'

class Ad extends Component {
    state = {
        adLocation:{
            adLocationFetched: false,
            show: false,
            lat: 47.2984021,
            lng: 39.763526
        },
        similarAds: []
    }

    componentDidMount(){
        this.props.dispatch(getAd(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ad.currentAd.address){
            this.getAdLocation(nextProps.ad.currentAd.address)
        }
        if(nextProps.ad.currentAd.title){
            this.getSimilarAds(nextProps.ad.currentAd.title)
        }
    }

    showMap = () => {
        this.setState({
            adLocation: Object.assign({}, this.state.adLocation, {show: !this.state.adLocation.show})
        })
    }

    getAdLocation(address){
        let encodedAddress = encodeURIComponent(address);
        let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
        axios.get(geocodeUrl)
            .then(response => {
                console.log(response)
                this.setState({
                    adLocation: {
                        adLocationFetched: true,
                        lat: response.data.results[0].geometry.location.lat,
                        lng: response.data.results[0].geometry.location.lng
                    }
                })
            })
    }

    getSimilarAds(title){
        axios.get(`/api/ad/find?query=${title}`)
            .then(response => {
                console.log(response)
                let similarAds = response.data.filter(ad => ad._id !== this.props.match.params.id)
                this.setState({ ...this.state, similarAds })
            })
    }

    render() {
        let ad;
        if(this.props.ad.currentAd && this.props.ad.currentAd._id === this.props.match.params.id){
            ad = this.props.ad.currentAd;
        } else {
            ad = false;
        }
        
        let showAdLocation = this.state.adLocation.show;
        return (
            <div>
                { !ad ? <Loader /> : 
                <div>
            <Row className="adv-item">
            <Col 
                xs={{ size: 12 }} 
                sm={{ size: 5, offset: 0}} 
                md={{ size: 6, offset: 1 }} 
                lg={{ size: 7, offset: 1 }}
            >
                <div>
                    <h3 className="adv-item__title">{ad.title}</h3>
                    <span className="adv-item__number">
                        Размещено {formatDate(ad.createdAt)}
                    </span>
                </div>
                <img 
                    alt={`${ad.title}`}
                    src={`/api/file/${ad.image}`}
                    className="adv-item__image"
                    />
                <div className="adv-item__info">
                    <div className="adv-item__info-address">
                        <span className="adv-item__info-address_title">
                        Адрес:</span>
                        <span className="adv-item__info-address_value">
                        {ad.address}</span>
                        <Button onClick={this.showMap}>Показать карту</Button>
                    <Motion
                        defaultStyle={{opacity: 0, height: 0}} 
                        style={{opacity:spring(1), 
                                height: showAdLocation ? spring(400, {stiffness: 110, damping: 50}) 
                                : spring(0, {stiffness: 210, damping: 50})
                            }}
                    >
                    {style =>
                    <div>
                        {this.state.adLocation.adLocationFetched ? 
                            <Map 
                                lat={this.state.adLocation.lat}
                                lng={this.state.adLocation.lng}
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRutUyMhVs4Af7j54h-Iqpg3dWfPHkhew&callback=myMap"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `${style.height}px` }} />}
                                mapElement={<div style={{ height: `100%`, opacity: style.opacity }} />} 
                            /> 
                            : null}
                    </div>
                    }
                    </Motion>
                    </div>
                    <p className="adv-item__info-description"> 
                        {ad.description}
                    </p>
                </div>
            </Col>   

                <Col 
                    className="adv-item__sideinfo" 
                    xs={{ size: 8, offset: 1 }} 
                    sm={{ size: 3, offset: 0 }} 
                    md="3">
                    <span className="adv-item__price">{ad.price} ₽</span>
                    <div className="adv-item__sellers-info">
                        <div className="adv-item__sellers-info_phone">
                            <FaPhone size={24} className="phone-icon"/>
                            <span className="sellers-phone">{ad.owner.phone}</span>
                        </div>
                            <span className="adv-item__sellers-info_value">Продавец:</span>
                            <Link to={`/user/${ad.owner._id}`} className="adv-item__sellers-info_name">{ad.owner.username}</Link>
                            <span className="adv-item__sellers-info_reg">
                            На Add-ninja c {memberSince(ad.owner.createdAt)}</span>
                        <div className="adv-item__sellers-info_adress">
                            <span className="adv-item__sellers-info_adress-title">Адрес:</span>
                            <span className="adv-item__sellers-info_value">{ad.owner.address}</span>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col 
                    className="similar-ads" 
                    xs={{size: 4, offset: 1}} 
                    md={{ size: 9, offset: 0}} 
                    lg={{ size: 8, offset: 1}}
                    >
                    
                    { 
                        this.state.similarAds.length > 0 ? 
                        <div className="adv-item__similar-ads">
                        <h4>Похожие объявления</h4>
                        {
                        this.state.similarAds.slice(0, 6).map(ad => 
                        <AdListItem {...ad} key={ad._id}/> ) }
                        </div>
                        : <h5 className="adv-item__similar-ads__failed">
                        Похожих объявлений нет:(</h5>
                    }
             
                </Col>
            </Row>
            </div>
            }
            
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ad: state.ad
    }
}

export default connect(mapStateToProps)(Ad);