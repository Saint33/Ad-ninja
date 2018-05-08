import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user';
import Spinner from 'react-spinkit';

export default function(ComposedClass, reload){

    class AuthenticationCheck extends Component {
        
        state = {
            loading: true
        }
        
        componentWillMount() {
            this.props.dispatch(auth())
        }

        componentWillReceiveProps(nextProps) {
            this.setState({loading: false})

            if(!nextProps.user.login.isAuth){
                if(reload === true){
                    this.props.history.push('/login');                
                }
            } else {
                if(reload === false){
                    this.props.history.push('/');
                }
            }
        }

        render(){
            if(this.state.loading){
                return <Spinner className="loader-position" name='folding-cube' fadeIn="none"/>
            }
            return(
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
};
