import React, {Component, PropTypes} from 'react';
import {Utils} from 'ui-states';

export default class InputWrapper extends Component {
    static propTypes = {
        parentUiState: PropTypes.object.isRequired,
        pathToField: PropTypes.string.isRequired
    };

    getFullPath(path, field) {
        let fullPath = field;
        if (Utils.Other.isExist(path)) {
            fullPath = path + '.' + field;
        }
        return fullPath;
    }

    getUIStateValue() {
        let value = this.props.parentUiState.get(this.getFullPath(this.props.pathToField, this.props.name)) || '';
        return value;
    }

    getValidationData() {
        if (!Utils.Other.isExist(this.props.pathToValidationField)){
            return '';
        }
        let value = this.props.parentUiState.get(this.getFullPath(this.props.pathToValidationField, this.props.name));
        return value || '';
    }

    handleOnChange = (e) => {
        let newValue = (this.props.type == 'checkbox')? e.target.checked: e.target.value;
        this.props.parentUiState.set(this.getFullPath(this.props.pathToField, this.props.name), newValue, false);

        if (Utils.Other.isExist(this.props.onChange)) {
            this.props.onChange(e);
        }
        this.setState({newValue: newValue});
    };

    render() {
        const {parentUiState, pathToField, pathToValidationField, containerClass, ...inputProps} = this.props;

        let errorClass = '';
        if (this.getValidationData().length > 0) {
            errorClass = ' -has-error';
        }

        let valueProp = (this.props.type == 'checkbox')? {checked: this.getUIStateValue()}: {value: this.getUIStateValue()};
        let checkboxClass = (this.props.type == 'checkbox')? ' -checkbox': '';

        return (
            <p className={'form-group ' + containerClass + errorClass + checkboxClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input {...inputProps}
                       {...valueProp}
                       onChange={this.handleOnChange}>
                </input>
                <span className='help-block'>{this.getValidationData()}</span>
            </p>
        )
    }
}