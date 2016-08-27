import React, {Component} from 'react';
import Stores from './../stores.js'
import Network from './../network.js'
import {DefaultUIState} from 'ui-states'

export default class List extends Component {
    componentWillMount() {
        this.uiState = new DefaultUIState(this, null, [{store: Stores.customers}]);
        Network.getCustomers();
    }

    componentWillUnmount() {
        this.uiState.removeState();
    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                <For each="item" index="index" of={ this.uiState.get('customers.items', []) }>
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td>{item.email}</td>
                    </tr>
                </For>
                </tbody>
            </table>
        )
    }
}