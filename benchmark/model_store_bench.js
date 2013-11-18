var BaseModel, ModelStore, modelUtils, _;

ModelStore = require('../shared/store/model_store');

BaseModel = require('../shared/base/model');
modelUtils = require('../shared/modelUtils');
_ = require('underscore');
util = require('util');


function MyModel() {
  MyModel.super_.apply(this, arguments);
}
util.inherits(MyModel, BaseModel);

function App() {}

modelUtils.addClassMapping(modelUtils.modelName(MyModel), MyModel);

app = new App;
store = new ModelStore({
  app: app
});

times = 100000
_(times).times(function(n){
  var modelAttrs = {
    foo: 'bar'+n,
    id: n
  };
  model = new MyModel(modelAttrs);
  store.set(model);
});

function test(tester){
  start = Date.now()
  result = tester()
  end = Date.now()
  if (result)
    console.log('searched through ' + times + ' records and took ' + (end - start) + ' milliseconds');
  else
    console.log('searched through ' + times + ' records and took ' + (end - start) + ' milliseconds to not find one');
}

console.log('starting test')
test(function(){
 return store.find('my_model', {foo: 'bar1'});
})

test(function(){
 return store.find('my_model', {foo: 'bar99999'});
})

test(function(){
 return store.find('my_model', {foo: 'bar'});
})
