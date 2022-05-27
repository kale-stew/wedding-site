const photographerCredits = 'Photo by Nina Larsen.'
const urlPrefix =
  'https://raw.githubusercontent.com/kale-stew/wedding-site/dev/public/photos/'

const standardThumbnail = {
  length: 400,
  height: 266.33,
}

const AllPictures = [
  {
    src: `${urlPrefix}stars-1.jpeg`,
    thumbnail: `${urlPrefix}stars-1.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Before sunrise, on our way up the mountain from Loveland Pass. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}stars-2.jpeg`,
    thumbnail: `${urlPrefix}stars-2.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Photo by Kyle.`,
  },
  {
    src: `${urlPrefix}sunrise-1.jpeg`,
    thumbnail: `${urlPrefix}sunrise-1.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-2.jpeg`,
    thumbnail: `${urlPrefix}sunrise-2.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-3.jpeg`,
    thumbnail: `${urlPrefix}sunrise-3.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-4.jpeg`,
    thumbnail: `${urlPrefix}sunrise-4.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-5.jpeg`,
    thumbnail: `${urlPrefix}sunrise-5.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-6.jpeg`,
    thumbnail: `${urlPrefix}sunrise-6.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-7.jpeg`,
    thumbnail: `${urlPrefix}sunrise-7.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-8.jpeg`,
    thumbnail: `${urlPrefix}sunrise-8.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-9.jpeg`,
    thumbnail: `${urlPrefix}sunrise-9.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-10.jpeg`,
    thumbnail: `${urlPrefix}sunrise-10.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-11.jpeg`,
    thumbnail: `${urlPrefix}sunrise-11.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-12.jpeg`,
    thumbnail: `${urlPrefix}sunrise-12.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Saying our vows as the sun rose. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-13.jpeg`,
    thumbnail: `${urlPrefix}sunrise-13.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Our first kiss as Mr and Mrs! ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}sunrise-14.jpeg`,
    thumbnail: `${urlPrefix}sunrise-14.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-15.jpeg`,
    thumbnail: `${urlPrefix}sunrise-15.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-16.jpeg`,
    thumbnail: `${urlPrefix}sunrise-16.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-17.jpeg`,
    thumbnail: `${urlPrefix}sunrise-17.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-18.jpeg`,
    thumbnail: `${urlPrefix}sunrise-18.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-19.jpeg`,
    thumbnail: `${urlPrefix}sunrise-19.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-20.jpeg`,
    thumbnail: `${urlPrefix}sunrise-20.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-21.jpeg`,
    thumbnail: `${urlPrefix}sunrise-21.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}sunrise-22.jpeg`,
    thumbnail: `${urlPrefix}sunrise-22.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-1.jpeg`,
    thumbnail: `${urlPrefix}wind-1.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Looking at Kyle's anemometer. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}wind-2.jpeg`,
    thumbnail: `${urlPrefix}wind-2.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-3.jpeg`,
    thumbnail: `${urlPrefix}wind-3.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-4.jpeg`,
    thumbnail: `${urlPrefix}wind-4.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-5.jpeg`,
    thumbnail: `${urlPrefix}wind-5.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-6.jpeg`,
    thumbnail: `${urlPrefix}wind-6.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-7.jpeg`,
    thumbnail: `${urlPrefix}wind-7.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-8.jpeg`,
    thumbnail: `${urlPrefix}wind-8.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-9.jpeg`,
    thumbnail: `${urlPrefix}wind-9.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}wind-10.jpeg`,
    thumbnail: `${urlPrefix}wind-10.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `It was a little windy. ☺️ ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}wind-11.jpeg`,
    thumbnail: `${urlPrefix}wind-11.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `It was a little windy. ☺️ ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}snow-1.jpeg`,
    thumbnail: `${urlPrefix}snow-1.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-2.jpeg`,
    thumbnail: `${urlPrefix}snow-2.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-3.jpeg`,
    thumbnail: `${urlPrefix}snow-3.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-4.jpeg`,
    thumbnail: `${urlPrefix}snow-4.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-5.jpeg`,
    thumbnail: `${urlPrefix}snow-5.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-6.jpeg`,
    thumbnail: `${urlPrefix}snow-6.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-7.jpeg`,
    thumbnail: `${urlPrefix}snow-7.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-8.jpeg`,
    thumbnail: `${urlPrefix}snow-8.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-9.jpeg`,
    thumbnail: `${urlPrefix}snow-9.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-10.jpeg`,
    thumbnail: `${urlPrefix}snow-10.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-11.jpeg`,
    thumbnail: `${urlPrefix}snow-11.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Looking out to Grizzly Peak. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}snow-12.jpeg`,
    thumbnail: `${urlPrefix}snow-12.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-13.jpeg`,
    thumbnail: `${urlPrefix}snow-13.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-14.jpeg`,
    thumbnail: `${urlPrefix}snow-14.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-15.jpeg`,
    thumbnail: `${urlPrefix}snow-15.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-16.jpeg`,
    thumbnail: `${urlPrefix}snow-16.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-17.jpeg`,
    thumbnail: `${urlPrefix}snow-17.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: `Mr. and Mrs. Czajkowski! 💞 ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}snow-18.jpeg`,
    thumbnail: `${urlPrefix}snow-18.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-19.jpeg`,
    thumbnail: `${urlPrefix}snow-19.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-20.jpeg`,
    thumbnail: `${urlPrefix}snow-20.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-21.jpeg`,
    thumbnail: `${urlPrefix}snow-21.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-22.jpeg`,
    thumbnail: `${urlPrefix}snow-22.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-23.jpeg`,
    thumbnail: `${urlPrefix}snow-23.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-24.jpeg`,
    thumbnail: `${urlPrefix}snow-24.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-25.jpeg`,
    thumbnail: `${urlPrefix}snow-25.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}snow-26.jpeg`,
    thumbnail: `${urlPrefix}snow-26.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}car-1.jpeg`,
    thumbnail: `${urlPrefix}car-1.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Back down at Loveland Pass. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}car-2.jpeg`,
    thumbnail: `${urlPrefix}car-2.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}driving-down.jpeg`,
    thumbnail: `${urlPrefix}driving-down.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: 225,
    caption: `Driving back down Loveland Pass. Photo by Kyle!`,
  },
  {
    src: `${urlPrefix}lake-1.jpeg`,
    thumbnail: `${urlPrefix}lake-1.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Taking a walk around Georgetown Lake with Otis. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}lake-2.jpeg`,
    thumbnail: `${urlPrefix}lake-2.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Taking a walk around Georgetown Lake with Otis. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}lake-3.jpeg`,
    thumbnail: `${urlPrefix}lake-3.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Taking a walk around Georgetown Lake with Otis. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}lake-4.jpeg`,
    thumbnail: `${urlPrefix}lake-4.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Taking a walk around Georgetown Lake with Otis. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}lake-5.jpeg`,
    thumbnail: `${urlPrefix}lake-5.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: `Taking a walk around Georgetown Lake with Otis. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}lake-6.jpeg`,
    thumbnail: `${urlPrefix}lake-6.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: `Taking a walk around Georgetown Lake with Otis. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}lake-7.jpeg`,
    thumbnail: `${urlPrefix}lake-7.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-8.jpeg`,
    thumbnail: `${urlPrefix}lake-8.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-9.jpeg`,
    thumbnail: `${urlPrefix}lake-9.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-10.jpeg`,
    thumbnail: `${urlPrefix}lake-10.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-11.jpeg`,
    thumbnail: `${urlPrefix}lake-11.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-12.jpeg`,
    thumbnail: `${urlPrefix}lake-12.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-13.jpeg`,
    thumbnail: `${urlPrefix}lake-13.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-14.jpeg`,
    thumbnail: `${urlPrefix}lake-14.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-15.jpeg`,
    thumbnail: `${urlPrefix}lake-15.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-16.jpeg`,
    thumbnail: `${urlPrefix}lake-16.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `Signing our marriage license. ${photographerCredits}`,
  },
  {
    src: `${urlPrefix}lake-17.jpeg`,
    thumbnail: `${urlPrefix}lake-17.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-18.jpeg`,
    thumbnail: `${urlPrefix}lake-18.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-19.jpeg`,
    thumbnail: `${urlPrefix}lake-19.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-20.jpeg`,
    thumbnail: `${urlPrefix}lake-20.jpeg`,
    thumbnailWidth: standardThumbnail.height,
    thumbnailHeight: standardThumbnail.length,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-21.jpeg`,
    thumbnail: `${urlPrefix}lake-21.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-22.jpeg`,
    thumbnail: `${urlPrefix}lake-22.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: photographerCredits,
  },
  {
    src: `${urlPrefix}lake-23.jpeg`,
    thumbnail: `${urlPrefix}lake-23.jpeg`,
    thumbnailWidth: standardThumbnail.length,
    thumbnailHeight: standardThumbnail.height,
    caption: `We eloped! 🥳 ${photographerCredits}`,
  },
]

export default AllPictures
