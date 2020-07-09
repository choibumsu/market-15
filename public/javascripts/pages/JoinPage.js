import { TAG_NAME, CLASS_NAME, SELECT_VALUE } from '../utils/constants.js'
import { verrifyInput } from '../utils/validation.js'

function JoinPage(props) {
  if (new.target !== JoinPage) {
    return new JoinPage(props)
  }
  const { essentialFormSelector, selectEmailSelector } = props

  this.init = () => {
    this.$essentialForm = document.querySelector(essentialFormSelector)
    this.$selectEmail = document.querySelector(selectEmailSelector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$selectEmail.addEventListener('change', ({ target }) => {
      const $emailSuffix = document.querySelector('input[name=emailSuffix]')
      if (target.value === SELECT_VALUE.SELF) {
        $emailSuffix.disabled = false
        return
      }
      $emailSuffix.disabled = true
      $emailSuffix.value = target.value
    }) // bind event to email input

    this.$essentialForm.addEventListener('focusout', async (e) => {
      if (e.target.tagName !== TAG_NAME.INPUT) {
        return
      }
      const { name, value } = e.target
      const result = await verrifyInput(name, value)
      const $inputWrapper = e.target.closest('.input-wrapper')
      if (result.hasError) {
        $inputWrapper.classList.remove(CLASS_NAME.SUCCESS_CLASS)
        $inputWrapper.classList.add(CLASS_NAME.ERROR_CLASS)
        const $errorNode = $inputWrapper.querySelector('.error-message')
        $errorNode.innerHTML = result.errorMessage
        return
      }
      $inputWrapper.classList.remove(CLASS_NAME.ERROR_CLASS)
      if (e.target.name === 'id') {
        $inputWrapper.classList.add(CLASS_NAME.SUCCESS_CLASS)
      } // id input만 success message
    })
  }

  this.init()
}

try {
  new JoinPage({
    essentialFormSelector: '.essential-form',
    selectEmailSelector: '.selectEmail',
  })
} catch (e) {
  console.error(e)
}
