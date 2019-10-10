import React, {Component} from 'react';
import {observer, inject } from 'mobx-react';
import Header from './Header';
import Calculator from './Calculator';

class App extends Component {
  render(){
    return <div>
      <Header/>
      <Calculator/>
    </div>
 }
}

export default App;
