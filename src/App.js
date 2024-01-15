import { useState } from 'react';
import image from "./img/3.jpg"

import Navigation from './components/Navigation';
import ToggleButton from './components/ToggleButton';

function App() {
  const [account, setAccount] = useState(null)

  return (
    <div style={{ backgroundImage:`url(${image})`,height: "100vh", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <Navigation account={account} setAccount={setAccount} />
      <div className='form'>
        <ToggleButton />
      </div>

    </div>
  );
}

export default App;