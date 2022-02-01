import ParallaxImage from './photos/mugs.jpeg'
import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'

import './index.css'

const WeddingSite = () => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setOffset(window.pageYOffset)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="hero">
      <img
        className="parallax-image"
        src={ParallaxImage}
        style={{
          transform: `translateY(${offset * 0.5}px)`,
        }}
      />
      <div className="parallax-text">
        <h1 style={{ fontSize: '54px' }}>Coming soon</h1>
        <h2 style={{ marginTop: 0, fontSize: '34px' }}>2022</h2>
      </div>
    </section>
  )
}

ReactDOM.render(<WeddingSite />, document.getElementById('root'))
