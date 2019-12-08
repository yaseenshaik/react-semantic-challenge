import _ from 'lodash'
import React, { Component } from 'react'
import { Menu, Table } from 'semantic-ui-react'
import tableData from './users.js'

export default class TableExampleSortable extends Component {
  state = {
    column: null,
    direction: null,
    search: ''
  }

  get data() {
    const { search, column, direction } = this.state

    const filteredData = search
      ? tableData.filter(userDetails => {
        const { username, email, age } = userDetails
        const detailsString = `${username}${email}${age}`

        return detailsString.indexOf(search) !== -1
      })
      : tableData

    const sortedData = _.sortBy(filteredData, [column])

    return direction === 'ascending' ? sortedData : sortedData.reverse()
  }

  handleSort = (clickedColumn) => () => {
    const { column, direction } = this.state

    this.setState({
      column: clickedColumn,
      direction: column !== clickedColumn
        ? 'ascending'
        : direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  render() {
    const { column, direction } = this.state

    return (
      <div>
      <Menu attached='top'>
      <Menu.Menu position='right'>
        <div className='ui right aligned category search item'>
          <div className='ui transparent icon input'>
            <input
              className='prompt'
              type='text'
              placeholder='Search'
              onChange={e => this.setState({ search: e.target.value })}
            />
            <i className='search link icon' />
          </div>
          <div className='results' />
        </div>
      </Menu.Menu>
    </Menu>

      <Table sortable celled fixed attached='bottom'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'username' ? direction : null}
              onClick={this.handleSort('username')}
            >
              Username
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'email' ? direction : null}
              onClick={this.handleSort('email')}
            >
              Email
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={this.handleSort('age')}
            >
              Age
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(this.data, ({ age, email, username }) => (
            <Table.Row key={username}>
              <Table.Cell>{username}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{age}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
  </div>
    )
  }
}