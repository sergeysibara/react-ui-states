import Stores from './stores.js'
import {Utils} from 'ui-states';

export default class Network {
    static getCustomers() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'customers', true);

        xhr.onreadystatechange = ()=> {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status != 200) {
                return;
            }

            Stores.customers.update(JSON.parse(xhr.response));
        };

        xhr.send(null);
    }

    static getCustomer() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'customer', true);

        xhr.onreadystatechange = ()=> {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status != 200) {
                return;
            }

            Stores.currentCustomer.replace(JSON.parse(xhr.response));
        };

        xhr.send(null);
    }

    static saveCustomer(customer) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'customer', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = ()=> {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status != 200) {
                if (Utils.Other.isExist(xhr.response)) {
                    Stores.currentCustomer.update(null, JSON.parse(xhr.response));
                }
                return;
            }

            Stores.currentCustomer.update(JSON.parse(xhr.response));
            Network.getCustomers();
        };

        xhr.send(JSON.stringify(customer));
    }

    static saveCustomerCity(customer) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'customer-city', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let pathInStore = 'city';
        xhr.onreadystatechange = ()=> {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status != 200) {
                if (Utils.Other.isExist(xhr.response)) {
                    Stores.currentCustomer.updateField(null, (JSON.parse(xhr.response)).city, pathInStore);
                }
                return;
            }


            Stores.currentCustomer.updateField(xhr.response, null, pathInStore);
            Network.getCustomers();
        };

        xhr.send(JSON.stringify({city:customer.city}));
    }
}
