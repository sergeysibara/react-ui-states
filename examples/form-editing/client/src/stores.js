import {DefaultStore} from 'ui-states';

export default class Stores{
    static customers = new DefaultStore('customers');
    static currentCustomer = new DefaultStore('currentCustomer');
}
