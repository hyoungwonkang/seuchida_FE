import React, { useState } from 'react';
import PostWrite_4 from '../pages/PostWrite_4';

const SearchPlace = () => {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText('');
  };

  return (
    <>
      <form className='inputForm' onSubmit={handleSubmit}>
        <input
          placeholder='Search Place...'
          onChange={onChange}
          value={inputText}
        />
        <button type='submit'>검색</button>
      </form>
      <PostWrite_4 searchPlace={place} />
    </>
  );
};

export default SearchPlace;
