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
            query: ''
        }
    }

    componentDidMount() {
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
                    <Col xs="12" sm="9" md="9" className="home">
                        {adList ? adList.map(item => <AdListItem {...item} key={item._id} />) : loader}
                        <div className="home__load-more"><Button  onClick={this.loadMore}>Загрузить ещё</Button></div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;