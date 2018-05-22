import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAd, deleteFromFavorites } from '../../actions/ad';
import { formatDate } from '../../utility'
import Button from '../UI/button';

const UserProfileAd = ( ad, fromFavorites = false, userId ) => (
    <div style={ad.style} className="user-profile-ad">
        <div className="user-profile-ad__image-wrapper">
            <Link to={`/ad/${ad._id}`}>
                <img 
                    alt={`${ad.title}`} 
                    src={`/api/file/${ad.image}`} 
                    className="user-profile-ad__image"
                />
            </Link>
        </div>
        <div className="user-profile-ad__content-wrapper">
            <h3 className="user-profile-ad__title">{ad.title}</h3>
            <span className="user-profile-ad__price">{ad.price}</span>
            <span className="user-profile-ad__date">Размещено {formatDate(ad.createdAt)}</span>
            <Button onClick={() => ad.deleteCurrentAd({adId: ad._id, userId:ad.userId}, fromFavorites)}>Удалить</Button>
        </div>
        
    </div>
)

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCurrentAd: (data, fromFavorites) => {
            fromFavorites ? 
            dispatch(deleteFromFavorites(data))
            :dispatch(deleteAd(data.adId))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserProfileAd);