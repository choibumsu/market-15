import { TAG_NAME, CLASS_NAME, SELECT_VALUE } from '../utils/constants.js'
import { verrifyInput } from '../utils/validation.js'
import Timer from '../components/Timer.js'

function JoinPage(props) {
  if (new.target !== JoinPage) {
    return new JoinPage(props)
  }
  const { essentialFormSelector, selectEmailSelector, phoneSelector } = props

  this.init = () => {
    this.$essentialForm = document.querySelector(essentialFormSelector)
    this.$selectEmail = document.querySelector(selectEmailSelector)
    this.$phoneInput = document.querySelector(phoneSelector)
    this.$phoneButton = this.$phoneInput.nextElementSibling
    this.bindEvent()
  }

  this.bindEvent = () => {
    const onValidateInputHandler = async (e) => {
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
        if (e.target.name === 'phone') {
          e.target.nextElementSibling.classList.remove('active')
        }
        return
      }

      // 검증완료
      $inputWrapper.classList.remove(CLASS_NAME.ERROR_CLASS)
      if (e.target.name === 'id') {
        $inputWrapper.classList.add(CLASS_NAME.SUCCESS_CLASS)
      } // id input만 success message
      if (e.target.name === 'phone') {
        e.target.nextElementSibling.classList.add('active')
      }
    }

    const onChangeSelectTagHandler = ({ target }) => {
      const $emailSuffix = document.querySelector('input[name=emailSuffix]')
      if (target.value === SELECT_VALUE.SELF) {
        $emailSuffix.value = ''
        $emailSuffix.disabled = false
        return
      }
      $emailSuffix.disabled = true
      $emailSuffix.value = target.value
    }

    const onReplacePhoneHandler = (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    const onClickPhoneButton = (e) => {
      if (!e.target.classList.contains('active')) {
        return
      }
      const $timeInputWrapper = document.querySelector('.time-input-wrapper')
      const $inputWrraper = $timeInputWrapper.closest('.input-wrapper')
      if ($inputWrraper.classList.contains('dp-none')) {
        $inputWrraper.classList.remove('dp-none') // timer show
        e.target.textContent = '재전송'
        this.timer = new Timer({
          selector: '.time',
        })
        return
      }
      this.timer.setCount()
    }

    this.$essentialForm.addEventListener('focusout', onValidateInputHandler)
    this.$selectEmail.addEventListener('change', onChangeSelectTagHandler) // bind event to email input
    this.$phoneInput.addEventListener('keyup', onReplacePhoneHandler) // 숫자만 입력
    this.$phoneButton.addEventListener('click', onClickPhoneButton)
  }

  this.init()
}

try {
  new JoinPage({
    essentialFormSelector: '.essential-form',
    selectEmailSelector: '.selectEmail',
    phoneSelector: 'input[type=tel]',
  })
} catch (e) {
  console.error(e)
}
