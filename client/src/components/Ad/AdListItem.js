import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utility'
import FaStar from 'react-icons/lib/fa/star'
import { connect } from 'react-redux'
import { addToFavorites } from '../../actions/ad'
import { openModal } from '../../actions/user'

const AdListItem = ({_id, image, title, price, createdAt, handleAddToFavorites, userId, className, VIP}) => (
    <div className={VIP ? "adv-list-item adv-list-item__vip" : "adv-list-item"}>
        <FaStar 
            size={26} 
            color="white" 
            className="adv-list-item__favorite" 
            onClick={() => handleAddToFavorites({id: userId, adId: _id})}
            />
        <Link to={`/ad/${_id}`}>
        <div className="adv-list-item__image-wrapper">
            <img 
                className="adv-list-item__image"
                alt="Обьявление" 
                src={`/api/file/${image}`}
            />
        </div>
        </Link>
        <div className="adv-list-item__description">
            <Link 
                to={`/ad/${_id}`} 
                className="adv-list-item__description_title">
                {title}
            </Link>
            <span 
                className="adv-list-item__description_price">
                {price} р.
            </span>
            <span 
                className="adv-list-item__description_date">
                {formatDate(createdAt)}
            </span>
        </div>
    </div>

);

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddToFavorites: data => {
            if(data.id){
                dispatch(addToFavorites(data))
            } else {
                dispatch(openModal())
            }
        }
    }
}

export default connect(null, mapDispatchToProps)(AdListItem);