const isEmpty = (value) => value === undefined || value === null || value === ''

const regEx = {
  english: /[A-Za-z]/,
  number: /[0-9]/,
  name: /^[a-zA-Z가-힣]{2,30}$/,
  id: /^[0-9a-zA-Z-_]{3,20}$/,
  password: /[0-9a-zA-Z]{8,20}/,
  phone: /^01([016789]?)([0-9]{3,4})([0-9]{4})$/,
  tel: /^[0-9]{8,11}$/,
}

export const integer = (value) =>
  !Number.isInteger(Number(value)) ? '정수가 아닙니다.' : undefined

export const checkHasEnglish = (value) =>
  !regEx.english.test(value) ? '영문이 하나 이상 포함되어야 합니다.' : undefined

export const checkHasNumber = (value) =>
  !regEx.number.test(value) ? '숫자가 하나 이상 포함되어야 합니다.' : undefined

// id
export const isNameEmpty = (value) =>
  isEmpty(value) ? '아이디를 입력해 주세요.' : undefined

export const checkName = (value) =>
  !regEx.id.test(value) ? '유효하지 않은 아이디입니다.' : undefined

// password
export const isPasswordEmpty = (value) =>
  isEmpty(value) ? '비밀번호를 입력해 주세요.' : undefined

export const checkPassword = (value) =>
  !regEx.password.test(value)
    ? '비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.'
    : undefined

// passwordConfirm
export const isPasswordConfirmEmpty = (value) =>
  isEmpty(value) ? '비밀번호 확인을 입력해 주세요.' : undefined

export const phone = (value) =>
  !regEx.phone.test(value) ? '유효하지 않은 휴대전화번호입니다.' : undefined

export const required = (elementName, value) => {
  if (!isEmpty(value)) {
    return undefined
  }
  const errorMessage = {
    id: '아이디를 입력해 주세요.',
    password: '비밀번호를 입력해 주세요.',
    passwordConfirm: '비밀번호 확인을 위해 한번 더 입력해 주세요.',
    emailPrefix: '이메일 주소를 입력해 주세요.',
    emailSuffix: '이메일 주소를 입력해 주세요.',
    name: '이름을 입력해 주세요.',
    phone: '휴대폰 번호를 입력해 주세요.',
  }
  return errorMessage[elementName]
}
export const tel = (value) =>
  isEmpty(value) || !regEx.tel.test(value)
    ? '유효하지 않은 전화번호입니다.'
    : undefined
