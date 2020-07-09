import api from '../apis/api.js'
import {
  isEmailEmpty,
  isPhoneEmpty,
  checkPhone,
  isPhoneAuthEmpty,
  checkPhoneAuth,
} from './regex.js'

const checkMethods = {
  emailPrefix: [isEmailEmpty],
  emailSuffix: [isEmailEmpty],
  phone: [isPhoneEmpty, checkPhone],
  phoneAuth: [isPhoneAuthEmpty, checkPhoneAuth],
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
