import React, {Component} from 'react';
import Stores from './stores.js'
import {DefaultUIState} from 'ui-states'

const mainStore = Stores.customers;
const customers = {
    items: [
        {id: 1, name: 'Alexey', city: 'Moscow', email: 'alexey@gmail.com'},
        {id: 2, name: 'Andrey', city: 'Bangkok', email: 'andrey@gmail.com'},
        {id: 3, name: 'Anatoly', city: 'Singapore', email: 'anatoly@gmail.com'}
    ]
};

export default class List extends Component {
    componentWillMount() {
        Stores.customers.update(customers);
        this.uiState = new DefaultUIState(this, null, [{store: mainStore}]);
    }

    componentWillUnmount() {
        this.uiState.removeState();
    }

    handleClick() {
        //load data imitation
        customers.items.push({id: 4, name: 'Alexey_B', city: 'Bangkok', email: 'alexey_B@gmail.com'});
        Stores.customers.replace(customers);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>Load new data</button>
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