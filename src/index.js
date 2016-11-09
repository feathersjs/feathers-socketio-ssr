const socketio = require('feathers-socketio/client');
const rest = require('feathers-rest/client');
const jQuery = require('jquery');
const isCommonSSR = require('./is-common-ssr');

module.exports = function init (socket, isSsrFn, customRest) {
  if (!socket || !socket.io.uri) {
    throw new Error('You must pass an initialized socket to the feathers-socketio-ssr plugin.');
  }
  const url = socket.io.uri;
  const isSSR = isSsrFn || isCommonSSR;

  return isSSR() ? customRest || rest(url).jquery(jQuery) : socketio(socket);
};
