/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-cycle
import PopUp from './modules/pop_up/pop_up';
// eslint-disable-next-line import/no-cycle
import Messenger from './modules/messenger/messenger';
// eslint-disable-next-line import/no-cycle
import Ws from './modules/ws/ws';
// eslint-disable-next-line import/no-cycle

const pop_up = new PopUp('container');
const ws = new Ws(pop_up);
const messenger = new Messenger(pop_up, ws);

export { pop_up, messenger, ws };
