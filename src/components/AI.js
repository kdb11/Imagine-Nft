import { React , useState, useEffect } from 'react';
import axios from 'axios';

const AI = () => {

    const [name, setName] = useState("")
    const [descript, setDescript] = useState("")

    const submitHandler = async (e) => {
    e.preventDefault()
    console.log("submit", name, descript)
    }

    

  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='NFT name' onChange={(e) => {setName(e.target.value)}}></input>
        <input type='text' placeholder='Describe your NFT' onChange={(e) => {setDescript(e.target.value)}}></input>
        <input type='submit' value="Generate NFT"></input>
      </form>

      <div className='image'>
        <img src='' alt="Your NFT"></img>
      </div>

    </div>
    
  );
};

export default AI;