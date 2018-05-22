import React from 'react'
import { compose, withHandlers, lifecycle, withState, withProps } from 'recompose'
import UserProfileAd from '../Ad/AdUserProfile'
import axios from 'axios'
import differenceWith from 'ramda/src/differenceWith'


const enhance = compose(
    withState( 'favorites', 'handleChange', [] ),
    withHandlers({
        getFavoriteAd: props => ad => props.handleChange([...props.favorites, ad]),
        deleteFavoriteAd: props => deletedAd => {
            props.handleChange(props.favorites.filter(ad => ad._id !== deletedAd))
        }
    }),
    lifecycle({
        componentDidMount(props) {
            this.props.favoriteAds.map(ad => {
                axios.get(`/api/ad?id=${ad}`)
                    .then(response => this.props.getFavoriteAd(response.data))
            })
        },
        componentWillReceiveProps(nextProps) {
            var cmp = (x,y) => x._id === y;
            let [deletedAd] = differenceWith(cmp, nextProps.favorites, nextProps.favoriteAds);
            if(deletedAd) {nextProps.deleteFavoriteAd(deletedAd._id)};
        }
    })
)

const UserFavorites = enhance(({
    favorites,
    userId
}) => (
    <div>
        {favorites.map(ad => 
        <UserProfileAd 
            key={ad._id} 
            fromFavorites={true} 
            userId={userId}
            {...ad}/>)}
    </div>
    )
)

export default UserFavorites;