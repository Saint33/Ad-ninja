import React from 'react';
import { shallow } from 'enzyme';
import Ad from '../../components/Ad/Ad';


describe('Ad', () => {
    const tree = shallow(
        <Ad 
            match={{params: {id: '5ae451e95c66692bb8b34e50'}}}
        />
    );
    it('should render correctly',  () => {
        expect(tree).toMatchSnapshot();
    })
})