import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'
import MobileTable from '@yrobot/react-mobile-table';
import '@yrobot/react-mobile-table/lib/index.css';

const Wrapper = styled.div`
    padding: 0 10px 3px 3px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateRecord extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/records/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteRecord extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `确认永久删除 ${this.props.id} 记录?`,
            )
        ) {
            api.deleteRecordById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>删除</Delete>
    }
}

class RecordsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllRecords().then(records => {
            this.setState({
                records: records.data.data,
                isLoading: false,
            })
        })
    }
    render() {
        const { records, isLoading } = this.state
        console.log(records)
        const columns = [
            {
                Header: '日期',
                accessor: 'date',
                filterable: true,
                width: 100
            },
            {
                Header: '名称',
                accessor: 'name',
                filterable: true,
                width: 50
            },
            {
                Header: '血压',
                accessor: 'bloodPressure',
                filterable: true,
                width: 75
            },
            {
                Header: '体重',
                accessor: 'weight',
                filterable: true,
                width: 75
            },
            {
                Header: '今日心情/状态',
                accessor: 'condition',
                filterable: true,
                width: 130
            },
            {
                Header: '医疗记录/药物记录',
                accessor: 'healthRecord',
                filterable: true,
                width: 170
            },
            
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteRecord id={props.original._id} />
                        </span>
                    )
                },
                width: 75
            },
            // {
            //     Header: '',
            //     accessor: '',
            //     Cell: function(props) {
            //         return (
            //             <span>
            //                 <UpdateRecord id={props.original._id} />
            //             </span>
            //         )
            //     },
            // },
        ]
          
          

        let showTable = true
        if (!records.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={records}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default RecordsList
