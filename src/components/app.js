import { LitElement, html } from '@polymer/lit-element';
import './add-item';
import './list-items';

class ToDoApp extends LitElement {

    static get properties() {
        return {
            todoList: { type: Array }
        };
    }

    constructor() {
        super();
        let list = JSON.parse(localStorage.getItem('todo-list'));
        this.todoList = list === null ? [] : list;
        console.log(list);
    }

    _firstRendered() {
        this.addEventListener('addItem', (e) => {
            this.todoList = e.detail.todoList;
        });
        this.addEventListener('removeItem', (e) => {
            let index = this.todoList.map(function(item) {
                return item.id
            }).indexOf(e.detail.itemId);
            this.todoList.splice(index, 1);
            this.todoList = _.clone(this.todoList);
            localStorage.setItem('todo-list', JSON.stringify(this.todoList));
        });
        this.addEventListener('changeItem', (e) => {
            let index = this.todoList.map(function(item) {
                return item.id
            }).indexOf(e.detail.itemId);
            this.todoList[index].done = !this.todoList[index].done;
            localStorage.setItem('todo-list', JSON.stringify(this.todoList));
        });
    }

    _render({ todoList }) {
        return html `                
        <add-item></add-item>        
        <list-items todoList=${todoList}></list-items>
        `;
    }
}
customElements.define('to-do-app', ToDoApp);