import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    每日一记
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/records/list" className="nav-link">
                                历史分享
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/records/create" className="nav-link">
                                每日打卡
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
