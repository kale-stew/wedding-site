import { PuffLoader } from 'react-spinners'

const styles = `
  margin-top: 2rem;
`

const Loading = ({ color }) => (
  <PuffLoader size={150} css={styles} color={color ? color : '#6771a0'} />
)

export default Loading
