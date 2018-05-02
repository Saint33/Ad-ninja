import React from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utility';

const AdListItem = (props) => (
    <div className="adv-list-item">
        <Link to={`/ad/${props._id}`}>
            <img 
                className="adv-list-item__image"
                alt="Обьявление" 
                src={`/api/file/${props.image}`}
            />
        </Link>
        <div className="adv-list-item__description">
            <Link to={`/ad/${props._id}`} className="adv-list-item__description_title">{props.title}</Link>
            <span className="adv-list-item__description_price">{props.price} р.</span>
            <span className="adv-list-item__description_date">{formatDate(props.createdAt)}</span>
        </div>
    </div>

);

export default AdListItem;