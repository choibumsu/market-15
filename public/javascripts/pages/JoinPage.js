import {
  IdInput,
  PasswordInput,
  PasswordConfirmInput,
  NameInput,
  EmailPrefixInput,
  EmailSuffixInput,
  SelectEmail,
  PhoneInput,
  PhoneAuthInput,
} from '../components/join/index.js'
import { Timer } from '../components/common/index.js'
import { TAG_NAME, CLASS_NAME } from '../utils/constants.js'

function JoinPage(props) {
  if (new.target !== JoinPage) {
    return new JoinPage(props)
  }

  const { sectionOneSelector, addressFormSelector, termFormSelector } = props

  this.init = () => {
    this.formValue = {
      id: '',
      password: '',
      passwordConfirm: '',
      emailPrefix: '',
      emailSuffix: '',
      phone: '',
    }
    this.$essentialForm = document.querySelector(sectionOneSelector)
    this.$idInput = new IdInput({
      selector: 'input[name=id]',
      updateFormValue: this.setState,
    })
    this.$passwordInput = new PasswordInput({
      selector: 'input[name=password]',
      updateFormValue: this.setState,
    })
    this.$passwordConfirmInput = new PasswordConfirmInput({
      selector: 'input[name=passwordConfirm]',
      updateFormValue: this.setState,
      password: this.formValue.password,
    })
    this.$nameInput = new NameInput({
      selector: 'input[name=name]',
      updateFormValue: this.setState,
    })
    this.$emailPrefixInput = new EmailPrefixInput({
      selector: `input[name=emailPrefix]`,
      updateFormValue: this.setState,
    })
    this.$emailSuffixInput = new EmailSuffixInput({
      selector: `input[name=emailSuffix]`,
      updateFormValue: this.setState,
    })
    this.$selectEmail = new SelectEmail({
      selector: `.${CLASS_NAME.SELECT_EMAIL_CLASS}`,
      onChangeSelectTag: this.onChangeSelectTag,
    })
    this.$phoneInput = new PhoneInput({
      selector: 'input[name=phone]',
      updateFormValue: this.setState,
      displayPhoneAuthInput: this.displayPhoneAuthInput,
    })
    this.timer = new Timer({ selector: '.time' })

    this.$phoneAuthInput = new PhoneAuthInput({
      selector: 'input[name=phoneAuth]',
      updateFormValue: this.setState,
      stopTimer: this.timer.deleteCount,
    })
    this.$addressForm = document.querySelector(addressFormSelector)
    this.$addressCheckInput = this.$addressForm.querySelector('#address-check')
    this.$termForm = document.querySelector(termFormSelector)
    this.$terms = {
      all: this.$termForm.querySelector('input[name=all]'),
      essential: this.$termForm.querySelector('input[name=essential]'),
      optional: this.$termForm.querySelector('input[name=optional]'),
    }
   
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$essentialForm.addEventListener('focusout', (e) => {
      if (e.target.tagName !== TAG_NAME.INPUT) {
        return
      }
      this[e.target.dataset.type].validate()
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

    // 선택 정보 입력 활성화 이벤트 등록
    this.$addressCheckInput.addEventListener('change', (e) => {
      const isChecked = e.target.checked
      const $addressSearchBtn = this.$addressForm.querySelector(
        '.address-search-btn'
      )
      const $addressDetailInput = this.$addressForm.querySelector(
        'input[name=address-detail]'
      )

      if (isChecked) {
        $addressSearchBtn.classList.add(CLASS_NAME.ACTIVE_CLASS)
        $addressDetailInput.disabled = false
        return
      }

      const $postalInput = this.$addressForm.querySelector('input[name=postal]')
      const $addressInput = this.$addressForm.querySelector(
        'input[name=address]'
      )
      const $previewWrapper = this.$addressForm.querySelector(
        '.preview-wrapper햣'
      )

      $postalInput.value = ''
      $addressInput.value = ''
      $previewWrapper.classList.add(CLASS_NAME.DISPLAY_NONE_CLASS)
      $addressSearchBtn.classList.remove(CLASS_NAME.ACTIVE_CLASS)
      $addressDetailInput.disabled = true
      $addressDetailInput.value = ''
    })

    // 주소 api 호출
    const $addressSearchBtn = this.$addressForm.querySelector(
      '.address-search-btn'
    )
    $addressSearchBtn.addEventListener('click', async (e) => {
      if (this.$addressCheckInput.checked) searchAddress(this.$addressForm)
    })

    // 상세주소를 지번주소에 추가하기
    const $addressDetailInput = this.$addressForm.querySelector(
      'input[name=address-detail]'
    )
    console.log($addressDetailInput)
    $addressDetailInput.addEventListener('input', (e) => {
      console.log(e.target.value)
      const $deatilAddressPreview = this.$addressForm.querySelector(
        '.address-preview .detail'
      )
      $deatilAddressPreview.innerHTML = ' ' + e.target.value
    })
  }

  this.setState = (key, value) => {
    this.formValue = { ...this.formValue, [key]: value }
    console.log(this.formValue)
    if (key === 'password') {
      this.$passwordConfirmInput.setState(value)
    } // 비밀번호와 비밀번호 확인이 같은지 체크하기 위해 update
  }

  this.onChangeSelectTag = ({ target }) => {
    this.$emailSuffixInput.setState(target.value)
  }

  this.displayPhoneAuthInput = () => {
    alert(
      '인증번호를 발송했습니다.\n 휴대폰 SMS 발송된 인증번호를 확인해 주세요.'
    )
    if (this.timer.interval) {
      this.timer.deleteCount()
    }
    this.timer.setCount()
    this.$phoneAuthInput.render()
  }

  this.init()
}

const searchAddress = ($addressForm) => {
  new daum.Postcode({
    component: '',
    oncomplete: (data) => {
      const postalCode = data.zonecode
      const address =
        data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress

      const $postalInput = $addressForm.querySelector('input[name=postal]')
      const $addressInput = $addressForm.querySelector('input[name=address]')
      const $addressDetailInput = $addressForm.querySelector(
        'input[name=address-detail]'
      )
      const $previewWrapper = $addressForm.querySelector('.preview-wrapper')
      const $preAddressPreview = $addressForm.querySelector(
        '.address-preview .pre'
      )

      $postalInput.value = postalCode
      $addressInput.value = address
      $addressDetailInput.value = ''
      $previewWrapper.classList.remove(CLASS_NAME.DISPLAY_NONE_CLASS)
      $preAddressPreview.innerHTML = data.jibunAddress || data.autoJibunAddress

      console.log(data)
    },
  }).open()
}

try {
  new JoinPage({ 
    sectionOneSelector: '.essential-form', 
    termFormSelector: '.term-form', 
    addressFormSelector: '.address-form',
  })
} catch (e) {
  console.error(e)
}
