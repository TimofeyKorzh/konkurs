import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.scss';
import { postGenerateTextEndpoint } from './utils';
//import {Helmet} from "react-helmet";
import { YMInitializer } from 'react-yandex-metrika';

const TITLE = 'SBWriter';
function App() {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  //const [model, setModel] = useState('gpt2');
  const model = "345M";
  const [generatedText, postGenerateText] = postGenerateTextEndpoint();

  const handleChange = (event) => {
    setText(event.target.value);
  };


  useEffect(() => {
    document.title = TITLE;
 }, []);
  
  const THEME = createMuiTheme({
    typography: {
     "fontFamily": `"MinionPro", sans-serif`,
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });

 
  const generateText = () => {
    generatedText.complete = false;
    postGenerateText({ text, model, userId: 1 });
    setToggle(false);
  }
  if (generatedText.complete && !generatedText.error && !toggle){
    setText(text+generatedText.data.result);
    setToggle(true);
  }
  return (
    
    <MuiThemeProvider theme ={THEME}>
    <div className="application">
      </div>
    <div className='app-container'>
      
    <YMInitializer accounts={[83732773]} options={{webvisor: true}}/>

      <form noValidate autoComplete='off'>
        <h1>SweetieBot Writer v2.35</h1>
        <TextField className='form textinput' multiline fullWidth value={text} onChange={handleChange} />
        <Button onClick={generateText} />
      </form>

      {generatedText.pending &&
        <div className='result pending'>Please wait</div>}

      {generatedText.complete &&
        (generatedText.error ?
          <div className='result error'>Bad Request</div> :
          <div className='result valid'>
            {generatedText.data.result}
          </div>)}
    </div>
    </MuiThemeProvider>
  );
}

export default App;
