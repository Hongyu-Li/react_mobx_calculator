import React, {Component} from 'react';
import './index.css';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Calculator extends Component {
  render(){
    const operations = ['+','-','*','1','2','3','4','5','6','7','8','9','0','clear','='];
    const {store} = this.props;
    return (
    <div className= "calculator">
        <span className='calculation'>{store.answer}</span>
        <div className='operation-board'>
            {operations.map((item,i)=>
                <button id={i} className='operations' onClick={()=>store.calculate(item)}>{item}</button>
            )}
        </div>
   </div>
   )
 }
}

export default Calculator;
