import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'
import Select from 'react-select'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

class RecordsInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            bloodPressure: '',
            weight: '',
            condition: '',
            healthRecord: ''
        }
    }
    nameOptions = [
        { value: '外公', label: '外公' },
        { value: '外婆', label: '外婆' },
        { value: '羽龙', label: '羽龙' }
      ]

    handleChangeInputName(value){
        this.setState({ name: value.value })
    }

    handleChangeInputBloodPressure = async event => {
        const bloodPressure = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ bloodPressure })
    }

    handleChangeInputWeight = async event => {
        const weight = event.target.value
        this.setState({ weight })
    }

    handleChangeInputCondition = async event => {
        const condition = event.target.value
        this.setState({ condition })
    }

    handleChangeInputHealthRecord = async event => {
        const healthRecord = event.target.value
        this.setState({ healthRecord })
    }

    handleIncludeRecord = async () => {
        const { name, bloodPressure, weight, condition, healthRecord } = this.state
        const payload = { name, bloodPressure, weight, condition, healthRecord, date }
        console.log(payload)
        await api.insertRecord(payload).then(res => {
            window.alert(`Record inserted successfully`)
            this.setState({
                name: '',
                bloodPressure: '',
                weight: '',
                condition: '',
                healthRecord: ''
            })
        })
    }

    render() {
        const { name, bloodPressure, weight, condition, healthRecord } = this.state
        return (
            <Wrapper>
                <Title>创建打卡</Title>

                <Label>名称: </Label>
                <Select
                options={this.nameOptions}
                value={this.state.value}
                onChange={value => this.handleChangeInputName(value)}
            />

                <Label>血压: </Label>
                <InputText
                    type="number"
                    step="1"
                    lang="en-US"
                    min="0"
                    max="200"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={bloodPressure}
                    onChange={this.handleChangeInputBloodPressure}
                />

                <Label>体重(公斤): </Label>
                <InputText
                    type="text"
                    value={weight}
                    onChange={this.handleChangeInputWeight}
                />

                <Label>今日心情如何，健康状况如何？</Label>
                <InputText
                    type="text"
                    value={condition}
                    onChange={this.handleChangeInputCondition}
                />

                <Label>有无医疗记录，药物服用？ </Label>
                <InputText
                    type="text"
                    value={healthRecord}
                    onChange={this.handleChangeInputHealthRecord}
                />

                <Button onClick={this.handleIncludeRecord}>Add Record</Button>
                <CancelButton href={'/records/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default RecordsInsert
