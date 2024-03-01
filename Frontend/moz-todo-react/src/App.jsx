import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {
  const [url, setUrl] = useState('')
  const [userInput, setUserInput] = useState('')


  const getImage = async (e) => {
    e.preventDefault()
    // Send data to the backend
    try {
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
    }
  }


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
        </div>

        <div className='right-container column is-half-desktop'>
          {url ?
            (<figure class="image is-square imgDiv">
              <img src={url} />
            </figure>)
            :
            (<figure class="image is-square imgDiv">
              <img src="https://bulma.io/images/placeholders/256x256.png" />
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
