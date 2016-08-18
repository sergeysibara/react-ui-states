import React, {Component} from 'react';

import Stores from './stores.js'
import Network from './network.js'
import {DefaultUIState } from 'ui-states'

let mainStore = Stores.customers;
export default class List extends Component {
    componentWillMount() {
        this.uiState = new DefaultUIState(this, null, [{store: mainStore}]);
    }

    componentWillUnmount() {
        this.uiState.removeState();
    }

    handleClick() {
        Network.getCustomers();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>Load data</button>
                <br/><br/>
                <For each="item" index="index" of={ this.uiState.get('customers.items', []) }>
                    <div key={item.id}>
                        <span>{item.name} </span>
                        <span>{item.city} </span>
                        <span>{item.email}</span>
                    </div>
                </For>
            </div>
        )
    }
}