import {observable, action} from 'mobx';

class AppStore {
    @observable number = 0;

    @action.bound addNumber() {
        this.number++;
    }
};

export default AppStore;