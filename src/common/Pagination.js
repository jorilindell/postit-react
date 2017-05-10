// @flow
import React, {Component} from 'react'
import css from '../styles/common.css'

type Props = {
  arraySize: number,
  activePage: number,
  pageSize: number,
  selectPage: Function,
  selectPageSize: Function,
  changePage: Function,
}
const pages = [5, 10, 20]
export class Pagination extends Component {
  props: Props
  createSelectItems() {
    let pageOptions = []
    for (let i = 0; i < pages.length; i++) {
      pageOptions.push(<option key={pages[i]} value={pages[i]}>{pages[i]}</option>)
    }
    return pageOptions
  }

  onDropdownSelected(e) {
    console.log('THE VAL', e.target.value)
    //here you will see the current selected value of the select input
  }

  render() {
    if(this.props.arraySize === 0) {
      return null
    }
    const pages = []
    for(let i = 0; i <= (this.props.arraySize - 1 ) / this.props.pageSize; i++) {
      if(i===this.props.activePage) {
        pages.push(<li key={i}><a className={css.active}>{i + 1}</a></li>)
      } else {
        pages.push(<li key={i}><a onClick={() => this.props.selectPage(i)}>{i + 1}</a></li>)
      }
    }
    return (
      <div>
        <ul className={css.pagination}>
          {pages}
        </ul>
        <select onChange={this.props.selectPageSize} className={css.pageAmountSelector} value={this.props.pageSize}>
          {this.createSelectItems()}
        </select>
      </div>
    )
  }
}
