// @flow
import React, {Component} from 'react'

type Props = {
  cols: integer,
  text: string
}
export class EmptyTableFooter extends Component {
  props: Props
  render() {
    return(
      <tbody>
        <tr>
          <td colSpan={this.props.cols}>{this.props.text}</td>
        </tr>
      </tbody>
    )
  }
}
