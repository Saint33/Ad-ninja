
import React from 'react';
import { Register } from '../../components/auth/register';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { register } from '../../actions/user';

describe('Login Component', () => {

    let wrapper;
    const mockDispatch = jest.fn();

    test('should be called with the email, password, username, phone in the state as arguments', () => {
        const fakeUser = { email: 'fakeuser@mail.com', password: 'fakepassword', phone: '8999-999-99-99', username: 'fakeuser'}
        wrapper = mount(
            <Register dispatch={mockDispatch}/>
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
        wrapper.find({name: 'phone'}).at(0).simulate(
            'change',
            { target:
                { value: fakeUser.phone }
            }
        )
        wrapper.find({name: 'username'}).at(0).simulate(
            'change',
            { target:
                { value: fakeUser.username }
            }
        )
        wrapper.find('.login').simulate(
            'submit', 
            {preventDefault() {}}
        )
        expect(mockDispatch.mock.calls.length).toBe(1)
        expect(wrapper.instance().state.email).toEqual(fakeUser.email)
        expect(wrapper.instance().state.password).toEqual(fakeUser.password)
        expect(wrapper.instance().state.username).toEqual(fakeUser.username)
        expect(wrapper.instance().state.phone).toEqual(fakeUser.phone)
        expect(wrapper).toMatchSnapshot();
    })
})
