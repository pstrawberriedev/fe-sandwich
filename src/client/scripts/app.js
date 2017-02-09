import $ from 'wetfish-basic';
import axios from 'axios';
import _ from 'lodash';
const LS = localStorage;
const apiRoot = 'http://localhost:3000/api'

let app = {

  init() {

    app.localData = [];

    app.$loader = $('#loader');
    app.$loading = $('#loading');
    app.$error = $('#error');
    app.$fakeButton = $('#fake-button');

    console.log('%c App Started ', 'background: #ddd; color: #9b1851;font-weight:bold;');
    this.anon();
  },

  // Anonymous Funcs
  anon() {
    const self = this;

    self.$fakeButton.on('click', function() {
      self.fakeCall();
    })
  },

  // loader
  showLoader(message) {
    this.$loader.style({'display':'block'});
    if(message) {
      this.$loading.style({'display':'block'});
      this.$loading.html(message);
    }
  },
  hideLoader() {
    this.$loading.style({'display':'none'});
    this.$loader.style({'display':'none'});
  },

  // Error Display
  showError(message) {
    const self = this;
    this.$error.html(message);
    this.$error.style({'display':'block'});
    setTimeout(function() {
      self.$error.html('');
      self.$error.style({'display':'none'});
    },3500)
  },

  // Broken Example Call
  fakeCall(args) {
    const self = this;
    self.showLoader('Doing a fake call');

    //check local data first, if not present, call API
    console.log('---------------------');
    console.log('Doing a fake call');

    axios.get(apiRoot + '/fake')
    .then(function (response) {
      self.hideLoader();
      if(response.data && !response.data.error) {
        console.log(response.data);
        $('main').append('<div id="fake"></div>');
        $('#fake').html('');
        $('#fake').append(JSON.stringify(response.data));
      } else {
        if(response.data.error === 404) {
          self.showError('Got a 404 on the call');
        } else {
          self.showError('Something went wrong that wasn\'t a 404');
        }
      }
    })
    .catch(function (error) {
      self.hideLoader();
      console.log(error);
    });

  }

}

app.init();
