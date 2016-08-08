import Ember from 'ember';

const {RSVP} = Ember;

export default Ember.Test.registerAsyncHelper('animateScroll', function(app, position) {
  return new RSVP.Promise(function(resolve){
    $('body').stop().animate({scrollTop: position}, 1000, 'swing', () => {
      resolve();
    });
  });
});
