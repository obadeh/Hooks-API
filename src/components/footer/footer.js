import React, { useState } from 'react';

const Footer = props => {

  let date = new Date().toTimeString();
  return(
    <footer>
      <p>{date}</p>
      <h3>
       By obada Q 2020
      </h3>
    </footer>
  );
};

export default Footer;