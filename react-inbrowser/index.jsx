import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import { Table } from 'reactstrap'

function TableViewer(props) {
    const headers = Object.keys(props.data[0])
    const { keyCol } = props
    return <Table striped bordered hover onClick={props.onClick}>
        <thead>
            <tr>
                {headers.map(hd => <th key={hd}>{hd}</th>)}
            </tr>
        </thead>
        <tbody>
            {props.data.map(row => <tr key={JSON.stringify(row)}>
                {keyCol && <th scope="row">{row[keyCol]}</th>}
                {headers.filter(hd => hd != keyCol).map(hd => <td key={hd}>{row[hd]}</td>)}
            </tr>)}
        </tbody>
    </Table>
}

class ActiveTableViewer extends Component {
    state = { tableData: this.props.data, keyCol: this.props.keyCol }
    onClick(ev) {
        console.log(ev)
        this.setState({ tableData: this.state.tableData.reverse() })
    }
    render() {
        return <TableViewer onClick={this.onClick.bind(this)} data={this.state.tableData} keyCol={this.state.keyCol} />
    }
}

fetch("fakeData.json")
    .then(res => res.json())
    .then(fakeData => render(<ActiveTableViewer data={fakeData} keyCol="name" />, document.getElementById("app")))
    .catch(e => console.error(e))