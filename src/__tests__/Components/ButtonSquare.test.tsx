import React from 'react'
import { shallow, render, mount } from 'enzyme'
import sinon from 'sinon'

import { ButtonSquare } from '../../Components/Button/Square'

describe(`Button Square`, () => {
    it('It should shallow properly', () => {
        const wrapper = shallow(
            <ButtonSquare
                style={{}}
                onClick={() => {}}>
                Test Button
            </ButtonSquare>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('It should trigger clicks properly', () => {
        const spy = sinon.spy()

        const wrapper = mount(
            <ButtonSquare
                style={{}}
                onClick={spy}>
                Test Button
            </ButtonSquare>
        )

        wrapper
            .find('.button-square-container')
            .first()
            .simulate('click')

        expect(spy.calledOnce).toBe(true)
    })
})