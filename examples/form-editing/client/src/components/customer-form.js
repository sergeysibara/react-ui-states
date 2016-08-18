import React, {Component} from 'react';

import Stores from './../stores.js'
import Network from './../network.js'
import {DefaultUIState } from 'ui-states'
import InputWrapper from './input-wrapper.js'


let mainStore = Stores.currentCustomer;
export default class CustomerForm extends Component {
    componentWillMount() {
        this.uiState = new DefaultUIState(this, null, [{store: mainStore}]);
        setTimeout(Network.getCustomer, 0);
    }

    componentWillUnmount() {
        this.uiState.removeState();
    }

    handleCancel() {
        this.uiState.cancelAllChanges();
    }

    handleSave() {
        Network.saveCustomer(this.uiState.currentCustomer);
    }

    handleCancelCity() {
        mainStore.clearValidationInField('city');
    }

    handleSaveCity() {
        Network.saveCustomerCity(this.uiState.currentCustomer);
    }


    mapInputProps(field) {
        return {
            type: "text",
            name: field,
            parentUiState: this.uiState,
            pathToField: 'currentCustomer', //full path == this.uiState.currentCustomer
            pathToValidationField: 'currentCustomer.validationData'  //full path == this.uiState.currentCustomer.validationData
        };
    }

    render() {
        return (
            <div>
                <form ref="form">
                    <InputWrapper label="Customer name" {...this.mapInputProps('name')}/>
                    <InputWrapper label="Customer city" {...this.mapInputProps('city')}/>
                    <InputWrapper label="Customer email" {...this.mapInputProps('email')}/>
                </form>
                <button onClick={this.handleCancel.bind(this)}>Cancel</button>
                <button onClick={this.handleSave.bind(this)}>Save</button>
                <br/><br/>
                <button onClick={this.handleCancelCity.bind(this)}>Cancel city only</button>
                <button onClick={this.handleSaveCity.bind(this)}>Save city only</button>
            </div>
        )
    }
}