import React from 'react';
import AdListItem from '../../components/Ad/AdListItem';
import { shallow } from 'enzyme';
import { formatDate } from '../../utility'

test('AdListItem renders correctly', () => {

    const fakeAd = {
        _id: '322', 
        image: '41a01da6f831c2b85302cba1a331cfa7', 
        title: 'fake title', 
        price: 300, 
        createdAt: "2018-04-30T12:08:39.410Z"
    }

    const wrapper = shallow(
        <AdListItem {...fakeAd} />
    )

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').prop('src')).toEqual(`/api/file/${fakeAd.image}`)
    expect(wrapper.find('img').prop('src')).toEqual(`/api/file/${fakeAd.image}`)
    expect(wrapper.find('Link').at(0).prop('to')).toEqual(`/ad/${fakeAd._id}`)
    expect(wrapper.find('Link').at(1).prop('to')).toEqual(`/ad/${fakeAd._id}`)
    expect(wrapper.find('.adv-list-item__description_price').text()).toEqual(`${fakeAd.price} р.`)
    expect(wrapper.find('.adv-list-item__description_date').text()).toEqual(`${formatDate(fakeAd.createdAt)}`)

})