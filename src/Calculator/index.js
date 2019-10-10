import React, {Component} from 'react';
import './index.css';

class Calculator extends Component {
  render(){
    const operations = ['+','-','x','1','2','3','4','5','6','7','8','9','0','clear','='];
    return (
    <div className= "calculator">
        <span className='calculation'></span>
        <div className='operation-board'>
            {operations.map((item)=>
                <button id={item} className='operations'>{item}</button>
            )}
        </div>
   </div>
   )
 }
}

export default Calculator;
