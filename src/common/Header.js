// @flow
import React, {Component} from 'react'
import css from '../styles/common.css'

export class Header extends Component {
  render() {
    return (
      <header className={css.header}>
        <ul>
          <li><a href="/">Post-it manager</a></li>
        </ul>
      </header>
    )
  }
}
