import { useState } from 'react';

import Navigation from './components/Navigation';
import ToggleButton from './components/ToggleButton';

function App() {
  const [account, setAccount] = useState(null)

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <div className='form'>
        <ToggleButton />
      </div>

      <p> View&nbsp; <a target='_blank' rel="noreferrer" href=''>Metadata</a></p>

    </div>
  );
}

export default App;