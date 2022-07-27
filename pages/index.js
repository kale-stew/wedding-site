import AllPictures from '../public/photos/images'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import Gallery from 'react-grid-gallery'
import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const WeddingSite = () => {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleScroll() {
        setOffset(window.pageYOffset)
      }
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <>
      <section className="hero">
        <Image
          id="heroImg"
          className="parallax-image"
          priority={true}
          src="/photos/sunrise-17.jpeg"
          alt="Hero Image of Kylie and Kyle saying their vows"
          style={{
            transform: `translateY(${offset * 0.25}px)`,
          }}
          layout="fill"
          objectFit="cover"
        />
        <div className="parallax-text">
          <h1>We Eloped!</h1>
          <h3>on Monday March 28th, 2022</h3>
        </div>
      </section>
      <section className="content">
        <p style={{ maxWidth: '70%' }}>
          We just couldn't wait! In Colorado, a couple is allowed to
          self-solemnize and a pet can sign as witness. We hiked up to 12,604'
          to say our vows at sunrise, and then Otis signed our Clear Creek
          County marriage license on a walk around the lake with us at home in
          Georgetown, Colorado.
        </p>
        <h2 id="reception">Future Reception Plans</h2>
        <p>
          We plan on hosting a reception for family in the fall, and an informal
          celebration for our friends over the summer. You can check back here
          for that information, but we'll also be sending out invitations as
          soon as we can.
        </p>
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
        <h2 id="registry">Send Us a Gift</h2>
        <p>
          Your presence at our future reception will be enough! If you still
          want to get us a celebratory gift, we are registered at the following
          websites (and if you'd rather have our physical address, you can ask
          for it through the contact form <a href="#contact">above</a>):
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
        <h2 id="photos">Photos of Our Wedding Day</h2>
        <p>
          The wonderful{' '}
          <a href="https://larsenphoto.co/about/">Nina Larsen Reed</a> took our
          wedding photos.
        </p>{' '}
        <div className="gallery-wrapper">
          <Gallery
            images={AllPictures}
            backdropClosesModal={true}
            enableImageSelection={false}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default WeddingSite
