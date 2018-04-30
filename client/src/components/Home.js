import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import AdListItem from './Ad/AdListItem';
import axios from 'axios';
import moment from 'moment';
import { Input, Button } from 'reactstrap';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            ads : [],
            query: '',
            initialQuery: '',
            quering: false
        }
        this.formatDate = this.formatDate.bind(this);
    }

    componentWillMount() {
        axios.get('/api/ad/ads?skip=0&order=desc&limit=18')
            .then(response => {
                this.setState({ads: response.data})
            })
    }

    formatDate(date){
        let formattedDate;
        if (moment(date).isSame(moment(), "day")){
            formattedDate = `Сегодня ${moment(date).format("HH:mm")}`
        } else {
            formattedDate = moment(date).format("D MMMM HH:mm")
        }
        return formattedDate;
    }

    handleInputChange = (e) => {
        this.setState({query: e.target.value})
    }
    // handleQuery = () => {
    //     if(this.state.query === '') {
    //         axios.get('/api/ad/ads?skip=0&order=desc&limit=18')
    //         .then(response => {
    //             this.setState({ads: response.data})
    //         })
    //     } else if (this.state.query !== '' && this.state.query !== this.state.initialQuery){
    //         this.setState({initialQuery: this.state.query})
    //         axios.get(`/api/ad/find?query=${this.state.query}&skip=0&limit=18`)
    //             .then(response => {
    //                 this.setState({ads: response.data})
    //             })
    //     } else {
    //         axios.get(`/api/ad/find?query=${this.state.query}&skip=${this.state.ads.length}&limit=18`)
    //             .then(response => {
    //                 this.setState({ads: response.data})
    //             })
    //     }

    // }

    // loadMore = () => {
    //     if(this.state.query !== '' && this.state.query === this.state.initialQuery){
    //         axios.get(`/api/ad/find?query=${this.state.query}&skip=${this.state.ads.length}&limit=18`)
    //             .then(response => {
    //                 this.setState({ads: response.data})
    //             })
    //     } else {
    //         axios.get(`/api/ad/ads?skip=${this.state.ads.length}&order=desc&limit=18`)
    //         .then(response => {
    //             this.setState({ads: this.state.ads.concat(response.data)})
    //         })
    //     }

    // }

    render(){
        let adList = this.state.ads;

        return (
            <div>
                <Row className="header-search"> 
                    <Input className="header-search__input" onChange={this.handleInputChange}/>
                    <Button className="header-search__button" onClick={this.handleQuery}>Найти</Button>
                </Row>
                <Row>
                    <Col xs="9">
                        {adList.map(item => <AdListItem {...item} formatDate={this.formatDate} key={item._id} />)}
                        <Button color="secondary" className="home__load-more" onClick={this.loadMore}>Загрузить ещё</Button>
                    </Col>

                </Row>
            </div>
        )
    }
}

export default Home;