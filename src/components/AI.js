import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import axios from 'axios';
import NFT from '../abis/NFT.json'
import config from '../config.json';


const AI = () => {

    const [provider, setProvider] = useState(null)
    const [nft, setNFT] = useState(null)
    const [name, setName] = useState("")
    const [descript, setDescript] = useState("")
    const [image, setImage] = useState(null)
    const [url, setURL] = useState(null)
    
    

    const loadBlockchainData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
    
        const network = await provider.getNetwork()
    
        const nft = new ethers.Contract(config[network.chainId].nft.address, NFT, provider)
        setNFT(nft)

        const name = await nft.name()
        console.log("name", name)
      }

      useEffect(() => {
        loadBlockchainData()
      }, [])
    

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("submit", name, descript)
        const imageData = createImage()
        const url = await uploadImage(imageData)

        console.log("url", url)
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

    const uploadImage = async (imageData) => {
        console.log("image uploading")
        const nftstorage = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY })

        const { ipnft } = await nftstorage.store({
            image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
            name: name,
            description: descript,
        })

        const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
        setURL(url)

    return url
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

      <p>{url} </p>

    </div>
    
  );
};

export default AI;