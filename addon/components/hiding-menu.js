import Ember from 'ember';
import layout from '../templates/components/hiding-menu';

const { run, inject } = Ember;

export default Ember.Component.extend({
  layout,

  hidingScroll: inject.service(),

  tagName: 'nav',
  classNames: ['hiding-menu'],

  throttleTime: 30,
  tolerance: 0,
  topTolerance: 50,
  bottomTolerance: 50,
  class: null,
  style: null,

  classNameBindings: ['isHidden:hidden'],
  attributeBindings: ['style'],


  didInsertElement() {
    this.setMenuHeight();
    this.setupScrollEventHandling();

    this.bodyElement = this.get('hidingScroll.bodyElement');
    this.configScrollContainerElement = this.get('hidingScroll.configScrollContainerElement');
  },

  willDestroyElement() {
    let hidingScroll = this.get('hidingScroll');
    hidingScroll.off('scrollingUp', this, this._onScrollUp);
    hidingScroll.off('scrollingDown', this, this._onScrollDown);
  },

  onScrollUp() {
    this.raf(() => {
      if (!this.get('isDestroyed')) {
        this.showMenu();
      }
    });
  },

  onScrollDown(newScrollTop) {
    this.raf(() => {
      if (!this.get('isDestroyed')) {
        this.hideMenu(newScrollTop);
      }
    });
  },

  setMenuHeight() {
    if (!this.get('menuHeight')) {
      // if menuHeight is not passed from the outside
      this.set('menuHeight', this.element.offsetHeight || this.element.clientHeight);
    }
  },

  setupScrollEventHandling(){
    const hidingScroll = this.get('hidingScroll');
    this._onScrollUp = () => run.throttle(this, this.onScrollUp, this.get('throttleTime'));
    this._onScrollDown = newScrollTop => run.throttle(this, this.onScrollDown, newScrollTop, this.get('throttleTime'));
    hidingScroll.on('scrollingUp', this, this._onScrollUp);
    hidingScroll.on('scrollingDown', this, this._onScrollDown);
  },

  raf(cb){
    if ('requestAnimationFrame' in window) {
      window.requestAnimationFrame(run.bind(this, cb));
    } else {
      run.next(this, cb);
    }
  },

  getFixedScrollHeight() {
    const containerElement = this.configScrollContainerElement || this.bodyElement;
    return containerElement.scrollHeight - window.innerHeight;
  },

  hideMenu(newScrollTop){
    // check for Top Tollerance
    if (newScrollTop > (this.getFixedScrollHeight() - this.get('bottomTolerance') - this.get('menuHeight'))) {
      this.set('isHidden', false);
    } else if (!this.get('isHidden') && newScrollTop > this.get('menuHeight') + this.get('topTolerance')) {
      this.set('isHidden', true);
    }
  },

  showMenu(){
    this.set('isHidden', false);
  },
});
