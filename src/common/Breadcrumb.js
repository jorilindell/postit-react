// @flow
import React, {Component} from 'react'
import css from '../styles/common.css'
import {LinkType} from '../types'

type BreadcrumbPropsTypes = {
  links: Array<LinkType>,
  currentlocation: string
}

export class Breadcrumb extends Component {
  props: BreadcrumbPropsTypes
  render() {
    const listLinks = this.props.links.map((link) =>
      <li className={css.breadcrumbItem}><a href={link.href}>{link.name}</a></li>
    )
    return (
      <div className={css.breadcrumbArea}>
        <div className={css.container}>
          <ol className={css.breadcrumb}>
            {listLinks}
            <li className={css.breadcrumbItem}><span>{this.props.currentlocation}</span></li>
          </ol>
        </div>
      </div>
    )
  }
}
