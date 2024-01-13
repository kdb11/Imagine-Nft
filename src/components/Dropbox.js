import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { ethers } from 'ethers';
import NFT from '../abis/NFT.json'
import config from '../config.json';

const Dropbox = () => {
  const [name, setName] = useState("");
  const [url, setURL] = useState(null);
  const [nft, setNFT] = useState(null);
  const [image, setImage] = useState(null);
  const [provider, setProvider] = useState(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    fileUploadHandler();
    

    await mintImage(url)
    console.log("successfull mint")
  };

  const mintImage = async (tokenURI) => {
    console.log("starting to mint")

    const signer = await provider.getSigner()
    const transaction = await nft.connect(signer).mint(tokenURI, { value: ethers.utils.parseUnits("1", "ether") })
    await transaction.wait()
  }

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