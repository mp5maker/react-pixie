import React from 'react'
import { shallow, render, mount } from 'enzyme'
import sinon from 'sinon'

import { ButtonRadial } from '.'

it('it should shallow properly', () => {
    const wrapper = shallow(
        <ButtonRadial
            style={{}}
            onClick={() => {}}>
            Sample Button
        </ButtonRadial>
    )

    expect(wrapper).toMatchSnapshot()
})

it('it should render properly', () => {
    const wrapper = render(
        <ButtonRadial
            style={{}}
            onClick={() => {}}>
            Sample Button
        </ButtonRadial>
    )

    expect(wrapper).toMatchSnapshot()
})

it('it should mount properly', () => {
    const spy = sinon.spy()

    const wrapper = mount(
        <ButtonRadial
            style={{}}
            onClick={spy}>
            Sample Button
        </ButtonRadial>
    )

    wrapper
        .find('.button-radial-container')
        .first()
        .simulate('click')

    expect(spy.calledOnce).toBe(true)
})
