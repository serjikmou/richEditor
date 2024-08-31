import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyEditor from './MyEditor';
import Editor from './EditorW';
import EditorMail from './EditorMail';
import Jodit from './Jodit';

function App() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
    }}>
      {/* <MyEditor /> */}
      {/* <Editor /> */}
      {/* <EditorMail /> */}
      <Jodit />
    </div>

  );
}

export default App;
