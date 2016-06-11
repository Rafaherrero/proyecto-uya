/* global $, window */

setTimeout(() => {
  $('#tiempo').html('2')
}, 1000)

setTimeout(() => {
  $('#tiempo').html('1')
}, 2000)

setTimeout(() => {
  $('#tiempo').html('0')
  window.location.href = 'login.html'
}, 3000)
