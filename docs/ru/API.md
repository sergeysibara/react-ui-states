# Справочник API

- [DefaultStore](#defaultstore)
- [StatesStore](#statesstore)
- [BaseUIState](#baseuistate)
- [DefaultUIState](#defaultuistate)
- [DefaultStoreDecorator](#defaultstoredecorator)
- [Utils](#utils)
  - [Other](#other)
  - [Array](#array)
- [ObjectPath](#objectpath)
  
## DefaultStore
Экземпляры этого класса хранят данные приложения. Под каждый вид данных свое хранилище. Другие классы могут подписаться на обновление данных в хранилище, либо самостоятельно считать данные из него.

Внутри себя хранит объект _model, в который передаются пользовательские данные.
_model в классе DefaultStore имеет следующие поля:
* _lastUpdateTime – время, когда модель последний раз обновлялась. 
* _isNew - флаг, показывающий, что пользовательский данные в модели новые и еще не сохранены на сервере. Используется, когда не сохраненный на сервере объект нужно использовать в разных частях приложения.
* _isExist - флаг, показывающий, что в хранилище нет пользовательских данных. 
Остальные поля – пользовательские.

### Создание экземпляра класса
```const myStore1 = new DefaultStore('myStore1');```  
В параметре конструктора DefaultStore указываем идентификатор/ключ хранилища, по которому к нему можно будет обращаться.

### Публичные методы и поля класса DefaultStore.
#### Описание общих параметров методов
* data – пользовательские данные, которые будут сохранены в модели хранилища.
* validationData – пользовательские данные для валидации, которые будут переданы подписчикам в текущем обновлении хранилища.
* path – путь к полю внутри модели. Примеры задания путей: https://github.com/mariocasciaro/object-path
* id – идентификатор объекта-подписчика. Обычно, в качестве подписчика используются экземпляр UIState.
* options - объект с произвольными опциями, который передается подписчикам

#### Публичные методы и поля
* key – идентификатор хранилища.
* createNew(data = {}) – создает новую модель
* replace(data = {}) – полная замена модели на новую 
* clear() - удаление пользовательских данных из модели
* update(data, validationData, options) – обновление данных модели. Объект validationData говорит о том, что в модели есть ошибки и модель не нужно обновлять. Если передан объект validationData, тогда просто validationData будет передан подписчикам, а остальные пользовательские поля останутся прежними.  
Используется так: ```myStore.update(data)```,   
либо так: ```myStore.update(null, validationData)```.
* updateField(data, validationData, path) – обновление конкретного поля модели по указанному пути.
* getModel() – возвращает модель.
* getModelClone() – возвращает клон модели. Используется глубокое клонирование.
* getDataByPath(path, defaultValue) – возвращает значение по указанному пути, либо переданное defaultValue. 
* getDataCloneByPath(path, defaultValue) – аналогично предыдущему, но возвращает клон значения.
* subscribe(id, onUpdateStore) – подписка на обновление всей модели.  
сигнатура функции подписчика: ```onUpdateStore(storeKey, storeModel, validationData, options)``` 
* subscribeOnFieldUpdate(id, onUpdateStoreField) – подписка на обновление только конкретного поля модели.
сигнатура функции подписчика: ```onUpdateStoreField(storeKey, path, value, validationData, options)``` 
* unSubscribe(id) – отписка от любых обновлений.

## StatesStore
Хранит все UI состояния. В конструкторе класса BaseUIState уже реализовано добавление состояния в StatesStore, а также метод для удаления из StatesStore.
### Публичные методы и поля класса StatesStore.
* addState(state) - добавляет состояние в хранилище.
* removeState(id) - удаляет состояние из хранилища.

## BaseUIState
Базовый класс для UI состояний.

### Публичные методы и поля класса BasetUIState.
* set(path, newValue, doComponentUpdate = true) - сохраняет значение по указанному пути. Параметр doComponentUpdate указывает, нужно ли обновить компонент, после сохранения значения.
* has(path) - проверяет, есть ли значение по указанному пути. 
* get(path, defaultValue = '') - считывает значение по указанному пути. При отсутствии значения возвращает переданное defaultValue.
* removeState() - удаляет UIState из UIStore.

## DefaultUIState
Экземпляры данного класса используются вместо state компонента. У компонентов создается свой экземпляр такого класса. Может подписываться на изменения различных хранилищ, а также хранить любые другие данные, как и обычный state компонента. 

### Создание экземпляра класса
```
class MyClass extends Component {   
        componentWillMount() {  
          this.uiState = new DefaultUIState(this, null, [{store: mainStore}]);  
}
```  
Параметры конструктора:    
1) В первом параметре передается ссылка на компонент.
2) Во втором параметре передается объект с данными состояния компонента. Сюда передаются все данные, которые не связаны с хранилищами. Внутри uiState эти данные будут храниться в объекте model и получить к ним доступ можно через него.  
Например, если в обычном компоненте задание и изменение state  будет выглядеть так:
```
class Login extends Component{
  state = {
        email: '',
        password:  '',
    }
    
  handleEmailChange(e){
    this.setState({email: e.target.value});
  }
  ...
}
```

то в компоненте с uiState будет так:
```
class Login extends Component{
  componentWillMount() {  
    let stateModel = {
        email: '',
        password:  '',
    }
    this.uiState = new DefaultUIState(this, stateModel);  
  }
    
  handleEmailChange(e){
      this.uiState.set('model.email', e.target.value);
  }
  ...
}
```
3) В третьем параметры передается массив объектов для передачи ссылок на хранилища и дополнительных параметров для каждого хранилища. Эти параметры указывают, как uiState должен обрабатывать данные, получаемые из конкретного хранилища.
На данный момент можно передать всего 3 параметра в каждом объекте:
* store - ссылка на хранилище;
* updateCondition(storeModel) - функция, которая будет вызываться после обновления хранилища. В нее передаются данные из хранилища. 
* updateFieldCondition(fieldPath, fieldValue) - 
функции updateCondition, updateFieldCondition должны возвращать либо true, либо false. При возврате false, данные из хранилища не будут сохранены в uiState.
Пример передачи нескольких хранилищ со всеми параметрами:
```
this.step = 3;
this.uiState = new DefaultUIState(this, null, [
  {
    store: store1,
    updateCondition: (storeModel) => {return storeModel.currentStep === this.step},
    updateFieldCondition: (path, value) => {return true;}
  }
]);  
``` 

### Публичные методы и поля класса DefaultUIState
Публичные методы наследуемые от BaseUIState уже описаны выше. 

#### Описание общих параметров методов
* storeKey – ключ хранилища.
* storeKeys – массив с ключами хранилищ.
* doUpdate – выполнить обновление компонента в конце работы функции или нет.
* clearValidation – указывает, удалять ли данные валидации или нет.

* cancelAllChanges(clearValidation = true) - отменяет все изменения в uiState. Все данные, полученные их хранилищ, считываются из хранилищ еще раз. Прочие данные(объект uiState.model) сбрасываются к состоянию, которое было при вызове конструктора DefaultUIState.
* cancelModelChanges(doUpdate = true) - отменяет только изменения в объекте uiState.model.
* cancelStoresChanges(storeKeys, clearValidation = true, validationOnly = false) - отменяет только изменения в указанных хранилищах. Параметр validationOnly равный true указывает, что нужно удалить только данные валидации.
* cancelChangesByPath(path, storeKey, doUpdate = true) - отменяет изменения по указанному пути в объекте.
* updateFromStores(storeKeys, doUpdate = true) - обновить модели данных только из указанных хранилищ.

следующие функции используются для получения параметров _lastUpdateTime, _isNew, _isExist из модели данных, переданной хранилищем.
* storeLastUpdateTime(storeKey)
* storeModelIsNew(storeKey)
* storeModelIsExist(storeKey)


## DefaultStoreDecorator
Декоратор для хранилища. В него можно обернуть экземпляр хранилища для обработки данных, извлекаемых из хранилища.
Используется внутри DefaultUIState.

Параметры конструктора:    
1) В первом параметре передается ссылка на store.  
2) Во втором параметре передается объект с параметрами. На данный момент всего 2 параметра:  
* useStoreClone - говорит, клонировать ли модель полученную из хранилища. При false uiState будет работать с тем же экземпляром объекта, который в хранилища. Поэтому false можно ставить только если в uiState компонента не будет производиться изменения данных, полученных из хранилищ.  
* convertModel(storeModel) - функция для обработки данных при чтении их из хранилища. Должна возвращать измененную копию модели хранилища. Может использоваться для сортировки, фильтрации и других преобразований данных.  

Пример использования:  
```
let decoratedStore = new DefaultStoreDecorator(store, {
                        useStoreClone: true,
                        convertModel: this.applyFilter.bind(this)
                     });
this.uiState = new DefaultUIState(this, stateModel, [{ store: decoratedStore }]);
```
Полноценный пример есть по ссылке: https://github.com/sergeysibara/react-ui-states/tree/master/examples/filters

## Utils
Утилиты, используемые внутри библиотеки. Доступны также вне ее.

## ObjectPath
По некоторым причинам временно помещен внутрь библиотеки. Доступен вне ее.
