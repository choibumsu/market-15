import api from '../apis/api.js'
import {
  isIdEmpty,
  checkId,
  checkHasEnglish,
  checkHasNumber,
  isPasswordEmpty,
  checkPassword,
  isPasswordConfirmEmpty,
  isNameEmpty,
  checkMinNameLength,
  checkName,
  isEmailEmpty,
  isPhoneEmpty,
  checkPhone,
  isPhoneAuthEmpty,
  checkPhoneAuth,
} from './regex.js'

const checkMethods = {
  id: [isIdEmpty, checkHasEnglish, checkId, validateIdDuplication],
  password: [isPasswordEmpty, checkHasEnglish, checkHasNumber, checkPassword],
  passwordConfirm: [
    isPasswordConfirmEmpty,
    checkHasEnglish,
    checkHasNumber,
    checkIsSameWithPassword,
  ],
  name: [isNameEmpty, checkMinNameLength, checkName],
  emailPrefix: [isEmailEmpty],
  emailSuffix: [isEmailEmpty],
  phone: [isPhoneEmpty, checkPhone],
  phoneAuth: [isPhoneAuthEmpty, checkPhoneAuth],
}

// id validation
async function validateIdDuplication(id) {
  const { status } = await api.checkIdDuplication(id)
  if (status === 409) {
    return '이미 사용중인 아이디 입니다. 다른 아이디를 입력해 주세요.'
  }
  return undefined
}

// pw
function checkIsSameWithPassword(passwordConfirmValue) {
  const $passwordInput = document.querySelector('input[name=password]')
  if (!$passwordInput) {
    return '비밀번호를 먼저 입력해주세요.'
  }
  if ($passwordInput.value !== passwordConfirmValue) {
    return '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
  }
  return undefined
}

// common
export const verrifyInput = async (name, value) => {
  const errors = []
  const validationMethods = checkMethods[name]
  await Promise.all(
    validationMethods.map(async (method) => {
      let errorMessage = method(value)
      if (errorMessage instanceof Promise) {
        // validate이 API 요청이면
        errorMessage = await Promise.resolve(errorMessage)
      }
      if (!errorMessage) {
        return
      }
      errors.push(errorMessage)
    })
  )
  if (errors.length > 0) {
    return { hasError: true, errorMessage: errors[0] }
  }
  return { hasError: false }
} // 마지막에 재사용하려면 에러 여부와, 에러메시지를 리턴하는게 좋을듯
