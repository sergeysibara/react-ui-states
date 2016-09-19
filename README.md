React UI States 
===============
A library for simplification Flux architecture and adding components state management.

## Installation
npm install --save react-ui-states

## Using examples
https://github.com/sergeysibara/react-ui-states/tree/master/examples

## Comparing React UI States with RefluxJS
You can read more in [this blog post about React Flux vs Reflux](http://blog.krawaller.se/posts/react-js-architecture-flux-vs-reflux/).
I will do compare Reflux vs React UI States.

###Comparing component calling actions
For components calling actions, the code is completely identical.
```javascript
var Increase = React.createClass({
  handleClick:function(){
    appActions.increaseItem(this.props.index);
  },
  // rest redacted
});
```

###Comparing component listening to store changes
Reflux version:
```javascript
var Cart = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function() {
    this.listenTo(appStore, this._onStuffChange);
  },
  // rest redacted
});
```
React UI States version:
```javascript
var Cart = React.createClass({
    componentDidMount: function() {
        this.uiState = new DefaultUIState(this, null, [{store: appStore}]);
    },
    // rest redacted
});
```

###Comparing stores
Reflux version:
```javascript
Reflux.createStore({
  init: function() {
    this.listenTo(actions.addItem,_addItem);
    this.listenTo(actions.removeItem,_removeItem);
    this.listenTo(actions.increaseItem,_increaseItem);
    this.listenTo(actions.decreaseItem,_decreaseItem);
  },
  // rest redacted
});
```
React UI States version:
```javascript
var appStore = new DefaultStore('appStore');
```

###Comparing actions
Reflux version:
```javascript
var appActions = Reflux.createActions([
  "addItem",
  "removeItem",
  "decreaseItem",
  "increaseItem"
]);
```

React UI States version:  
**In most cases, a component does not need to know what action was due.**

If a component still need to know.  
**variant 1 (saving last action in store):**
```javascript
newStoreData.lastAction = 'addItem';
appStore.update(newStoreData);
```
**variant 2 (pass action through 'options' parametr):**  
Preferable. Implemented in DefaultStore; not implemented in DefaultUIState.
```javascript
appStore.update(newStoreData, null, {lastAction: 'addItem'});
```
