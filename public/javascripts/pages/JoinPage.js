import { TAG_NAME, CLASS_NAME } from '../utils/constants.js'
import { verrifyInput } from '../utils/validation.js'

function JoinPage(props) {
  if (new.target !== JoinPage) {
    return new JoinPage(props)
  }
  const { essentialFormSelector, termFormSelector } = props

  this.init = () => {
    this.$essentialForm = document.querySelector(essentialFormSelector)

    this.$termForm = document.querySelector(termFormSelector)
    this.$terms = {
      all: this.$termForm.querySelector('input[name=all]'),
      essential: this.$termForm.querySelector('input[name=essential]'),
      optional: this.$termForm.querySelector('input[name=optional]'),
    }
    this.bindEvent()
  }

  this.bindEvent = () => {
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

    this.$termForm.addEventListener('change', async (e) => {
      if (e.target.tagName !== TAG_NAME.INPUT) {
        return
      }

      const { name } = e.target
      const termKeys = Object.keys(this.$terms)

      if (name === 'all') {
        termKeys.forEach(
          (key) => (this.$terms[key].checked = this.$terms.all.checked)
        )
      }

      this.$terms.all.checked = termKeys.reduce((isAllChekced, key) => {
        if (key !== 'all')
          isAllChekced = isAllChekced && this.$terms[key].checked
        return isAllChekced
      })
    })
  }

  this.init()
}

try {
  new JoinPage({
    essentialFormSelector: '.essential-form',
    termFormSelector: '.term-form',
  })
} catch (e) {
  console.error(e)
}
