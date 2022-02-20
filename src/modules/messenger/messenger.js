/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { message } from '../../app';

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
    message.login = this.login; // прокинули login в message
    this.message = JSON.stringify({
      action: 'signIn',
      login: this.login,
    });
    this.ws.sendMessage(this.message);
  }
}
