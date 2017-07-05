import Ember from 'ember';

const {RSVP} = Ember;

export default (position, duration = 1000) => {
  return new RSVP.Promise(function(resolve) {
    $('#ember-testing').stop().animate({scrollTop: position}, duration, 'swing');
  });
};
