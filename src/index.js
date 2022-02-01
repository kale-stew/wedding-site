import ContactForm from './components/ContactForm'
import ParallaxImage from './photos/mugs.jpeg'
import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'

import './index.css'

// TODO:
//  1- Branch this elopement info and make a stand-in "Coming soon..." page
//      that has an estimated date and parallax image of us two
//  2- Create a header that populates with anchors on the page
//  3- Create a footer that links to source
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
    <>
      <section className="hero">
        <img
          className="parallax-image"
          src={ParallaxImage}
          style={{
            transform: `translateY(${offset * 0.25}px)`,
          }}
        />
        <div className="parallax-text">
          <h1>We Eloped!</h1>
          <h3>on top of Mount Sniktau</h3>
          <h3>on March 30th, 2022</h3>
        </div>
      </section>
      <section className="content">
        <p style={{ maxWidth: '50%' }}>
          We just couldn't wait! In Colorado, a couple is allowed to
          self-solemnize and a pet can sign as witness. We hiked up to 13,240'
          to say our vows, and then Otis signed our Clear Creek County marriage
          license with us at home in Georgetown, Colorado.
        </p>
        <h2 id="reception">Future Reception Plans</h2>
        <p>
          The pandemic was one of our key concerns about hosting a large party,
          so we're going to wait until you can all travel safely to us to
          schedule our reception. We want to celebrate with you, our close
          friends and family, very soon. It will most likely be...
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>When:</strong> May 2022
        </p>
        <p>
          <strong>Where:</strong> Cabin Creek Brewery in Georgetown, Colorado
        </p>
        <h2 id="registry">Send Us a Gift</h2>
        <p>
          Your presence at our future reception will be enough! If you still
          want to get us a celebratory gift, we are registered at the following
          websites (and if you'd rather have our physical address, you can ask
          for it through the contact form <a href="#contact">below</a>):
        </p>
        <ul>
          <li>
            <a
              href="https://smile.amazon.com/wedding/share/kylieandkyle22"
              target="_blank"
            >
              on Amazon
            </a>
          </li>
          <li>
            <a
              href="https://www.zola.com/registry/kylieandkyle22"
              target="_blank"
            >
              on Zola
            </a>
          </li>
        </ul>
        <h2 id="contact">Send Us a Message</h2>
        <p>
          If you want to send us a direct message, the form below delivers to
          our 💌{' '}
          <a network="email" href="mailto:kylieandkyle22@gmail.com">
            shared email account
          </a>
          .
        </p>
        <ContactForm />
        {/* <h2>👫🏼 How We Met</h2> */}
        {/* <h2>💍 How He Asked</h2> */}
        <h2 id="photos">Photos of Our Wedding Day</h2>
        <p>
          The wonderful{' '}
          <a href="https://larsenphoto.co/about/">Nina Larsen Reed</a> took our
          wedding photos.
        </p>{' '}
      </section>
    </>
  )
}

ReactDOM.render(<WeddingSite />, document.getElementById('root'))
