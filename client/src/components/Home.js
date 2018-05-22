import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import AdListItem from './Ad/AdListItem';
import axios from 'axios';
import Button from './UI/button';
import Spinner from 'react-spinkit';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            ads : [],
            vipAds: [],
            query: ''
        }
    }

    componentDidMount() {
        axios.get('/api/ad/ads?skip=0&order=desc&limit=18')
            .then(response => {
                this.setState({ads: response.data})
            })
        axios.get('/api/ad/vip')
            .then(response => {
                this.setState({vipAds: response.data.docs.slice(0,4)})
            })
    }

    handleInputChange = (e) => {
        this.setState({query: e.target.value})
    }
    handleQuery = () => {
        if(this.state.query === '') {
            axios.get('/api/ad/ads?skip=0&order=desc&limit=18')
            .then(response => {
                this.setState({ads: response.data})
            })
        } else {
            axios.get(`/api/ad/find?query=${this.state.query}`)
                .then(response => {
                    this.setState({ads: response.data})
                })
        }

    }

    loadMore = () => {
            axios.get(`/api/ad/ads?skip=${this.state.ads.length}&order=desc&limit=18`)
            .then(response => {
                this.setState({ads: this.state.ads.concat(response.data)})
        })
    }

    render(){
        let adList = this.state.ads;
        let vipAds = this.state.vipAds;
        let loader = <Spinner 
                className="loader-position" 
                name='folding-cube' 
                fadeIn="none"
            />;

        return (
            <div>
                <Row className="home-search"> 
                    <input 
                        className="home-search__input" 
                        type="text" 
                        onChange={this.handleInputChange}
                        placeholder="Поиск по объявлениям"
                    />
                    <Button onClick={this.handleQuery}>Найти</Button>
                </Row>
                <Row >
                    <Col xs="12" sm="12" md="8" lg="8" className="home">
                        {adList ? adList.map(item => {
                            if(item.VIP){
                                return (
                                <AdListItem 
                                    {...item} 
                                    userId={this.props.user.id} 
                                    key={item._id} 
                                    className="adv-list-item__vip"
                                    />) 
                            } else {
                                return (
                                <AdListItem 
                                    {...item} 
                                    userId={this.props.user.id} 
                                    key={item._id} />) 
                            }
                        })

                        : loader}
                        <div className="home__load-more">
                        <Button  
                            onClick={this.loadMore}
                        >Загрузить ещё</Button></div>
                    </Col>
                    <Col md="4">
                        <div className="home__vip">
                        <h4 className="home__vip-title">
                        
                           VIP-объявления
                        </h4>
                        <div  className="home__vip-wrapper">
                        {vipAds.map(item => <AdListItem 
                            {...item}
                            userId={this.props.user.id}
                            key={item._id}
                        />)}
                        </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;