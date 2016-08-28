# Справочник API

- [DefaultStore](#defaultstore)
- [BaseUIState](#baseuistate)
- [DefaultUIState](#defaultuistate)
- [UIStore](#UIStore)
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


## BaseUIState
Базовый класс для UI состояний.
### Публичные методы и поля класса BasetUIState.

* set(path, newValue, doComponentUpdate = true) - сохраняет значение по указанному пути. Параметр doComponentUpdate указывает, нужно ли обновить компонент, после сохранения значения.
* has(path) - проверяет, есть ли значение по указанному пути. 
* get(path, defaultValue = '') - считывает значение по указанному пути. При отсутствии значения возвращает переданное defaultValue.
* removeState() - удаляет UIState из UIStore.

## DefaultUIState




