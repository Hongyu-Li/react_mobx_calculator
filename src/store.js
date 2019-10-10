import {observable, action} from 'mobx';

class AppStore {
    @observable calculation = '';
    @observable answer = '';

    @action.bound calculate(operation) {
        switch(operation) {
            case 'clear':
                this.calculation = '';
                this.answer = 0;
                break;
            case '=':
                try {
                    this.answer = eval(this.calculation);
                }catch {
                    window.alert('请输入正确的计算公式！');
                    this.answer = 0
                }finally{
                    this.calculation = '';
                }
                break;
            default:
                this.calculation = this.calculation + operation;
                this.answer = this.calculation
        }        
    }
};

export default AppStore;