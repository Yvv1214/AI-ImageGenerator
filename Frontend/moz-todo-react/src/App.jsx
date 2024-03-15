import { useState } from 'react'
import axios from 'axios'
import backgroundimg from '../../moz-todo-react/src/assets/backgroundimg.png'
import { Microphone } from './component/Microphone'
import './App.css'




function App() {
  const [url, setUrl] = useState('')
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)


  const getImage = async (e) => {
    e.preventDefault()
    // Send data to the backend
    try {
      setLoading(true)
      const response = await fetch("http://127.0.0.1:8000/createImg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userInput: userInput })
      })
      const data = await response.json()
      console.log('data', data)
      setUrl(data.image_url)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }



const transcribe = async (blobUrl) => {
  try {
    setLoading(true);

    // convert blob url to blob object
    const blob = await fetch(blobUrl).then((res) => res.blob());

    // construct audio to send file
    const formData = new FormData();
    formData.append('file', blob, 'myfile.wav');

    // send formData to API endpoint
    const response = await axios.post('http://127.0.0.1:8000/audio', formData, {
      headers: { 'Content-Type': 'audio/mpeg' }, //sending audio
      responseType: 'json', //expected response
    });

    const transcription = response.data.transcribed_text;
    console.log('HERE', transcription)
    setUserInput(userInput + transcription) //adds on to input without replacing everything

  } catch (error) {
  } finally {
    setLoading(false);
  }
};



  return (
    <>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="burgerMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="burgerMenu" class="navbar-menu">

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>Home</strong>
                </a>
                <a class="button is-light">
                  About
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className='columns'>
        <div className='left-container column is-half-desktop'>
          <h1 className='container is-size-1 has-text-centered'>AI Image Generator</h1>

          <form class="control ml-2" onSubmit={getImage}>
            <label for='input'>Describe your image</label>
            <span className='level-item'>
              <input
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                class="input"
                id='input'
                type="text"
                placeholder="Image Description">
              </input>
              <button
                type='button'
                class="button"
                onClick={getImage}>
                Search
              </button>
            </span>
          </form>
          <Microphone transcribe={transcribe} />
        </div>

        <div className='right-container column is-half-desktop'>
          {loading === true ?
            (<h2 className='loading'>
              <i class="fas fa-spinner fa-pulse"></i>
              <p>Loading</p>
            </h2>)
            :
            null
          }

          {url ?
            (<figure class="image is-square imgDiv">
              <img src={url} />
            </figure>)
            :
            (<figure class="image is-square imgDiv">
              <img src={backgroundimg} />
            </figure>)
          }
        </div>
      </div>

      <footer className='has-background-primary-light	'>
        <div className='has-text-centered'>2024</div>
      </footer>

    </>
  )
}

export default App
