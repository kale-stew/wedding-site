import { fetchAllGuests } from '../utils/notion'
const Test = ({ guestList }) => {
  console.log('HELLOOOO', guestList)
  return <div>Testing</div>
}
export async function getStaticProps() {
  const guestList = await fetchAllGuests()
  return {
    props: {
      guestList,
    },
  }
}
export default Test
