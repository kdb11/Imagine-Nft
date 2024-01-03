import React from 'react';

const Dropbox = () => {
  return <div className='form'>
  <form>
    <input type='text' placeholder='NFT name'></input>
    <input type='submit' value="Generate NFT"></input>
  </form>

  <div className='image'>
    <img src='' alt="Your NFT"></img>
  </div>

</div>
};

export default Dropbox;