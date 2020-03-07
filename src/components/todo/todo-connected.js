import React, { useState, useEffect } from 'react';
import { When } from '../if';
import Modal from '../modal';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const Todo2 = (props) =>{ 

  
    const [todoList,setTodoList] = useState([]);
    const [item,setItem] = useState({});
    const [showDetails,setShowDetails] = useState(false);
    const [details,setDetails] = useState({});
  
    const handleInputChange = e => {
      setItem({...item, [e.target.name]: e.target.value} );
    };

    const callAPI = (url, method='get', body, handler, errorHandler) => {

    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(response => response.json())
      .then(data => typeof handler === 'function' ? handler(data) : null )
      .catch( (e) => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e)  );
  };

  const addItem = (e) => {

    e.preventDefault();
    e.target.reset();

    const _updateState = newItem =>
    setTodoList([...todoList, newItem])
     
    callAPI( todoAPI, 'POST', item, _updateState );

  };

  const deleteItem = id => {

    const _updateState = (results) =>
    
    setTodoList(todoList.filter(item => item._id !== id))
    
    callAPI( `${todoAPI}/${id}`, 'DELETE', undefined, _updateState )

  };

  const saveItem = updatedItem => {

    const _updateState = (newItem) =>
    setTodoList(todoList.map(item =>
        item._id === newItem._id ? newItem : item
      ))

      

    callAPI( `${todoAPI}/${updatedItem.id}`, 'PUT', updatedItem, _updateState );

  };

  const toggleComplete = id => {
    let item = todoList.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      saveItem(item);
    }
  };

  const toggleDetails = id => {
    let showDetails1 = ! showDetails;
    let details1 = todoList.filter( item => item._id === id )[0] || {};
    setDetails(details1)
    setShowDetails(showDetails1)
  }

  const getTodoItems = () => {
    const _updateState = data => setTodoList(data.results);
    callAPI( todoAPI, 'GET', undefined, _updateState );
  };

  useEffect(() => {
    getTodoItems();
  });
  
//   const componentDidMount = () => {
//     getTodoItems();
//   }


    return (
      <>
        <header>
          <h2>
            There are
            {todoList.filter( item => !item.complete ).length}
            Items To Complete
          </h2>
        </header>

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
      </>
    );
  }


export default Todo2;
