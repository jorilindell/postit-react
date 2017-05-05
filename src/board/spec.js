// @flow

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'

import {Boards} from './Boards'

describe('Boards module', () => {
  describe('Boards component', () => {
    it('should display text', () => {
      const wrapper = shallow(<Boards boards={[]} fetchBoards={() => {}} />)

      expect(wrapper).to.contain('Hello from Boards.')
    })

    it('should render a board', () => {
      const boards = [
        {id: 1, name: 'Nord Software'},
      ]

      const wrapper = shallow(<Boards boards={boards} fetchBoards={() => {}} />)

      expect(wrapper).to.contain('Nord Software')
    })
  })
})
