const regEx = {
  english: /[A-Za-z]/,
  number: /[0-9]/,
  name: /^[a-zA-Z가-힣]{2,30}$/,
  id: /^[0-9a-zA-Z-_]{3,20}$/,
  password: /[0-9a-zA-Z]{8,20}/,
  phone: /^01([016789]?)([0-9]{3,4})([0-9]{4})$/,
  phoneAuth: /[0-9]{6}$/,
  tel: /^[0-9]{8,11}$/,
}

export const isEmpty = (value) =>
  value === undefined || value === null || value === ''
export const checkHasEnglish = (value) => !regEx.english.test(value)
export const checkHasNumber = (value) => !regEx.number.test(value)

export const checkId = (value) => !regEx.id.test(value)
export const checkPassword = (value) => !regEx.password.test(value)
export const checkName = (value) => !regEx.name.test(value)

// email
export const isEmailEmpty = (value) =>
  isEmpty(value) ? '이메일을 확인해주세요.' : undefined

// phone
export const isPhoneEmpty = (value) =>
  isEmpty(value) ? '휴대전화번호를 입력해주세요.' : undefined

export const checkPhone = (value) =>
  !regEx.phone.test(value) ? '유효하지 않은 휴대전화번호입니다.' : undefined

// phoneAuth
export const isPhoneAuthEmpty = (value) =>
  isEmpty(value) ? '인증번호를 입력해주세요.' : undefined

export const checkPhoneAuth = (value) =>
  !regEx.phoneAuth.test(value) ? '인증번호를 확인해주세요.' : undefined
