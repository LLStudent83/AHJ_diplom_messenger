/* eslint-disable no-console */

// eslint-disable-next-line import/no-cycle
import { message } from '../../app';

export default class Ws {
  constructor(popUp) {
    this.popUp = popUp;
    if (!this.ws) {
      this.ws = new WebSocket('ws://localhost:8080'); // wss://ahj-diplom-messenger-server.herokuapp.com/
      this.addEventListener();
    }
  }

  addEventListener() {
    this.ws.addEventListener('open', () => { console.log('WS соединенеие установлено'); });
    this.ws.addEventListener('close', () => { console.log('WS соединенеие закрыто!!!!!!!!!!'); });

    this.ws.addEventListener('message', (e) => {
      this.handlerMessage(e);
    });
    this.ws.addEventListener('error', (e) => {
      this.handlerErrorWS(e);
    });
  }

  sendMessage(_message) { // логика отправки сообщения на сервер
    if (this.ws.readyState === WebSocket.OPEN) { this.ws.send(_message); }
    this.login = JSON.parse(_message).login;// прокинул имя пользователя в ws
  }

  handlerMessage(e) { // обрабатывает входящие сообщения
    const { action, response } = JSON.parse(e.data);
    const {
      activeUsers, allMessages, status, login,
    } = response;
    if (action === 'signIn' && this.login) {
      if (status === 'ok') {
        this.popUp.closepopUp();
        this.popUp.openMessenger(activeUsers, this.login, allMessages);
      } else {
        document.querySelector('.form_inputNickName').value = '';
        // eslint-disable-next-line no-alert
        alert('Пользователь с таким именем в чате уже зарегистрирован');
      }
    }
    if (action === 'postMessage') { // обработка поступившего с сервера сообщения
      if (login === this.login) return;

      message.printMessage(response, 'toTheEnd');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handlerErrorWS(e) {
    // eslint-disable-next-line no-console
    console.log('Произошла ошибка WS', e);
  }
}
