// @flow
import React, {Component} from 'react'
import css from '../styles/common.css'

type Props = {
    buttonAction: Function,
    amount: number,
    title: string
}
export class SectionHeader extends Component {
  props: Props
  render() {
    return(
      <div className={css.sectionHeaderContainer}>
        <div className={css.sectionHeaderLayout}>
          <h3><span>{this.props.amount} {this.props.title}</span></h3>
        </div>
        <div className={css.sectionHeaderActions}>
          <button className={css.btnAdd} onClick={this.props.buttonAction}><span>+</span></button>
        </div>
      </div>
    )
  }
}
