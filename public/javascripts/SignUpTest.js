;(function () {
  const $signupTestButton = document.querySelector('.test')
  $signupTestButton.addEventListener('click', () => {
    fetch('/user', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 'donguk',
        password: '1234',
        name: '홍동욱',
        phone: '01086690448',
        postalCode: 112,
        address: '우아한형제들 11층',
        addressDetail: '회의실',
        isAgree: true,
        isAgreeMarketing: false,
      }),
    })
  })
  const $getUserInfoTestButton = document.querySelector('.test2')
  $getUserInfoTestButton.addEventListener('click', async () => {
    const response = await fetch('/user/donguk')
    const result = await response.json()
    console.log('result', result)
  })
})()
