import React from 'react';
import UserProfileAd from '../Ad/AdUserProfile';
import { TransitionMotion, spring } from 'react-motion';

const willLeave = () => ({
    height: spring(0),
    opacity: spring(0),
})

const willEnter = () => ({
    opacity: 0,
    height: 0
})

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
        {showActive?
        <TransitionMotion
            defaultStyles={ads.activeAds.map(item => ({
                key: item._id,
                style: {opacity: 0},
                data: item
            }))}
            willEnter={willEnter}
            willLeave={willLeave}
            styles={ads.activeAds.map(item => ({
                key: item._id,
                style: {opacity: spring(1)},
                data: item
             }))}>
            {interpolatedStyles =>

              <div>
                {interpolatedStyles.map(config => {
                    console.log(interpolatedStyles)
                    return <UserProfileAd
                        key={config.key} 
                        style={{...config.style }} 
                        {...config.data}
                    />
                })}
              </div>
            }
          </TransitionMotion>
         : null}
        {showInactive? 
                <TransitionMotion
                    defaultStyles={ads.inactiveAds.map(item => ({
                        key: item._id,
                        style: {opacity: 0},
                        data: item
                    }))}
                    willEnter={willEnter}
                    willLeave={willLeave}
                    styles={ads.inactiveAds.map(item => ({
                        key: item._id,
                        style: {opacity: spring(1)},
                        data: item
                     }))}>
                    {interpolatedStyles =>
        
                      <div>
                        {interpolatedStyles.map(config => {
                            console.log(interpolatedStyles)
                            return <UserProfileAd
                                key={config.key} 
                                style={{...config.style }} 
                                {...config.data}
                            />
                        })}
                      </div>
                    }
                  </TransitionMotion>
            : null}
        

    </div>)
    
export default UserAds;