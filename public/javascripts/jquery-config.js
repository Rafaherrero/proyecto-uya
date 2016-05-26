/* global $ */

(() => {
  $(() => {
    $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      }
    })
  })
})()
