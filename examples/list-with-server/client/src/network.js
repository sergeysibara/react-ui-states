import Stores from './stores.js'

export default class Network {
    static getCustomers() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'customers', true);

        xhr.onreadystatechange = ()=> {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status != 200) {
                alert('Error ' + xhr.status + ': ' + xhr.statusText);
                return;
            }

            Stores.customers.update(JSON.parse(xhr.response)); //update object in 'customers' store
        };

        xhr.send(null);
    }
}
