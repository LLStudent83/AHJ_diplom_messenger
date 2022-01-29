/* eslint-disable class-methods-use-this */

export default class Messenger {
  constructor(popUp, ws) {
    this.popUp = popUp;
    this.ws = ws;
    this.container = document.getElementsByClassName('container');
    this.init();
  }

  async init() {
    this.popUp.renderingPopUpStart();
  }

  signIn(event) { // формируем и отправляем запрос на сервер на регистрацию
    const { currentTarget } = event;
    this.login = currentTarget.querySelector('.form_inputNickName').value;
    this.message = JSON.stringify({
      action: 'signIn',
      login: this.login,
    });
    this.ws.sendMessage(this.message);
  }

  createMessage(e) {
    const { target } = e;
    const mesageText = target.querySelector('.messageInput').value;
    const dateMessage = `${new Date().toLocaleTimeString().slice(0, -3)} ${new Date().toLocaleDateString()}`;
    this.message = JSON.stringify({
      action: 'postMessage',
      login: this.login,
      message: mesageText,
      dateMessage,
    });
    this.ws.sendMessage(this.message);
    this.renderingMessage(mesageText, dateMessage, this.login);
    target.querySelector('.messageInput').value = '';
  }

  renderingMessage(mesageText, dateMessage, login) {
    let userName = null;
    // eslint-disable-next-line no-unused-expressions
    login === this.login ? userName = 'You' : userName = login;
    const messageHTML = `
    <div class="message">
      <div class="messageData">${userName}, ${dateMessage}</div>
      <div class="messageText">
      ${mesageText}
      </div>
    </div>`;
    const messagesContaner = document.querySelector('.messages');
    messagesContaner.innerHTML += messageHTML;
    if (login === this.login) messagesContaner.lastChild.classList.add('myMessage');
  }
}
