// import { messenger, inputForm, message } from '../../app';

export default class PopUpAddFile {
  constructor() {
    this.container = document.getElementsByClassName('container');
  }

  // eslint-disable-next-line class-methods-use-this
  getHTMLPopUp(files) { // возвращает html разметку окна отправки файла
    for (const file of files) {
      this.filesName = file.name;
    }
    const HTML = `
        <form class="form_add_file" action="">
          <h1 class="form_Name">Отправить ${files.length > 1 ? 'файлы' : 'файл'} с именем </h1>
          <p>
          <span class="name_add_file">${this.filesName} ?</span>
          </p>
          <footer class="form_footer_add_file">
            <button type="button" class="download_cancell button">Отмена</button>
            <button type="button" class="download_ok button">Отправить</button>
          </footer>
        </form>
    `;
    
    return HTML;
  }

  async renderingPopUp(files) { // отрисовывает окно отправки файла и ставит обработчик 'klick'
    this.files = files;
    this.containerForm = document.createElement('div');
    this.containerForm.className = 'popup';
    this.container[0].append(this.containerForm);
    this.containerForm.innerHTML = this.getHTMLPopUp(files);
    return new Promise((resolve) => {
      this.containerForm.addEventListener('click', async (event) => {
      // event.preventDefault();
        const resultPopUpAddFile = await this.onClickPopUp(event);
        if (resultPopUpAddFile === 'canсell') {
          resolve('canсell');
        } else {
          resolve(this.files);
        }
      });
    });
  }

  onClickPopUp(event) {
    return new Promise((resolve) => {
      const { target } = event;
      if (target === document.querySelector('.download_cancell')) {
        // this.containerForm.remove();
        resolve('canсell');
      }
      if (target === document.querySelector('.download_ok')) {
        // message.createFileMessage(this.files);
        resolve(this.files);
      }
    });
  }
}
