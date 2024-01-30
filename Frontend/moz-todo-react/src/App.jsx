import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [url, setUrl] = useState()


  return (
    <>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">

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

      <div className='columns is-desktop'>
        <div className='left-container column is-half-desktop'>
          <h1 className='container is-size-1 has-text-centered'>AI Image Generator</h1>
          <form class="control ml-2">
            <label for='input'>Describe your image</label>
            <input class="input" id='input' type="text" placeholder="Image Description"></input>
          </form>
        </div>

        <div className='right-container column is-half-desktop'>
          <div className='img-box'>
            box
          </div>
        </div>
      </div>

      <footer className='footer has-background-primary-light	'>
        <div className='has-text-centered'>2024</div>
      </footer>

    </>
  )
}

export default App
