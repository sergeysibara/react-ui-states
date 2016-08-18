import React, {Component} from 'react';
import {Utils} from 'ui-states';

export default class InputWrapper extends Component {

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
        let value = this.props.parentUiState.get(this.getFullPath(this.props.pathToValidationField, this.props.name));
        return value || '';
    }

    handleOnChange(e) {
        let newValue = e.target.value;
        this.props.parentUiState.set(this.getFullPath(this.props.pathToField, this.props.name), newValue, false);

        if (Utils.Other.isExist(this.props.onChange)) {
            this.props.onChange(e);
        }
        this.forceUpdate();
    }

    render() {
        const { parentUiState, pathToField, pathToValidationField, ...inputProps } = this.props;

        let errorClassName = '';
        if (this.getValidationData().length > 0) {
            errorClassName = ' has-error';
        }

        return (
            <div className={'form-group' + errorClassName}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input {...inputProps}
                    value={this.getUIStateValue()}
                    onChange={this.handleOnChange.bind(this)}>
                </input>
                <span className='help-block'>{this.getValidationData()}</span>
            </div>
        )
    }
}