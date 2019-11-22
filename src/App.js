import React from 'react';
import './App.css';
import SelfHelp from './containers/SelfHelp/SelfHelp';

function App() {
  return (
    <div className="App">
      <div style={{marginTop: 100, border: '1px solid red', width: '50%', display: 'flex', justifyContent: 'center', alignSelf: 'center'}}>
        This is the guide element 1
      </div>

      <div style={{marginTop: 100, border: '1px solid red', width: '50%', display: 'flex', justifyContent: 'center', alignSelf: 'center'}}>
        This is the guide element 2
      </div>
      {/* <SelfHelp/> */}
      <SelfHelp themeColor="#FFC45E" highlightColor="#FFC45E" inspectorColor="#c1f0f6"></SelfHelp>

    </div>
  );
}

export default App;
