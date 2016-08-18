import React, {Component} from 'react';
import ReactDOM from 'react-dom'

import CustomerList from './components/customer-list.js'
import CustomerForm from './components/customer-form.js'

export default class App extends Component {
    render() {
        return (
            <div>
                <CustomerList/>
                <br/><br/>
                <CustomerForm/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('react-root'));
