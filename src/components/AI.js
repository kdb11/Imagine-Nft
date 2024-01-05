import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { Buffer } from 'buffer';
import axios from 'axios';


const AI = () => {

    const [name, setName] = useState("")
    const [descript, setDescript] = useState("")
    const [image, setImage] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("submit", name, descript)
        createImage()
    }

    const createImage = async () => {
        console.log("generate nft")

        const URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"

       const response = await axios({
            url: URL,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                inputs: descript, options: { wait_for_model: true},
            }),
            responseType: 'arraybuffer',
        })

        const type = response.headers['content-type']
        const data = response.data

        const base64data = Buffer.from(data).toString('base64')
        const img = `data:${type};base64,` + base64data
        setImage(img)

        return data
    }



  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='NFT name' onChange={(e) => {setName(e.target.value)}}></input>
        <input type='text' placeholder='Describe your NFT' onChange={(e) => {setDescript(e.target.value)}}></input>
        <input type='submit' value="Generate NFT"></input>
      </form>

      <div className='image'>
        <img src={image} alt="Your NFT"></img>
      </div>

    </div>
    
  );
};

export default AI;