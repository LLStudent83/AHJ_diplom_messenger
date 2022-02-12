/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable camelcase */

// eslint-disable-next-line import/no-cycle
import { message } from '../../app';

/* eslint-disable class-methods-use-this */
export default class Ws {
  constructor(pop_Up) {
    this.pop_Up = pop_Up;
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

    if (action === 'signIn' && this.login) {
      if (response.status === 'ok') {
        this.pop_Up.closepopUp();
        this.pop_Up.openMessenger(response.activeUsers, this.login, response.allMessages);
      } else {
        document.querySelector('.form_inputNickName').value = '';
        // eslint-disable-next-line no-alert
        alert('Пользователь с таким именем в чате уже зарегистрирован');
      }
    }
    if (action === 'postMessage') { // обработка поступившего с сервера сообщения
      if (response.login === this.login) return;
      if (response.typeMes === 'text') message.createTextMessage(response.message, response.coordinates, response.login, response.dateMessage);
      if (response.typeMes === 'audioRecord') message.createAudioMessage(response.message, response.coordinates, response.login, response.dateMessage);
      if (response.typeMes === 'image'
      || response.typeMes === 'audio'
      || response.typeMes === 'video') message.createFileMessage(response.message, response.coordinates, response.login, response.dateMessage, response.typeMes, response.filesName);
    } // createFileMessage(arrURLBase64, this.coordString, this.ws.login, dataMes, typeFileName, this.popUpAddFile.filesName);
  }
  // action: 'postMessage',
  // login: this.ws.login,
  // message: arrURLBase64, // закодированные в строку двоичные данные
  // dateMessage: dataMes,
  // coordinates: this.coordString,
  // typeMes: typeFileName, // image, audio или video
  // filesName: this.popUpAddFile.filesName,

  handlerErrorWS(e) {
    // eslint-disable-next-line no-console
    console.log('Произошла ошибка WS', e);
  }
}
