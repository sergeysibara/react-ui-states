import React, {Component} from 'react';
import Stores from './stores.js'
import {DefaultUIState} from 'ui-states'

const mainStore = Stores.customers;

export default class List extends Component {
    componentWillMount() {
        this.uiState = new DefaultUIState(this, null, [{store: mainStore}]);
    }

    componentWillUnmount() {
        this.uiState.removeState();
    }

    handleClick() {
        //load data imitation
        Stores.customers.update({
            items: [
                {id: 1, name: 'Alexey', city: 'Moscow', email: 'alexey@gmail.com'},
                {id: 2, name: 'Andrey', city: 'Bangkok', email: 'andrey@gmail.com'},
                {id: 3, name: 'Anatoly', city: 'Singapore', email: 'anatoly@gmail.com'}
            ]
        });
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