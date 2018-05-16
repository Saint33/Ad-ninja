
import React from 'react';
import { Login } from '../../components/auth/login';
import { shallow, mount } from 'enzyme';;
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { login } from '../../actions/user';

describe('Login Component', () => {

    let wrapper;
    const mockDispatch = jest.fn();

    const middlewares = []
    const mockStore = configureStore(middlewares)

    test('should call the mock login function', () => {
        wrapper = shallow(<Login dispatch={mockDispatch}/>)
        wrapper.find('.login').simulate(
            'submit',
            { preventDefault() {}}
        )
        expect(mockDispatch.mock.calls.length).toBe(1)
    })


    test('should be called with the email and password in the state as arguments', () => {
        const fakeUser = { email: 'fakeuser@mail.com', password: 'fakepassword'}
        const initialState = { user: { login: { errorMessage: '' }}}
        const store = mockStore(initialState)
        wrapper = mount(
            <Provider store={store}>
                <Login dispatch={mockDispatch}/>
            </Provider>
        )
        wrapper.find({type: 'email'}).at(0).simulate(
            'change',
            { target:
                { value: fakeUser.email }
            }
        )
        wrapper.find({type: 'password'}).at(0).simulate(
            'change',
            { target:
                { value: fakeUser.password }
            }
        )
        wrapper.find('.login').simulate(
            'submit', 
            {preventDefault() {}}
        )

        expect(wrapper.find('Login').instance().state.email).toEqual(fakeUser.email)
        expect(wrapper.find('Login').instance().state.password).toEqual(fakeUser.password)
        expect(wrapper).toMatchSnapshot();
    })


})
