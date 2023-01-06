import React from 'react'
import { Navbar } from './Navbar'
import './styles/Header.css'

export const Header = ({user}) => {
  return(
      <header id='cabecera'>
        <Navbar username={user} />
        <img id='img' src="/pexels-lukas-296115.jpg" />
        <div className="gretting">
          <h1>Welcome to</h1>
          <h1>Post Yourlsef!</h1>
          <p>
            Welcome! On this site, you can post everything you need to express yourself with somebody want to share some thought, feeling, and so much more!.
          </p>
          <p>
            You can create here your acount, or sign in with some acount you're created already!
          </p>
        </div>
      </header>
  )
} 

