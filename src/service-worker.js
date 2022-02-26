// /* eslint-disable no-restricted-globals */
// import * as navigationPreload from 'workbox-navigation-preload';
// // import { setCatchHandler } from 'workbox-routing';
// // import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
// import { registerRoute, NavigationRoute } from 'workbox-routing';
// import { NetworkOnly } from 'workbox-strategies';

// const CACHE_NAME = 'offline-html';
// const FALLBACK_HTML_URL = '/offline.html';
// // Записываем резервную страницу в кэш при установке СВ
// self.addEventListener('install', async (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML_URL)),
//   );
// });

// navigationPreload.enable();

// const networkOnly = new NetworkOnly();
// const navigationHandler = async (params) => {
//   try {
//     // Пытаемся выполнить сетевой запрос
//     return await networkOnly.handle(params);
//   } catch (error) {
//     // В случае провала запроса, возвращаем резервную cтраницу из кэша
//     return caches.match(FALLBACK_HTML_URL, {
//       cacheName: CACHE_NAME,
//     });
//   }
// };

// // Регистрируем данную стратегию для обработки всех маршрутов
// registerRoute(new NavigationRoute(navigationHandler));

// // precacheAndRoute(self.__WB_MANIFEST);
// // setCatchHandler(async ({ event }) => {
// //   // Возвращаем предварительно сохраненную резервную страницу при запросе “документа”
// //   if (event.request.destination === 'document') {
// //     return matchPrecache('/offline.html');
// //   }

// //   return Response.error();
// // });
// console.log('Hello from service-worker.js');
