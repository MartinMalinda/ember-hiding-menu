import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  init(){
    this._super(...arguments);
    Ember.$(window).on('scroll.hiding-menu', e => {
      this.trigger('scroll');
      Ember.run.throttle(this, this._onScroll, 150);
    });
  },

  _onScroll(){
    let newScrollTop = $('html').scrollTop() || $('body').scrollTop();
    if(newScrollTop > this.get('bodyScrollTop')){
      this.trigger('scrollingDown', newScrollTop);
    } else {
      this.trigger('scrollingUp', newScrollTop);
    }

    this.set('bodyScrollTop', newScrollTop);
  },

  destroy() {
    this._super(...arguments);
    Ember.$(window).off('scroll.hiding-menu');
  },
});
