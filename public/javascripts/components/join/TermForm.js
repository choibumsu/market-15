import { TAG_NAME } from '../../utils/constants.js'

export default function TermForm({ selector }) {
  if (new.target !== TermForm) {
    return new TermForm({ selector })
  }

  this.init = () => {
    this.$termForm = document.querySelector(selector)
    this.$terms = {
      all: this.$termForm.querySelector('input[name=all]'),
      essential: this.$termForm.querySelector('input[name=essential]'),
      optional: this.$termForm.querySelector('input[name=optional]'),
    }

    this.bindEvent()
  }

  this.bindEvent = () => {
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
