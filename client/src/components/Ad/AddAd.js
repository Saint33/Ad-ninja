import React from 'react';
import { Col,  Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class AddAd extends React.Component {
    state = {
        adInfo: {
            category: 'cars',
            title: '',
            description: '',
            price: '',
            address: ''
        },
        image: null
    }

    handleCategoryChange = (e) => {
        this.setState({adInfo:{...this.state.adInfo, category: e.target.value, }})
    }
    handleAddressChange = (e) => {
        this.setState({adInfo: {...this.state.adInfo, address: e.target.value}})
    }
    handleTitleChange = (e) => {
        this.setState({adInfo: {...this.state.adInfo, title: e.target.value}})
    }
    handleDescriptionChange = (e) => {
        this.setState({adInfo: {...this.state.adInfo, description: e.target.value}})
    }
    handlePriceChange = (e) => {
        this.setState({adInfo: {...this.state.adInfo, price: e.target.value}})
    }
    handleImageChange = (e) => {
        let file = e.target.files[0];
        let adImage = new FormData();
        adImage.append('file', file);
        this.setState({image: adImage})
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/ad', {...this.state.adInfo, ownerId: this.props.user.login.id}) 
            .then(response => {
                console.log(response);
                let id = response.data.AdId;
                let image = this.state.image;
                image.append('id', id);
                axios.post('/api/upload', image)
                    .then(response => console.log(response))
            })
    }

  render() {
      let user = this.props.user.login;
    return (
    <Row>
        
        <Col sm={8}>
        <h3 className="add-ad__title">Подать объявление</h3>
        <div className="contacts">
            <h4 className="contacts__title">Контактная информация</h4>
            <div>
                <div className="contacts__group">
                    <span className="contacts__item">Электронная почта </span>
                    <span className="contacts__value">{user.email}</span>
                </div>
                <div className="contacts__group">
                    <span className="contacts__item">Ваше имя</span>
                    <span className="contacts__value">{user.firstname}</span>
                </div>
                <div className="contacts__group">
                    <span className="contacts__item">Телефон</span>
                    <span className="contacts__value">{user.phone}</span>
                </div>
            </div>
        </div>
      <Form onSubmit={this.handleFormSubmit}>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Категория</Label>
          <Col sm={5}>
            <Input type="select" name="category" onChange={this.handleCategoryChange}>
                <option value="cars">Авто</option>
                <option value="realestate">Недвижимость</option>
                <option value="jobs">Работа</option>
                <option value="electronics">Бытовая Электроника</option>
                <option value="personal">Личные вещи</option>
                <option value="hobby">Хобби</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Город</Label>
          <Col sm={10}>
            <Input type="text" name="address" onChange={this.handleAddressChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Название объявления</Label>
          <Col sm={10}>
            <Input type="text" name="title" onChange={this.handleTitleChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>Описание объявления</Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="exampleText" onChange={this.handleDescriptionChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Цена</Label>
          <Col sm={10}>
            <Input type="number" name="price" onChange={this.handlePriceChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>Фотографии</Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" onChange={this.handleImageChange}/>
            <FormText color="muted">
              This is some placeholder block-level help text for the above input.
              It's a bit lighter and easily wraps to a new line.
            </FormText>
          </Col>
        </FormGroup>
        <button type="submit" className="header__button">Опубликовать</button>
      </Form>
      </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(AddAd);