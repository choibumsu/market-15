import { TAG_NAME, CLASS_NAME, KEY_NAME } from '../utils/constants.js'
import Button from '../components/common/Button.js'
import api from '../apis/api.js'

const ERROR_CASES = {
  id: {
    empty: '아이디를 입력해주세요.',
    lengthOver: '아이디는 100자를 넘을 수 없습니다.',
  },
  password: {
    empty: '비밀번호를 입력해주세요.',
    lengthOver: '비밀번호는 100자를 넘을 수 없습니다.',
  },
  common: '아이디와 비밀번호를 확인 후 다시 로그인해주세요.',
  unexcepted: '예상치 못한 오류가 발생했습니다. 새로고침 후 로그인해주세요.',
}

export default function LoginPage(props) {
  if (new.target !== LoginPage) {
    return new LoginPage(props)
  }

  const { loginFormSelector } = props

  this.init = () => {
    this.$loginForm = document.querySelector(loginFormSelector)
    this.$saveIdCheckBox = this.$loginForm.querySelector('#is-save-id')
    this.$errorNode = this.$loginForm.querySelector('.error-message')

    const $idInput = this.$loginForm.querySelector('input[name=id]')
    const $passwordInput = $idInput.nextElementSibling
    this.$inputs = [$idInput, $passwordInput]

    this.$inputs.forEach(($input) => {
      $input.addEventListener('keyup', onSendLoginRequestHandler)
    })

    this.$errorNode = this.$loginForm.querySelector('.error-message')

    const $idInput = this.$loginForm.querySelector('input[name=id]')
    const $passwordInput = $idInput.nextElementSibling
    this.$inputs = [$idInput, $passwordInput]

    this.$inputs.forEach(($input) => {
      $input.addEventListener('keyup', onSendLoginRequestHandler)
    })

    const savedId = localStorage.getItem('id')
    if (savedId) {
      $idInput.value = savedId
      this.$saveIdCheckBox.checked = true
    }

    new Button({
      selector: '.woowa-btn',
      onClickHandler: (e) => onSendLoginRequestHandler(e),
    })
  }

  const checkError = () => {
    const errorMessages = this.$inputs.reduce((errorMessages, $input) => {
      const result = validateInput($input.value)
      if (result.isError) {
        errorMessages.push(ERROR_CASES[$input.name][result.code])
      }
      return errorMessages
    }, [])

    if (errorMessages.length > 0) {
      this.$loginForm.classList.add(CLASS_NAME.ERROR_CLASS)
      this.$errorNode.innerHTML = errorMessages[0]
      return true
    }

    return false
  }

  const onSendLoginRequestHandler = async (e) => {
    if (e.type === 'keyup' && e.key !== KEY_NAME.ENTER) {
      return
    }

    if (checkError()) return

    const inputValues = this.$inputs.reduce((inputValues, $input) => {
      inputValues[$input.name] = $input.value
      return inputValues
    }, {})
    const response = await api.requestLogin(inputValues)

    if (response.status === 200) {
      this.$loginForm.classList.remove(CLASS_NAME.ERROR_CLASS)
      window.location = `https://ceo.baemin.com/`

      if (this.$saveIdCheckBox.checked) {
        const data = await response.json()
        localStorage.setItem('id', data.id)
        return
      }

      localStorage.removeItem('id')
      return
    } else if (response.status === 404) {
      this.$loginForm.classList.add(CLASS_NAME.ERROR_CLASS)
      this.$errorNode.innerHTML = ERROR_CASES.common

      this.$inputs.forEach(($input) => {
        $input.value = ''
        if ($input.name === 'id') $input.focus()
      })
      return
    }

    this.$loginForm.classList.add(CLASS_NAME.ERROR_CLASS)
    this.$errorNode.innerHTML = ERROR_CASES.unexcepted
  }

  this.init()
}

function validateInput(value) {
  if (value.length > 100) {
    return {
      isError: true,
      code: 'lengthOver',
    }
  }

  if (value === '') {
    return {
      isError: true,
      code: 'empty',
    }
  }

  return {
    isError: false,
  }
}

try {
  new LoginPage({
    loginFormSelector: '.login-form',
  })
} catch (e) {
  console.error(e)
}
