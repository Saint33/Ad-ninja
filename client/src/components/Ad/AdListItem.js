import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utility';

const AdListItem = ({_id, image, title, price, createdAt}) => (
    <div className="adv-list-item">
        <Link to={`/ad/${_id}`}>
            <img 
                className="adv-list-item__image"
                alt="Обьявление" 
                src={`/api/file/${image}`}
            />
        </Link>
        <div className="adv-list-item__description">
            <Link to={`/ad/${_id}`} className="adv-list-item__description_title">{title}</Link>
            <span className="adv-list-item__description_price">{price} р.</span>
            <span className="adv-list-item__description_date">{formatDate(createdAt)}</span>
        </div>
    </div>

);

export default AdListItem;