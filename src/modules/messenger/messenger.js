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
    const messageText = target.querySelector('.messageInput').value; // получили текст сообщения
    const modifyTextMessage = this.checkMessageForLink(messageText);
    const dateMessage = `${new Date().toLocaleTimeString().slice(0, -3)} ${new Date().toLocaleDateString()}`;
    this.message = JSON.stringify({
      action: 'postMessage',
      login: this.login,
      message: modifyTextMessage,
      dateMessage,
    });
    this.ws.sendMessage(this.message);
    this.renderingMessage(modifyTextMessage, dateMessage, this.login);
    target.querySelector('.messageInput').value = '';
  }

  checkMessageForLink(messageText) { // проверяет сообщение на наличие ссылки
    // eslint-disable-next-line no-useless-escape
    const regexp = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/igm;
    const result = messageText.replace(regexp, (str) => `<a href = "${str}">${str}</a>`);
    if (result !== null) {
      return result;
    }
    return result;
  }

  renderingMessage(messageText, dateMessage, login) { // рендерит сообщение в окне мессенджера
    let userName = null;
    // eslint-disable-next-line no-unused-expressions
    login === this.login ? userName = 'You' : userName = login;
    const messageHTML = `
    <div class="message">
      <div class="messageData">${userName}, ${dateMessage}</div>
      <div class="messageText">
      ${messageText}
      </div>
    </div>`;
    const messagesContaner = document.querySelector('.messages');
    messagesContaner.innerHTML += messageHTML;
    if (login === this.login) messagesContaner.lastChild.classList.add('myMessage');
  }
}
