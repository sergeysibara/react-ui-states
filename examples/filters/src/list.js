import React, {Component} from 'react';
import Stores from './stores.js'
import {DefaultUIState, DefaultStoreDecorator, Utils} from 'ui-states'
import InputWrapper from './../../common/components/input-wrapper'

const mainStore = Stores.customers;

export default class List extends Component {
    componentWillMount() {
        let stateModel = {
            filterByName: false,
            filterByCity: false,
            name: '',
            city: ''
        };
        this.uiState = new DefaultUIState(this, stateModel, [{
            store: new DefaultStoreDecorator(mainStore, {
                convertModel: this.applyFilter
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

    applyFilter = (model) => {
        let filterByName = this.uiState.model.filterByName,
            filterByCity = this.uiState.model.filterByCity,
            name = this.uiState.model.name,
            city = this.uiState.model.city,
            retModel = model;

        if (filterByName) {
            retModel.items = retModel.items.filter((item) => {
                return (item.name.includes(name));
            });
        }

        if (filterByCity) {
            retModel.items = retModel.items.filter((item) => {
                return (item.city.includes(city));
            });
        }

        return retModel;
    };

    handleClearFilters = () => {
        this.uiState.cancelAllChanges();
    };

    handleOnChange = () => {
        this.uiState.updateFromStores();
    };

    mapToInputProps(field, type = 'text',) {
        return {
            type: type,
            name: field,
            parentUiState: this.uiState,
            pathToField: 'model',
        };
    }

    render() {
        return (
            <div className='list'>
                <InputWrapper label='Filter by name '
                              onChange={this.handleOnChange}
                              {...this.mapToInputProps('filterByName', 'checkbox')}
                />
                <InputWrapper label='Filter by city '
                              onChange={this.handleOnChange}
                              {...this.mapToInputProps('filterByCity', 'checkbox')}
                />
                <InputWrapper label='name' onChange={this.handleOnChange} {...this.mapToInputProps('name')}/>
                <InputWrapper label='city' onChange={this.handleOnChange} {...this.mapToInputProps('city')}/>
                <button onClick={this.handleClearFilters}>clear filters</button>
                <br/><br/>
                <For each="item" index="index" of={ this.uiState.get('customers.items', []) }>
                    <div key={item.id} className="table-row">
                        <div>{item.name}</div>
                        <div>{item.city}</div>
                        <div>{item.email}</div>
                    </div>
                </For>
            </div>
        )
    }
}