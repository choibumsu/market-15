export default function LoginContainer() {
  if (new.target !== LoginContainer) {
    return new LoginContainer()
  }

  this.init = () => {}
  this.init()
}
