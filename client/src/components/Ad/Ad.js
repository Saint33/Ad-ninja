import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import FaPhone from 'react-icons/lib/fa/phone';
import { formatDate, memberSince } from '../../utility';
import { connect } from 'react-redux';
import { getAd } from '../../actions/ad';

class Ad extends Component {

    componentWillMount(){
        this.props.dispatch(getAd(this.props.match.params.id))
            
    }

    render() {
        let ad = this.props.ad.currentAd;
        let loader = <Spinner className="loader-position" name='folding-cube' fadeIn="none"/>;
        return (
            <div>
                { !ad ? loader : 
            
            <Row className="adv-item">
            <Col xs={{ size: 7, offset: 1 }}>
                <div>
                    <h3 className="adv-item__title">{ad.title}</h3>
                    <span className="adv-item__number">№ 991446249, размещено {formatDate(ad.createdAt)}</span>
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
                        <FaPhone size={20} className="phone-icon"/>
                        <span >{ad.owner.phone}</span>
                    </div>
                        <Link to={`/user/${ad.owner._id}`} className="adv-item__selers-info_name">{ad.owner.firstname}</Link>
                        <span className="adv-item__selers-info_reg">На Add-ninja c {memberSince(ad.owner.createdAt)}</span>
                    <div className="adv-item__selers-info_adress">
                        <span className="adv-item__selers-info_adress-title">Адрес:</span>
                        <span className="adv-item__selers-info_adress-value">{ad.owner.address}</span>

                    </div>
                </div>
            </Col>
            </Row>
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