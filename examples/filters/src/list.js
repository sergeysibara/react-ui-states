import React, {Component} from 'react';
import Stores from './stores.js'
import {DefaultUIState, DefaultStoreDecorator, Utils} from 'ui-states'

const mainStore = Stores.customers;

export default class List extends Component {
    componentWillMount() {
        let stateModel = {
            filterType: null,
            filterValue: null
        };
        this.uiState = new DefaultUIState(this, stateModel, [{
            store: new DefaultStoreDecorator(mainStore, {
                convertModel: this.applyFilter.bind(this)
            })
        }]);

        //load data imitation
        mainStore.update({
            items: [
                {id: 1, name: 'Alexey', city: 'Moscow', email: 'alexey@gmail.com'},
                {id: 2, name: 'Andrey', city: 'Bangkok', email: 'andrey@gmail.com'},
                {id: 3, name: 'Anatoly', city: 'Singapore', email: 'anatoly@gmail.com'},
                {id: 4, name: 'Alexey_B', city: 'Bangkok', email: 'alexey_B@gmail.com'},
                {id: 5, name: 'Andrey_B', city: 'Singapore', email: 'andrey_B@gmail.com'},
            ]
        });
    }

    componentWillUnmount() {
        this.uiState.removeState();
    }

    applyFilter(model) {
        if (!Utils.Other.isExist(this.uiState)) {
            return model;
        }

        let filterType = this.uiState.model.filterType;
        let filterValue = this.uiState.model.filterValue;

        if (!Utils.Other.isExistAll([filterType, filterValue])) {
            return model;
        }

        switch (filterType) {
            case 'name':
                model.items = model.items.filter((item) => {
                    return (item.name.includes(filterValue));
                });
                return model;

            case 'city':
                model.items = model.items.filter((item) => {
                    return (item.city.includes(filterValue));
                });
                return model;

            default:
                return model;
        }
    }

    handleFilterByName() {
        this.uiState.set('model.filterType', 'name', false);
        this.uiState.set('model.filterValue', 'Andrey', false);
        this.uiState.updateFromStores([mainStore.key]);
    }

    handleFilterByCity() {
        this.uiState.set('model', {filterType: 'city', filterValue: 'Bangkok'}, false); //another variant with object replacing by path
        this.uiState.updateFromStores([mainStore.key]);
    }

    handleClearFilters() {
        this.uiState.cancelAllChanges();
    }

    render() {
        return (
            <div className='list'>
                <For each="item" index="index" of={ this.uiState.get('customers.items', []) }>
                    <div key={item.id} className="table-row">
                        <div>{item.name}</div>
                        <div>{item.city}</div>
                        <div>{item.email}</div>
                    </div>
                </For>
                <br/>
                <span>Filter by name containing 'Andrey' text:</span>
                <button onClick={this.handleFilterByName.bind(this)}>apply filter</button>
                <br/><br/>
                <span>Filter by city containing 'Bangkok' text:</span>
                <button onClick={this.handleFilterByCity.bind(this)}>apply filter</button>
                <br/><br/>
                <button onClick={this.handleClearFilters.bind(this)}>clear filters</button>
            </div>
        )
    }
}