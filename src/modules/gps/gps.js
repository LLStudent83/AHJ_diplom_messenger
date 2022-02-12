/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle

export default class Gps {
  constructor(popUpGps) {
    this.popUpGps = popUpGps;
  }

  async getСoordinates() { // получает координаты
    let position = null;
    let coordString = null;
    if (!navigator.geolocation) {
      this.popUpGps.renderingPopUp();
      return;
    }
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((_position) => resolve(_position),
        (e) => reject(e), { timeout: 5000 }); // ожидание координат 5 сек. потом выбросит исключение
    });
    try {
      position = await promise;
      const { latitude, longitude } = position.coords;
      coordString = `[${latitude}, ${longitude}]`;
      // eslint-disable-next-line consistent-return
      return coordString;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ошибка при получении координат', e);
    }
    coordString = await this.popUpGps.renderingPopUp();
    // eslint-disable-next-line consistent-return
    return coordString;
  }

  showPosition() {
    // eslint-disable-next-line no-alert
    alert('логика отображения местоположени человека на карте ещё не написана SORRY');
  }
}
