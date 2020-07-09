import { TAG_NAME, CLASS_NAME } from '../utils/constants.js'
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
}

export default function LoginPage(props) {
  if (new.target !== LoginPage) {
    return new LoginPage(props)
  }

  const { loginFormSelector } = props

  this.init = () => {
    this.$loginForm = document.querySelector(loginFormSelector)
    this.$errorNode = this.$loginForm.querySelector('.error-message')

    new Button({
      selector: '.woowa-btn',
      onClickHandler: () => this.sendLoginRequest(),
    })
  }

  this.sendLoginRequest = () => {
    const $inputs = Array.from(
      this.$loginForm.querySelectorAll('input[name=id], input[name=password]')
    )
    const inputValues = {}

    const errorMessages = $inputs.reduce((errorMessages, $input) => {
      inputValues[$input.name] = $input.value

      const result = validateInput($input.value)
      if (result.isError) {
        errorMessages.push(ERROR_CASES[$input.name][result.code])
      }
      return errorMessages
    }, [])

    if (errorMessages.length > 0) {
      this.$loginForm.classList.add(CLASS_NAME.ERROR_CLASS)
      this.$errorNode.innerHTML = errorMessages[0]
      return
    }

    this.$loginForm.classList.remove(CLASS_NAME.ERROR_CLASS)
    api.requestLogin(inputValues).then((data) => data.status)
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
