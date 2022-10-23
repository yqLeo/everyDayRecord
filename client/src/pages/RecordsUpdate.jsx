import React, { Component } from 'react'
import api from '../api'
import Select from 'react-select'

import styled from 'styled-components'

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



class RecordsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            rating: '',
            time: '',
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

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleUpdateRecord = async () => {
        const { id, name, rating, time } = this.state
        const arrayTime = time.split('/')
        const payload = { name, rating, date }

        await api.updateRecordById(id, payload).then(res => {
            window.alert(`Record updated successfully`)
            this.setState({
                name: '',
                rating: '',
                time: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const record = await api.getRecordById(id)

        this.setState({
            name: record.data.data.name,
            rating: record.data.data.rating,
            time: record.data.data.time.join('/'),
        })
    }

    render() {
        const { name, rating, time } = this.state
        return (
            <Wrapper>
                <Title>更新打卡</Title>

                <Label>名称: </Label>
                <Select
                options={this.nameOptions}
                value={this.state.value}
                onChange={value => this.handleChangeInputName(value)}
            />
                    

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={rating}
                    onChange={this.handleChangeInputRating}
                />

                <Label>Time: </Label>
                <InputText
                    type="text"
                    value={time}
                    onChange={this.handleChangeInputTime}
                />
                <Button onClick={this.handleUpdateRecord}>Update Record</Button>
                <CancelButton href={'/records/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default RecordsUpdate
