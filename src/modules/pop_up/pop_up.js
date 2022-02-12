/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
// import createRequest from '../http/createRequest';
// eslint-disable-next-line import/no-cycle
import { messenger, inputForm, message } from '../../app';

export default class PopUp {
  constructor(container) {
    if (typeof container === 'string') {
      this.container = document.querySelector('.container');
    } else this.container = container;
  }

  getHTMLPopUpStart() { // возвращает html разметку стартового окна
    const HTML = `
        <form class="form choosePseudonym" action="">
          <h1 class="form_Name">Выберите псевдоним</h1>
          <p>
          <textarea class="form_input form_inputNickName" type="text" id="content" name='NickName'></textarea>
          </p>
          <footer class="form_footer">
            <button type="button" class="form_continue button">Продолжить</button>
          </footer>
        </form>
    `;
    return HTML;
  }

  renderingPopUpStart() { // отрисовывает окно регистрации и ставит обработчик 'klick'
    const containerForm = document.createElement('div');
    containerForm.className = 'popup';
    this.container.append(containerForm);
    containerForm.innerHTML = this.getHTMLPopUpStart();
    const forma = containerForm.querySelector('.form');
    forma.addEventListener('click', (event) => {
      // event.preventDefault();
      this.onClickPopUp(event);
    });
  }

  getHTMLMessenger() { // возвращает html разметку окна мессенджера
    const HTML = `  
      <div class="activeUsers">
        <ul class="usersList"></ul>
      </div>
      <form class="form messengerWindow" action="">
        <div class ="messages"></div>
        <footer class="form_footer">
        <textarea class="messageInput dropzone" type="text" placeholder="Введите сообщение и нажмите Enter
        или перетащите файл" name='messageText'></textarea>
          <div class="input__wrapper">
            <input name="file" type="file" id="input__file" class="input input__file" accept="image/png, image/jpeg, audio/mpeg, video/mp4, video/mpeg">
            <label for="input__file" class="input__file-button buttonForm"></label>
          </div>
        <input class="postAudioRecording buttonForm" type="button"/>
        </footer>
      </form>`;
    return HTML;
  }

  renderingMessenger() { // рендерит окно мессенджера
    this.container.innerHTML = this.getHTMLMessenger();
  }

  openMessenger(activeUsers, userName, messages = []) { // срабатывает при входе в мессенджер. Рендерит подключенных пользователей и список сообщений
    this.renderingMessenger();
    this.usersList = document.querySelector('.usersList');
    activeUsers.forEach((user) => {
      let html = null;
      if (user !== userName) {
        html = `<li class="user">${user}</li>`;
      } else {
        html = '<li class="user userYou" >You</li>';
      }
      this.usersList.innerHTML += html;
    });
    this.inputForm = document.querySelector('.messageInput');

    this.addFileInput = document.querySelector('.input__file');
    this.form = document.querySelector('.form');
    this.form.addEventListener('click', (e) => { // обработаем клин на форме !!!!
      inputForm.eventHandler(e);
    });
    this.inputForm.addEventListener('keydown', (e) => inputForm.eventHandler(e));
    this.inputForm.addEventListener('drop', (e) => {
      e.preventDefault();
      this.inputForm.style.borderWidth = '1px';
      const { files } = e.dataTransfer;
      inputForm.createMessageFile(files);
    });
    this.inputForm.addEventListener('dragenter', () => {
      this.inputForm.style.borderWidth = '2px';
    });
    this.inputForm.addEventListener('dragleave', () => {
      this.inputForm.style.borderWidth = '1px';
    });

    this.addFileInput.addEventListener('change', () => {
      const addFileInput = document.querySelector('.input__file');
      const { files } = addFileInput;
      inputForm.createMessageFile(files);
    });
    if (messages.length === 0) return;
    for (const item of messages) {
      const {
        login, dateMessage, coordinates, typeMes, filesName,
      } = item;
      const messageCont = item.message;
      if (typeMes === 'text') message.createTextMessage(messageCont, coordinates, login, dateMessage);
      if (typeMes === 'audioRecord') message.createAudioMessage(messageCont, coordinates, login, dateMessage);
      if (typeMes === 'image'
      || typeMes === 'audio'
      || typeMes === 'video') message.createFileMessage(messageCont, coordinates, login, dateMessage, typeMes, filesName);
    }
  }

  onClickPopUp(event) { // обрабатывает клик по кнопке входа в форме регистрации
    const { target } = event;
    if (target.classList.contains('form_continue')) messenger.signIn(event);
  }

  closepopUp() {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
  }
}
