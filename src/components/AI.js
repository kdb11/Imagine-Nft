import React from 'react';

const AI = () => {
  return (
    <div className='form'>
      <form>
        <input type='text' placeholder='NFT name'></input>
        <input type='text' placeholder='Describe your NFT'></input>
        <input type='submit' value="Generate NFT"></input>
      </form>

      <div className='image'>
        <img src='' alt="Your NFT"></img>
      </div>

    </div>
  );
};

export default AI;