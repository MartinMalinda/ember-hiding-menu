import Ember from 'ember';

const { run } = Ember;

export default Ember.Service.extend(Ember.Evented, {

  init() {
    this._super(...arguments);
    if (typeof FastBoot === 'undefined') {
      this.saveScrollingElements();
      this._setScrollListener();
    }
  },

  _setScrollListener() {
    const scrollEventElement = this.configScrollContainerElement || window;
    //TODO passive true?
    this._scrollListener = this._scrollListener.bind(this);
    scrollEventElement.addEventListener('scroll', this._scrollListener, { passive: true });
  },

  _scrollListener() {
    run(() => {
      this.trigger('scroll');
      this._onScroll();
    });
  },

  saveScrollingElements() {
    const config = Ember.getOwner(this).resolveRegistration('config:environment');
    this.configScrollContainerElement = document.querySelector(config.APP.scrollContainerElement);
    this.bodyElement = document.querySelector('body');
    this.htmlElement = document.querySelector('html');
  },

  getScrollTop() {
    if (this.configScrollContainerElement) {
      return this.configScrollContainerElement.scrollTop;
    }

    return this.bodyElement.scrollTop || this.htmlElement.scrollTop;
  },

  _onScroll() {
    if (!this.get('isDestroyed')) {
      let newScrollTop = this.getScrollTop();
      if (newScrollTop > this.get('previousScrollTop')) {
        this.trigger('scrollingDown', newScrollTop);
      } else {
        this.trigger('scrollingUp', newScrollTop);
      }

      this.set('previousScrollTop', newScrollTop);
    }
  },

  destroy() {
    this._super(...arguments);
    if (typeof FastBoot === 'undefined') {
      window.removeEventListener('scroll', this._scrollListener);
    }
  },
});
