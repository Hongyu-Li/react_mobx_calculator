import React, {Component} from 'react';
import './index.css';

class Header extends Component {
  render(){
    return (
    <div className= "header">
        <ul>
            <li><img alt="avatar" src="./avatar.png" width="50px" height='50px'/></li>
            <li><span className="dot"></span>Completed</li>
            <li><span><a href='https://github.com/Hongyu-Li/react_mobx_calculator/'>Get in Touch</a></span></li>
        </ul>
   </div>
   )
 }
}

export default Header;
