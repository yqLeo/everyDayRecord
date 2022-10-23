import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { RecordsList, RecordsInsert, RecordsUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/records/list" exact component={RecordsList} />
                <Route path="/records/create" exact component={RecordsInsert} />
                <Route
                    path="/records/update/:id"
                    exact
                    component={RecordsUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
