import React, { useState } from 'react';

const Footer = props => {

let date = new Date().toLocaleDateString()
  return(
    <footer>
        <p>today: {date}</p>
      <h3>
       by obada Q 2020
      </h3>
    </footer>
  );
};

export default Footer;