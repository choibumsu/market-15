import { CLASS_NAME } from './constants.js'

export const getSubNodes = (selector) => {
  const $target = document.querySelector(selector)
  const $inputWrapper = $target.closest(`.${CLASS_NAME.INPUT_WRAPPER}`)
  const $errorNode = $inputWrapper.querySelector(`.${CLASS_NAME.ERROR_MESSAGE}`)
  return {
    $target,
    $inputWrapper,
    $errorNode,
  }
}
