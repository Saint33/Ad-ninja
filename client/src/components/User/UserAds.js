import React from 'react';
import UserProfileAd from '../Ad/AdUserProfile';

const UserAds = ({ads, showActive, showInactive, handleActiveFilter, handleInactiveFilter}) => (
    <div>
        <p 
            className={showActive? 'user-profile__filter active-filter' : 'user-profile__filter'} 
            onClick={handleActiveFilter}
        >
        Активные</p>
        <p 
            className={showInactive? 'user-profile__filter active-filter' : 'user-profile__filter'} 
            onClick={handleInactiveFilter}
        >
        Завершенные</p>
        {showActive? ads.activeAds.map(ad => <UserProfileAd key={ad._id} {...ad} />) : null}
        {showInactive? ads.inactiveAds.map(ad => <UserProfileAd key={ad._id} {...ad} />) : null}
    </div>)
export default UserAds;