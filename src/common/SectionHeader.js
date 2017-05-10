// @flow
import React, {Component} from 'react'
import css from '../styles/common.css'

type Props = {
    buttonAction: Function,
    hiddenItemsN: number,
    amount: number,
    title: string,
    search: Function,
    searchValue: string,
}
export class SectionHeader extends Component {
  props: Props

  render() {
    return(
      <div className={css.sectionHeaderContainer}>
        <div className={css.sectionHeaderLayout}>
          <h3>
            <span>{this.props.amount} {this.props.title}</span>
            {this.props.hiddenItemsN > 0 &&
              <span> ({this.props.hiddenItemsN} hidden)</span>
            }
          </h3>
          <div className={css.sectionHeaderActions}>
            <div className={css.searchInputGroup}><input type="text" value={this.props.searchValue} placeholder="Search" onChange={this.props.search} className={css.searchInput} /></div>
            <button className={css.btnAdd} onClick={this.props.buttonAction}><span>+</span></button>
          </div>
        </div>
      </div>
    )
  }
}
