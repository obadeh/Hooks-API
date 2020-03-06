import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { When } from '../if';
import Modal from '../modal';
import Header from '../header/header.js'
import Footer from '../footer/footer.js'

import './todo.scss';


const Todo2 = (props) =>{

const [todoList,setTodoList] = useState([])
const [item,setItem] = useState({})
const [showDetails,setShowDetails] = useState(false)
const [details,setDetails] = useState({})

const handleInputChange = e => {
  setItem({...item, [e.target.name]: e.target.value} )
};
const handleSubmit = (e) => {
  props.handleSubmit(item);
};
const addItem = (e) => {

  e.preventDefault();
  e.target.reset();

  const defaults = { _id: uuidv4(), complete:false };
  const item1 = Object.assign({}, item, defaults);

  setTodoList([...todoList, item1])
  setItem({})
};
const deleteItem = id => {

  setTodoList(todoList.filter(item => item._id !== id))
};
const saveItem = updatedItem => {
  setTodoList(todoList.map(item =>
    item._id === updatedItem._id ? updatedItem : item
  ))
};
const toggleComplete = id => {
  let item1 = todoList.filter(i => i._id === id)[0] || {};
  if (item1._id) {
    item1.complete = !item1.complete;
    saveItem(item1);
  }
  
};

const toggleDetails = id => {
  let showDetails1 = ! showDetails;
  let details1 = todoList.filter( item => item._id === id )[0] || {};
  setDetails(details1)
  setShowDetails(showDetails1)
}

useEffect(() => {
  // Update the document title using the browser API
  document.title = `${todoList.filter( item => !item.complete ).length} task to Complete`;
});
return (
  <>
    <Header todoList={todoList}/>

    <section className="todo">

      <div>
        <h3>Add Item</h3>
        <form onSubmit={addItem}>
          <label>
            <span>To Do Item</span>
            <input
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Difficulty Rating</span>
            <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={handleInputChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
          </label>
          <label>
            <span>Due</span>
            <input type="date" name="due" onChange={handleInputChange} />
          </label>
          <button>Add Item</button>
        </form>
      </div>

      <div>
        <ul>
          { todoList.map(item => (
            <li
              className={`complete-${item.complete.toString()}`}
              key={item._id}
            >
              <span onClick={() => toggleComplete(item._id)}>
                {item.text}
              </span>
              <button onClick={() => toggleDetails(item._id)}>
                Details
              </button>
              <button onClick={() => deleteItem(item._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <When condition={showDetails}>
      <Modal title="To Do Item" close={toggleDetails}>
        <div className="todo-details">
          <header>
            <span>Assigned To: {details.assignee}</span>
            <span>Due: {details.due}</span>
          </header>
          <div className="item">
            {details.text}
          </div>
        </div>
      </Modal>
    </When>

    <Footer/>
  </>
);

}


export default Todo2;
