import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
//import Button from './components/Button';
import Button from '@material-ui/core/Button'
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.scss';
import { postGenerateTextEndpoint } from './utils';
//import {Helmet} from "react-helmet";
import { YMInitializer } from 'react-yandex-metrika';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core';
import { Box } from '@material-ui/core';
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
    },
 });

 const styles = {
  root: {
    marginLeft: 5
  }
}
const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.spinner}
    size={10}
    style={{marginLeft: "0.5em"}}
  />
))
const AdornedButton = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props
  return (
    <Button style={{ marginTop: '1em', marginBottom: '1em', width: 'fit-content', paddingBottom: '2em', backgroundColor: 'transparent'}}

    color="primary"
    {...rest}>
       
      {children}
      {loading && <SpinnerAdornment  {...rest} />}
      
    </Button>
  )
}
 
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
      <div class="image hide-mobile">
      <a href="https://twitter.com/Kviksi_nya/status/1424899773165973509"><img src="sweetiebot.png" width="320" height="180" alt="SweetieBot by Kviksi" title="SweetieBot by Kviksi"></img></a>
        <h1 class = "Back"><span>SweetieBot Writer v2.54</span></h1>
        <p></p>
       </div> 
       
       <div class="image show-mobile">
       <h1><span>SweetieBot Writer v2.45</span></h1>
       
       </div>
       <div class = "myelement">
      
        <TextField className='form textinput' multiline fullWidth label="Начните писать..." value={text} onChange={handleChange} />
        <Box textAlign='center'>
        <AdornedButton onClick={generateText} loading = {generatedText.pending}>
         Генерировать 
        </AdornedButton>
        </Box>
        </div>
        </form>
      
    </div>
    </MuiThemeProvider>
  );
}

export default App;
//{generatedText.pending&&
  //<div className='result pending'>Подождите!</div>}
  //