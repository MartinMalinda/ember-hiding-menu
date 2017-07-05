import Ember from 'ember';

const { $, run } = Ember;

export default Ember.Service.extend(Ember.Evented, {

  init() {
    this._super(...arguments);
    if (typeof FastBoot === 'undefined') {
      $(window).on('scroll.hiding-menu', run.bind(this, function() {
        this.trigger('scroll');
        // run.throttle(this, this._onScroll, 20);
        this._onScroll();
      }));
    }
  },

  _onScroll() {
    let newScrollTop = $('html').scrollTop() || $('body').scrollTop();
    if (newScrollTop > this.get('bodyScrollTop')) {
      this.trigger('scrollingDown', newScrollTop);
    } else {
      this.trigger('scrollingUp', newScrollTop);
    }

    this.set('bodyScrollTop', newScrollTop);
  },

  destroy() {
    this._super(...arguments);
    if (typeof FastBoot === 'undefined') {
      $(window).off('scroll.hiding-menu');
    }
  },
});
