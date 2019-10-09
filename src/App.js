import React, {Component} from 'react';
import {observer } from 'mobx-react';

@observer
class App extends Component {
  render(){
    const {store} = this.props;
    return <div>
      <button onClick={store.addNumber}>Plus 1</button>
      Now the number is: {store.number}
    </div>
 }s
}

export default App;
