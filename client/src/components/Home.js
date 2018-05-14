import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import AdListItem from './Ad/AdListItem';
import axios from 'axios';
import { Input } from 'reactstrap';
import Button from './UI/button';
import Spinner from 'react-spinkit';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            ads : [],
            query: ''
        }
    }

    componentWillMount() {
        axios.get('/api/ad/ads?skip=0&order=desc&limit=18')
            .then(response => {
                this.setState({ads: response.data})
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
        let loader = <Spinner className="loader-position" name='folding-cube' fadeIn="none"/>;

        return (
            <div>
                <Row className="header-search"> 
                    <input 
                        className="header-search__input" 
                        type="text" 
                        onChange={this.handleInputChange}
                        placeholder="Поиск по объявлениям"
                    />
                    <Button onClick={this.handleQuery}>Найти</Button>
                </Row>
                <Row>
                    <Col xs="9">
                        {adList ? adList.map(item => <AdListItem {...item} key={item._id} />) : loader}
                        <button className="header__button home__load-more" onClick={this.loadMore}>Загрузить ещё</button>
                    </Col>

                </Row>
            </div>
        )
    }
}

export default Home;