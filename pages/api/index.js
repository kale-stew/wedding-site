/**
 * Any calls to '/api' will hit this route
 */
export default async (req, res) => {
  res.json({ message: "hello from '/'" })
}
