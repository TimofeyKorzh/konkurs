import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.scss';
import { postGenerateTextEndpoint } from './utils';
import { YMInitializer } from 'react-yandex-metrika';

import { Box } from '@material-ui/core';
import axios from 'axios';

const TITLE = 'Конкурс писателей фанфиков';
function App() {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  //const [model, setModel] = useState('gpt2');
  const [temperature, setTemperature] = useState(1);
  const [lenght, setLenght] = useState(20);
  const [generatedText, postGenerateText] = postGenerateTextEndpoint();
  const [file, setFile] = useState();
  const [response, setResponse] = useState();

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setResponse("Подождите немного...")
  };


  const handleSubmit = (event) => {
    setResponse("Подождите немного...")
    event.preventDefault();
    let form_data = new FormData();
    form_data.append('file', event.target.files[0], event.target.files[0].name);
    let url = 'https://api.konkurs.monetka.name/upload';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          if (res.data.message == "There was an error uploading the file"){
            setResponse("Ой-ой! Что-то пошло не так...");
          }
          else if (res.data.message == "This file was alredy sent!"){
            setResponse("А разве ты мне уже не слал этот файл?.. Твой код: " + String(res.data.hash));
          }
          else {
            setResponse("Получила и запомнила! Твой код: " + String(res.data.hash));
          }
        })
        .catch(err => {
          console.log(err);
          setResponse("Ой-ой! Что-то пошло не так...");
        })
  };
  const fileSend = () => {
    console.log(file);
    console.log("Test")
    postGenerateText( file );
  }

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


 

  return (
    
    <MuiThemeProvider theme ={THEME}>
    <div className="application">
      </div>
    <div className='app-container'>
      
    <YMInitializer accounts={[89457679]}/>
    
    <form noValidate autoComplete='off'> 
      <div class="image hide-mobile">
      <img src="unknown-35.png" height="180" alt="Writer by F_F" title="Writer by F_F"></img>
        <p></p>
  
       </div> 
       
       <Box textAlign='center'>
       <h1><span>Конкурс писателей фанфиков</span></h1>
       <p>Привет, друг! Здесь ты сможешь отправить свою работу на конкурс и получить код!</p>
       <p>Зачем всё так усложнять?</p>
       <p>Для анонимности, конечно же! А с помощью кода ты сможешь доказать, что работа твоя и получить приз!</p>
       <p>Работы принимаются до 27-го февраля.</p>
       
       
      
       <label htmlFor="upload-fic">
        <input
          style={{ display: 'none' }}
          id="upload-fic"
          name="upload-fic"
          type="file"
          onChange={handleSubmit}
        />

        <Button  variant="text" component="span" type="submit"  onClick={fileSend}>
          Выбрать файл и отправить!
        </Button>
        
        </label>
        <p>{response}</p>
        </Box>
       
        </form>
      
    </div>
    </MuiThemeProvider>
  );
}

export default App;
