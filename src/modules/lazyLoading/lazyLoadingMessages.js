/* eslint-disable import/no-cycle */
import { message } from '../../app';

export default class lazyLoadingMessages {
  constructor(ws) {
    this.ws = ws;
    this.scrollArea = document.querySelector('#scrollArea');
    this.messages = []; // сюда значение присвоится из PopUp.openMessenger
  }

  lazyLoadingMessage(targets) { // targets всегда массив
    const options = {
      root: this.scrollArea, // область наблюдения
      rootMargin: '0px', // отступ области наблюдения. Могут иметь значение "10px 20px 30px 40px"
      // threshold указывает процент видимости целевого элемента для вызова callback,
      //  может быть [0, 0.25, 0.5, 0.75, 1]
      threshold: 1,
    };
    this.observer = new IntersectionObserver((entries) => {
      // messageLoading(entries, observer) функция callback,
      // которая вызовется при наступлении события
      // пересечения целевого элемента (target)
      // границы области наблюдения (scrollArea) на величину (threshold).
      this.messageLoading(entries, this.observer);
    }, options);
    // Начинаем наблюдение. target это элемент, который отслеживаем,
    // когда он пересечет область scrollArea
    // если целей target для наблюдения несколько, то метод observe вызывается для каждого
    targets.forEach((target) => this.observer.observe(target));
  }

  // аргументы это entries - массив наблюдаемых объектов IntersectionObserverEntry
  //  и observer - наблюдатель с целевым элементом для просмотра
  messageLoading(entries, observer) {
    // подгрузить следующий объем сообщений
    console.log('entries', entries);
    console.log('observer', observer);
    const { target } = entries[0];
    if (entries[0].isIntersecting === true) { // если отслеживаемый объект пересек границу видимости
      this.observer.unobserve(target); // делаем его не отслеживаемым
      target.classList.remove('traceable'); // удалить класс отслеживания у отработанного элемента
      this.sliceAllMessages = this.allMessages.splice(-5, 5);

      // отрисовываем следующие 5 сообщений
      for (let i = 0; i <= this.sliceAllMessages.length - 1; i += 1) {
        const traceable = i === 0 ? 'traceable' : null; // если элемент последний в серии добавить ему класс traceable
        this.sliceAllMessages[i].traceable = traceable;
        message.printMessage(this.sliceAllMessages[i], 'toTheBegining');
      }
      if (this.allMessages.length === 0) return;
      this.lazyLoadingMessage(document.querySelectorAll('.traceable'));
    }
  }
}
