import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import AdListItem from './Ad/AdListItem';
import axios from 'axios';
import { Input } from 'reactstrap';

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

        return (
            <div>
                <Row className="header-search"> 
                    <Input className="header-search__input" onChange={this.handleInputChange}/>
                    <button className="header__button header-search__button" onClick={this.handleQuery}>Найти</button>
                </Row>
                <Row>
                    <Col xs="9">
                        {adList.map(item => <AdListItem {...item} key={item._id} />)}
                        <button className="header__button home__load-more" onClick={this.loadMore}>Загрузить ещё</button>
                    </Col>

                </Row>
            </div>
        )
    }
}

export default Home;