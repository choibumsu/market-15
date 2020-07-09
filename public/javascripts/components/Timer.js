function getMinute(minutes) {
  return `0${Math.floor(minutes / 60)}`
}

function getSeconds(minutes) {
  const remain = minutes % 60
  if (remain < 10) {
    return `0${remain}`
  }
  return remain
}

export default function Timer(props) {
  if (new.target !== Timer) {
    return new Timer(props)
  }
  const { selector } = props

  this.init = () => {
    this.initCount = 120 // 2분
    this.$target = document.querySelector(selector)
    this.setCount()
  }

  this.setCount = () => {
    this.initCount = 121
    if (this.countPerSeconds) {
      this.deleteCount()
    }

    this.countPerSeconds = setInterval(() => {
      if (this.initCount > 0) {
        this.initCount -= 1
      }
      this.$target.innerHTML = `${getMinute(this.initCount)}:${getSeconds(
        this.initCount
      )}`
    }, 1000)
  }

  this.deleteCount = () => {
    clearInterval(this.countPerSeconds)
  }

  this.init()
}
