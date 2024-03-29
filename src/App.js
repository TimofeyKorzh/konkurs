import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.scss';
import { postGenerateTextEndpoint } from './utils';
import { YMInitializer } from 'react-yandex-metrika';

import { Box } from '@material-ui/core';
import axios from 'axios';

const TITLE = 'Конкурс Малых Фанфиков';
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
    setResponse("Уже в пути...")
  };


  const handleSubmit = (event) => {
    setResponse("Уже в пути...")
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
            setResponse("Мда... Что-то пошло не так. Попробуй подождать немного. Если не помогает, напиши моему другу на почту tkorghebin@gmail.com");
          }
          else if (res.data.message == "This file was alredy sent!"){
            setResponse("Этот файл я уже таскала... Твой код: " + String(res.data.hash));
          }
          else {
            setResponse("Принято! Твой код: " + String(res.data.hash));
          }
        })
        .catch(err => {
          console.log(err);
          setResponse("Мда... Что-то пошло не так. Попробуй подождать немного. Если не помогает, напиши моему другу на почту tkorghebin@gmail.com");
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
      
       
       <Box textAlign='center'>
       <div class="image hide-mobile">
        
        <img src="dutynbg.png" width="300px" ></img>
          <p></p>
    
         </div> 
       <h1><span>Конкурс Малых Фанфиков</span></h1>
       <p>Привет, писатель! Здесь ты сможешь отправить свою работу на конкурс и получить код!</p>
       <p>Код нужен для анонимности! С его помощью ты сможешь доказать, что работа твоя и получить приз!</p>
       <p>Работы принимаются до конца 26-го февраля по Москве.</p>
       
       
      
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
        <p>Работы с предыдущего конкурса можно прочитать в <a href='https://archive.konkurs.monetka.name/'>Архиве</a>.</p>
        <p>Присылая работу, вы соглашаетесь, что она будет идти под лицензией <a href='http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ru'>CC BY-NC-SA 3.0</a></p>
         
        </Box>
       
        </form>
      
    </div>

    </MuiThemeProvider>
    
  );
}

export default App;
