import { TAG_NAME, CLASS_NAME, SELECT_VALUE } from '../utils/constants.js'
import { verrifyInput } from '../utils/validation.js'
import Timer from '../components/Timer.js'

function JoinPage(props) {
  if (new.target !== JoinPage) {
    return new JoinPage(props)
  }
  const {
    essentialFormSelector,
    selectEmailSelector,
    phoneSelector,
    phoneAuhSelector,
    timerInputWrapperSelector,
  } = props

  this.init = () => {
    this.$essentialForm = document.querySelector(essentialFormSelector)
    this.$selectEmail = document.querySelector(selectEmailSelector)
    this.$phoneInput = document.querySelector(phoneSelector)
    this.$phoneAuthInput = document.querySelector(phoneAuhSelector)
    this.$phoneButton = this.$phoneInput.nextElementSibling
    this.$phoneAuthButton = document.querySelector(
      timerInputWrapperSelector
    ).nextElementSibling
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
      if (!e.target.classList.contains(CLASS_NAME.ACTIVE_CLASS)) {
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
      this.timer.setCount() // timer 처음부터 다시 시작.
    }

    const onClickPhoneAuthHandler = (e) => {
      const $inputWrapper = e.target.closest('.input-wrapper')
      if (this.$phoneAuthInput.value !== '123456') {
        // 123456 임시비밀번호
        $inputWrapper.classList.add(CLASS_NAME.ERROR_CLASS)
        const $errorDiv = this.$phoneAuthButton.nextElementSibling
        $errorDiv.innerHTML = '인증번호가 올바르지 않습니다.'
        return
      }
      $inputWrapper.classList.remove(CLASS_NAME.ERROR_CLASS)
      this.timer.deleteCount()
      $inputWrapper.classList.add('dp-none') // 인증 인풋 dp none
      this.$phoneInput.disabled = true // input disable
      this.$phoneButton.classList.remove('active')
      this.$phoneButton.innerHTML = '인증완료'
    }

    this.$essentialForm.addEventListener('focusout', onValidateInputHandler)
    this.$selectEmail.addEventListener('change', onChangeSelectTagHandler) // bind event to email input
    this.$phoneInput.addEventListener('keyup', onReplacePhoneHandler) // 숫자만 입력
    // this.$phoneInput.addEventListener('keyup', onChangePhoneInputHandler) // 휴대폰 정규식 통과하면 버튼 active
    this.$phoneButton.addEventListener('click', onClickPhoneButton)
    this.$phoneAuthInput.addEventListener('keyup', onReplacePhoneHandler)
    this.$phoneAuthButton.addEventListener('click', onClickPhoneAuthHandler)
  }

  this.init()
}

try {
  new JoinPage({
    essentialFormSelector: '.essential-form',
    selectEmailSelector: '.selectEmail',
    phoneSelector: 'input[name=phone]',
    phoneAuhSelector: 'input[name=phoneAuth]',
    timerInputWrapperSelector: '.time-input-wrapper',
  })
} catch (e) {
  console.error(e)
}
