/* eslint-disable no-console */

import { register } from 'register-service-worker'
import Swal from 'sweetalert2'

const notifyUserAboutUpdate = (worker: any) => {
  Swal.fire({
    title: 'New version!',
    text: 'Reload to get the latest version!',
    type: 'info',
    showCancelButton: true,
    confirmButtonText: 'Reload',
    cancelButtonText: 'Later'
  }).then(result => {
    if (result.value) {
      worker.postMessage({ action: 'skipWaiting' })
    }
  })
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      notifyUserAboutUpdate(registration.waiting)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
