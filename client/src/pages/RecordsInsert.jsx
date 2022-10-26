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
            sleepTime: '',
            wakeUp: '',
            wakeTime: '',
            medicine: '',
            temp: '',
            bath: '',
        }
    }
    nameOptions = [
        { value: '外公', label: '外公' },
        { value: '外婆', label: '外婆' },
        { value: '羽龙', label: '羽龙' }
      ]
    chooseOptions = [
        { value: '是', label: '是' },
        { value: '否', label: '否' },
      ]

    handleChangeInputName(value){
        this.setState({ name: value.value })
    }

    handleChangeInputBloodPressure = async event => {
        const bloodPressure = event.target.value

        this.setState({ bloodPressure })
    }

    handleChangeInputWeight = async event => {
        const weight = event.target.value
        this.setState({ weight })
    }

    handleChangeInputSleepTime = async event => {
        const sleepTime = event.target.value
        this.setState({ sleepTime })
    }

    handleChangeInputWakeTime = async event => {
        const wakeTime = event.target.value
        this.setState({ wakeTime })
    }

    handleChangeInputWakeUp = async event => {
        const wakeUp = event.target.value
        this.setState({ wakeUp })
    }

    handleChangeInputMedicine(value){
        this.setState({ medicine: value.value })
    }

    handleChangeInputTemp = async event => {
        const temp = event.target.value
        this.setState({ temp })
    }

    handleChangeInputBath = async event => {
        const bath = event.target.value
        this.setState({ bath })
    }


    handleIncludeRecord = async () => {
        const { name, bloodPressure, weight, sleepTime, wakeTime, wakeUp, medicine, temp, bath } = this.state
        const payload = { name, bloodPressure, weight, sleepTime, wakeTime, wakeUp, medicine, temp, bath, date}
        console.log(payload)
        await api.insertRecord(payload).then(res => {
            window.alert(`成功上传！`)
            this.setState({
                name: '',
                bloodPressure: '',
                weight: '',
                sleepTime: '',
                wakeUp: '',
                wakeTime: '',
                medicine: '',
                temp: '',
                bath: '',
            })
        })
    }

    render() {
        const { name, bloodPressure, weight, sleepTime, wakeTime, wakeUp, medicine, temp, bath } = this.state
        return (
            <Wrapper>
                <Title>创建打卡</Title>

                <Label>名称: </Label>
                <Select
                options={this.nameOptions}
                value={this.state.value}
                onChange={value => this.handleChangeInputName(value)}
                />

                <Label>昨日是否按时服药: </Label>
                <Select
                options={this.chooseOptions}
                value={this.state.value}
                onChange={value => this.handleChangeInputMedicine(value)}
                />

                <Label>血压: </Label>
                <InputText
                    type="string"
                    value={bloodPressure}
                    onChange={this.handleChangeInputBloodPressure}
                />

                <Label>体重(公斤): </Label>
                <InputText
                    type="number"
                    value={weight}
                    pattern="[0-9]+([\.,][0-9]+)?"
                    inputProps={{ inputMode: 'decimal' }}
                    onChange={this.handleChangeInputWeight}
                />

                <Label>体温(摄氏度): </Label>
                <InputText
                    type="number"
                    value={temp}
                    pattern="[0-9]+([\.,][0-9]+)?"
                    inputProps={{ inputMode: 'decimal' }}
                    onChange={this.handleChangeInputTemp}
                />

                <Label>几点入眠： </Label>
                <InputText
                    type="number"
                    value={sleepTime}
                    pattern="[0-9]+([\.,][0-9]+)?"
                    inputProps={{ inputMode: 'decimal' }}
                    onChange={this.handleChangeInputSleepTime}
                />

                <Label>几点起床: </Label>
                <InputText
                    type="number"
                    value={wakeTime}
                    pattern="[0-9]+([\.,][0-9]+)?"
                    inputProps={{ inputMode: 'decimal' }}
                    onChange={this.handleChangeInputWakeTime}
                />

                <Label>起夜次数: </Label>
                <InputText
                    type="number"
                    value={wakeUp}
                    pattern="[0-9]*"
                    inputProps={{ inputMode: 'decimal' }}
                    onChange={this.handleChangeInputWakeUp}
                />

                <Label>大便次数: </Label>
                <InputText
                    type="number"
                    value={bath}
                    pattern="[0-9]+([\.,][0-9]+)?"
                    inputProps={{ inputMode: 'decimal' }}
                    onChange={this.handleChangeInputBath}
                />  

                <Button onClick={this.handleIncludeRecord}>上传打卡</Button>
                <CancelButton href={'/records/list'}>取消</CancelButton>
            </Wrapper>
        )
    }
}

export default RecordsInsert
