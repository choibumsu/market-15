fetch('http://localhost:4000/user/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 'bumsu0211',
    password: 'qjatn7277',
  }),
})
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    console.log(res)
  })
