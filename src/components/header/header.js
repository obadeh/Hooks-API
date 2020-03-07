import React, { useState } from 'react';

const Header = props => {


  return(
    <header>
      <h2>
        <p>There are</p> 
        {props.todoList.filter( item => !item.complete ).length}
        " Items To Complete
      </h2>
    </header>
  );
};

export default Header;