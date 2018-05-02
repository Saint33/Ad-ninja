import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAd } from '../../actions/ad';
import { formatDate } from '../../utility'

const UserProfileAd = (ad) => (
    <div className="user-profile-ad">
        <div className="user-profile-ad__image-wrapper">
            <Link to={`/ad/${ad._id}`}>
                <img src={`/api/file/${ad.image}`} className="user-profile-ad__image"/>
            </Link>
        </div>
        <div className="user-profile-ad__content-wrapper">
            <h3 className="user-profile-ad__title">{ad.title}</h3>
            <span className="user-profile-ad__price">{ad.price}</span>
            <span className="user-profile-ad__date">Размещено {formatDate(ad.createdAt)}</span>
            <button className="user-profile-ad__button" onClick={() => ad.deleteCurrentAd(ad._id)}>Удалить</button>
        </div>
        
    </div>
)

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCurrentAd: (id) => {
            dispatch(deleteAd(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserProfileAd);