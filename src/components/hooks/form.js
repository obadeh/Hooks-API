import { useState } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event){
      event.preventDefault();
      event.target.reset();
    }

    callback(values);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({...values, [event.target.name] : event.target.value }));
    console.log('values : ', values);
  };

  const handleInput = {
    onChange: (event) => {
      event.persist();
      setValues(values => ({...values, [event.target.name] : event.target.value }));
    },
  };

  return [handleSubmit, handleInput, handleChange, values];
};

export default useForm;