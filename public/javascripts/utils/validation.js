import api from '../apis/api.js'
import {
  isNameEmpty,
  checkEnglishInName,
  checkName,
  isPasswordEmpty,
  checkPassword,
} from './regex.js'

const inputInfos = {
  id: [isNameEmpty, checkEnglishInName, checkName, validateIdDuplication],
  password: [isPasswordEmpty, checkPassword],
}

// id validation
async function validateIdDuplication(id) {
  const result = await api.checkIdDuplication(id)
  if (status === 409) {
    return '이미 사용중인 아이디 입니다. 다른 아이디를 입력해 주세요.'
  }
  return undefined
}

// common
export const verrifyInput = async (name, value) => {
  const errors = []
  const validationMethods = inputInfos[name]
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
