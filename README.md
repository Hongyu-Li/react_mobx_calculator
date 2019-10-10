
# Calculator by using MobX and React

This project was inspired by [benjamin Lees](https://github.com/benjaminlees/mobx-react-calculator). In this demo, I used react with MobX to create a mini calculator. You could find all source codes in this repository. Before having a look at the code, you may perhaps want to know some basic concepts about MobX. The Mobx design principle is:

*Anything that can be derived from the application state, should be derived. Automatically.*


### What is MobX?

MobX is a simple and scalable **state management library** transparently applying functional reactive programming (TFRP). The workflow of MobX could be described as below.

![image](./public/flow.png)

MobX has only a few core concepts. 

* Observable State: Any value that can be mutated and might serve as source for computed values is state. 
* Computed Values: Any value that can be computed by using a function that purely operates on other observable values. With MobX you can define values that will be derived automatically when relevant data is modified.
* Actions: Actions are the only thing that could modify state.
* Reactions: A reaction is a bit similar to a computed value, but instead of producing a new value it produces a side effect. Reactions bridge reactive and imperative programming for things like printing to the console, making network requests, incrementally updating the UI, etc. 



### How to use MobX with react?

#### Step 1: Install MobX and MobX-react

```node
npm install mobx --save;
npm install mobx-react --save;
```

#### Step 2: Define observable state (Similar to actions&reducers in redux)

```typescript
import { observable, action, computed } from 'mobx';

class CountStore {
  @observable num = 0;            
  @computed get getDoubleCount() {
    return this.num * 2;
  }
  @action.bound onIncrement() {
    this.num = this.num + 1;
  }
  @action.bound onDecrement() {
    this.num = this.num - 1;
  }
}
export default CountStore;
```

#### Step 3: Share store to all child components by using provider (Similar to bind all reducers to store in redux)

```typescript
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import Counter from './Counter';
import CountStore from './CountStore';

const stores = {
  count: new CountStore(),
};

render(
  <Provider {...stores}>
    <Counter />
  </Provider>,
  document.getElementById('app'),
);
```

#### Step 4: Inject store into component (Similar to connect in redux)

```typescript
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('count')
@observer
class Counter extends Component {

  render() {
    const { count } = this.props;

    return (
      <div>
        <p>
          Count: {count.num}
        </p>
        <p>
          Double count: {count.getDoubleCount}
        </p>
        <div>
          <button onClick={count.onIncrement}>+1</button>
          <button onClick={count.onDecrement}>-1</button>
        </div>
      </div>
    );
  }
}

export default Counter;
```
Note: `@inject` should be placed before `@observer`.



### MobX vs Redux?

Redux is also an excellent state management library. You may wondering what their differences are. Generally, I think MobX and Redux differ at: 

* `Effectiveness` As is shown in part 2, it's very easy and concise to use MobX in react app. However, when it comes to redux, we have to write a bunch of codes to state our actions and reducers which would lead to a lot of duplications. 
* `Scalability` Since Redux is more opinionated and expects the reducer functions to be pure, it is easier to scale than MobX. Pure functions are easier to test since they are predictable and simple. This results in maintainable code that can scale. 


### Things you might want to know while playing with MobX

Actually, when I implemented the mini calculator demo with using MobX, I've met a tiny but knotty problem. I would write them down here in case you wanna know. 

**ISSUE**: Support for the experimental syntax 'decorators-legacy' isn't currently enabled

I created react app by using `create-react-app` library, however decorators are only supported if you're using TypeScript which means that you cannot use them with normal JS. For this problem, there are two solutions:

* **Solution 1**: use MobX without decorator syntax. For example, we could modify code in part 2 without decorator syntax like this. 

  ```typescript
  # Step 2
  class CountStore {
    num = 0;            
    get getDoubleCount() {
      return this.num * 2;
    }
    onIncrement() {
      this.num = this.num + 1;
    }
    onDecrement() {
      this.num = this.num - 1;
    }
  }
  decorate(CountStore, {
    num: observable,
    getDoubleCount: computed
    onIncrement: action.bound
    onDecrement: action.bound
  })
  export default CountStore;
  
  # Step 4
  class Counter extends Component {
    render() {
      const { count } = this.props;
      return (
        <div>
          <p>
            Count: {count.num}
          </p>
          <p>
            Double count: {count.getDoubleCount}
          </p>
          <div>
            <button onClick={count.onIncrement}>+1</button>
            <button onClick={count.onDecrement}>-1</button>
          </div>
        </div>
      );
    }
  }
  
  export default inject('count')(observer(Counter));
  ```

* **Solution 2**: enable decorator syntax

  * Firstly, you should run `yarn eject` to eject all configuration files which are hided by `create-react-app`. 
  * Secondly, you sould find `require.resolve('babel-plugin-named-asset-import')` in `webpack.config.js` file in config folder and then modify the plugins by adding `["@babel/plugin-proposal-decorators", { "legacy": true }]` like this:

  ```typescript
                  plugins: [
                    [
                      require.resolve('babel-plugin-named-asset-import'),
                      {
                        loaderMap: {
                          svg: {
                            ReactComponent:
                              '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                          },
                        },
                      },
                    ],
                    #add this line
                    ["@babel/plugin-proposal-decorators", { "legacy": true }] 
                  ],
  ```

  * Finally, run `npm install` and then `npm run start` to start your app. 

  

### References

* MobX

  * https://mobx.js.org/README.html
  * https://github.com/mobxjs/mobx
  * https://suprise.github.io/mobx-cn/best/react-performance.html
  * https://medium.com/hackernoon/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.a1t9xw4pw
  * [Chinese] https://segmentfault.com/a/1190000009547437
  * [Chinese] https://zhuanlan.zhihu.com/p/27448262
  * [Chinese] https://ithelp.ithome.com.tw/articles/10197513
  * https://stackblitz.com/edit/react-mobx-take-2?file=store.js

* Differences between Redux and MobX
  * https://blog.logrocket.com/redux-vs-mobx/
  * [React Thunk] https://codeburst.io/understanding-redux-thunk-6dbae0241817
  * [Chinese] https://www.webfalse.com/read/207386/11942891.html