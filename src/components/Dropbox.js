
import React from 'react';
import axios from 'axios';

const Dropbox = () => {
/*     state= {
        selectedFile: null
    }

    fileSelectedHandler = (e) => {
        this.state({
            selectedFile: e.target.files[0]
        })
    }

    fileUploadHandler = () => {
        axios.post("")
    }
 */
  return (
    <div className='form'>
        <form>
            <input type='text' placeholder='NFT name'></input>
            {/* <input type='file' onChange={this.fileSelectedHandler}></input>
            <button onClick={this.fileUploadHandler}>Upload</button> */}
            <input type='submit' value="Create NFT"></input>
        </form>

        <div className='image'>
            <img src='' alt="Your NFT"></img>
        </div>

    </div>
  )
  
};

export default Dropbox;