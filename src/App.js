import React, {Component} from 'react';
import {observer, inject } from 'mobx-react';
import Header from './Header';

class App extends Component {
  render(){
    return <div>
      <Header/>
    </div>
 }
}

export default App;
