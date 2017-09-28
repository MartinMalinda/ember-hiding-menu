import Ember from 'ember';
import $ from 'jquery';

const {RSVP} = Ember;

export default (position, duration = 1000) => {
  return new RSVP.Promise(function(resolve) {
    $('#ember-testing-container').stop().animate({scrollTop: position}, duration, 'swing');
    setTimeout(resolve, duration + 10);
  });
};
