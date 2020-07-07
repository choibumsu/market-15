exports.getUserController = (req, res) => {
  const userInfo = {
    id: 'admin',
    name: 'donguk',
  }
  res.status(200).json(userInfo)
}
