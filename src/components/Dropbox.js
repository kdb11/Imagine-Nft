import React, { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage';
import { ethers } from 'ethers';

const Dropbox = () => {
  const [name, setName] = useState("");
  const [url, setURL] = useState(null);
  const [image, setImage] = useState(null);
  const [provider, setProvider] = useState(null)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const fileSelectedHandler = (e) => {
    const selected = e.target.files[0];
    setImage(URL.createObjectURL(selected));
  };

  const fileUploadHandler = async () => {
    if (image) {
      console.log("image uploading");
      const nftstorage = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY });

      const { ipnft } = await nftstorage.store({
        image: new File([image], "image.jpeg", { type: "image/jpeg" }),
        name: name,
        description: "",
      });

      const imageUrl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
      setURL(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fileUploadHandler();
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='NFT name' onChange={(e) => setName(e.target.value)} />
        <input type='file' onChange={fileSelectedHandler} />
        <button className='inputBtn' type='submit'>Create NFT</button>
      </form>

      <div className='image'>
        {image && <img src={image} alt="Your NFT" />}
      </div>

      <p>{url}</p>
    </div>
  );
};

export default Dropbox;