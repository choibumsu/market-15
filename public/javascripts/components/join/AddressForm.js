import { CLASS_NAME, TAG_NAME } from '../../utils/constants.js'

export default function AddressForm({ selector }) {
  if (new.target !== AddressForm) {
    return new AddressForm({ selector })
  }

  this.init = () => {
    this.$addressForm = document.querySelector(selector)
    this.$addressCheckInput = this.$addressForm.querySelector('#address-check')
    this.$addressSearchBtn = this.$addressForm.querySelector(
      '.address-search-btn'
    )
    this.$postalInput = this.$addressForm.querySelector('input[name=postal]')
    this.$addressInput = this.$addressForm.querySelector('input[name=address]')
    this.$addressDetailInput = this.$addressForm.querySelector(
      'input[name=address-detail]'
    )

    this.$previewWrapper = this.$addressForm.querySelector('.preview-wrapper')
    this.$prePreview = this.$previewWrapper.querySelector('.pre')
    this.$deatilPreview = this.$previewWrapper.querySelector('.detail')

    this.bindEvent()
  }

  this.bindEvent = () => {
    // 선택 정보 입력 활성화 이벤트 등록
    this.$addressCheckInput.addEventListener('change', (e) => {
      this.changeAddressCheckbox(e)
    })

    // 주소 api 호출
    this.$addressSearchBtn.addEventListener('click', () => {
      if (this.$addressCheckInput.checked) this.searchAddress()
    })

    // 상세주소를 지번주소에 추가하기
    this.$addressDetailInput.addEventListener('input', (e) => {
      this.$deatilPreview.innerHTML = ' ' + e.target.value
    })
  }

  this.changeAddressCheckbox = (e) => {
    if (e.target.checked) {
      this.$addressSearchBtn.classList.add(CLASS_NAME.ACTIVE_CLASS)
      this.$addressDetailInput.disabled = false
      return
    }

    this.$postalInput.value = ''
    this.$addressInput.value = ''
    this.$previewWrapper.classList.add(CLASS_NAME.DISPLAY_NONE_CLASS)
    this.$addressSearchBtn.classList.remove(CLASS_NAME.ACTIVE_CLASS)
    this.$addressDetailInput.disabled = true
    this.$addressDetailInput.value = ''
  }

  this.searchAddress = () => {
    new daum.Postcode({
      this: this,
      oncomplete: (data) => {
        const postalCode = data.zonecode
        const address =
          data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress
        const jibunAddress = data.jibunAddress || data.autoJibunAddress

        this.$postalInput.value = postalCode
        this.$addressInput.value = address
        this.$addressDetailInput.value = ''
        this.$previewWrapper.classList.remove(CLASS_NAME.DISPLAY_NONE_CLASS)
        this.$prePreview.innerHTML = jibunAddress
      },
    }).open()
  }

  this.init()
}
