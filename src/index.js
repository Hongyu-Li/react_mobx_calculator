import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppStore from './store';
import { Provider } from 'mobx-react';


const store = new AppStore();
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'));
