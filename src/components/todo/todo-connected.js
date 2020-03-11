/* eslint-disable no-undefined */
import React, { useState, useEffect } from 'react';
import { When } from '../if';
import Modal from '../modal';
import useForm from '../hooks/form.js';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const Todo2 = (props) =>{

  const addItem = () => {

    // e.preventDefault();
    // e.target.reset();

    const _updateState = newItem =>
      setTodoList([...todoList, newItem]);

    callAPI( todoAPI, 'POST', values, _updateState );

  };

  // from form hook
  const [handleSubmit, handleInput, handleChange, values] = useForm(addItem);

  const [todoList,setTodoList] = useState([]);
  // const [item,setItem] = useState({});
  const [showDetails,setShowDetails] = useState(false);
  const [details,setDetails] = useState({});

  const callAPI = (url, method = 'get', body, handler, errorHandler) => {

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



  const deleteItem = id => {

    const _updateState = (results) =>

      setTodoList(todoList.filter(values => values._id !== id));

    callAPI( `${todoAPI}/${id}`, 'DELETE', undefined, _updateState );

  };

  const saveItem = updatedItem => {

    const _updateState = (newItem) =>
      setTodoList(todoList.map(values =>
        values._id === newItem._id ? newItem : values,
      ));



    callAPI( `${todoAPI}/${updatedItem.id}`, 'PUT', updatedItem, _updateState );

  };

  const toggleComplete = id => {
    let values = todoList.filter(i => i._id === id)[0] || {};
    if (values._id) {
      values.complete = !values.complete;
      saveItem(values);
    }
  };

  const toggleDetails = id => {
    let showDetails1 = ! showDetails;
    let details1 = todoList.filter( values => values._id === id )[0] || {};
    console.log('todoList : ', todoList);
    setDetails(details1);
    console.log('details : ', details);
    setShowDetails(showDetails1);
  };

  const getTodoItems = () => {
    const _updateState = data => setTodoList(data.results);
    callAPI( todoAPI, 'GET', undefined, _updateState );
  };

  useEffect(() => {
    getTodoItems();
  });

  return (
    <>
      <header>
        <h2>
            There are
          {todoList.filter( values => !values.complete ).length}
            Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <h3>Add Item</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <span>To Do Item</span>
              <input
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Difficulty Rating</span>
              <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={handleChange} />
            </label>
            <label>
              <span>Assigned To</span>
              <input type="text" name="assignee" placeholder="Assigned To" onChange={handleChange} />
            </label>
            <label>
              <span>Due</span>
              <input type="date" name="due" onChange={handleChange} />
            </label>
            <button>Add Item</button>
          </form>
        </div>

        <div>
          <ul>
            { todoList.map(values => (
              <li
                className={`complete-${values.complete.toString()}`}
                key={values._id}
              >
                <span onClick={() => toggleComplete(values._id)}>
                  {values.text}
                </span>
                <button onClick={() => toggleDetails(values._id)}>
                    Details
                </button>
                <button onClick={() => deleteItem(values._id)}>
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
};


export default Todo2;
