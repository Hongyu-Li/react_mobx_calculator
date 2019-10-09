import React, {Component} from 'react';
import {observer, inject } from 'mobx-react';

@inject('store')
@observer
class App extends Component {
  render(){
    const {store} = this.props;
    return <div>
      <button onClick={store.addNumber}>Plus 1</button>
      Now the number is: {store.number}
    </div>
 }
}

export default App;
