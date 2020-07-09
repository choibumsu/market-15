import { TAG_NAME, CLASS_NAME } from '../utils/constants.js'
import { verrifyInput } from '../utils/validation.js'

function JoinPage(props) {
  if (new.target !== JoinPage) {
    return new JoinPage(props)
  }
  const { essentialFormSelector, addressFormSelector } = props

  this.init = () => {
    this.$essentialForm = document.querySelector(essentialFormSelector)
    this.$addressForm = document.querySelector(addressFormSelector)
    this.$addressCheckInput = this.$addressForm.querySelector('#address-check')
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
        '.preview-wrapper'
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
      const $addressPreview = $addressForm.querySelector('.address-preview')

      $postalInput.value = postalCode
      $addressInput.value = address
      $addressDetailInput.value = ''
      $previewWrapper.classList.remove(CLASS_NAME.DISPLAY_NONE_CLASS)
      $addressPreview.innerHTML = data.jibunAddress

      console.log(data)
    },
  }).open()
}

try {
  new JoinPage({
    essentialFormSelector: '.essential-form',
    addressFormSelector: '.address-form',
  })
} catch (e) {
  console.error(e)
}
