import Ember from 'ember';
import layout from '../templates/components/hiding-menu';

const { run, inject, $ } = Ember;

export default Ember.Component.extend({
  layout,

  tagName: 'nav',
  classNames: ['hiding-menu'],

  throttleTime: 150,
  tolerance: 0,
  topTolerance: 50,
  bottomTolerance: 20,
  class: null,
  style: null,

  classNameBindings: ['isHidden:hidden'],
  attributeBindings: ['style'],

  hidingScroll: inject.service(),

  didInsertElement() {
    this.setupScrollMenuToggle();
  },

  willDestroyElement() {
    let hidingScroll = this.get('hidingScroll');
    hidingScroll.off('scrollingUp', this, this.onScrollUp);
    hidingScroll.off('scrollingDown', this, this.onScrollDown);
  },

  onScrollUp() {
    this.raf(() => this.showMenu());
  },

  onScrollDown(newScrollTop) {
    this.raf(() => this.hideMenu(newScrollTop));
  },

  setupScrollMenuToggle(){
    let $menu = this.$();
    let hidingScroll = this.get('hidingScroll');

    this.set('_menuHeight', this.get('menuHeight') || $menu.outerHeight());

    if (parseInt(this.get('throttleTime')) === 150) {
      hidingScroll.on('scrollingUp', this, this.onScrollUp);
      hidingScroll.on('scrollingDown', this, this.onScrollDown);
    } else {
      hidingScroll.on('scroll', () => {
        this.raf(() => {
          run.throttle(this, this.onScroll, this.get('throttleTime'));
        });
      });
    }
  },

  raf(cb){
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(run.bind(this, cb));
    } else {
      run.next(this, cb);
    }
  },

  onScroll(){
    if (!this.get('isDestroyed')) {
      let newScrollTop = $('html').scrollTop() || $('body').scrollTop();
      if (newScrollTop > this.get('bodyScrollTop')) {
        this.onScrollDown(newScrollTop);
      } else {
        this.onScrollUp();
      }

      this.set('bodyScrollTop', newScrollTop);
    }
  },

  hideMenu(newScrollTop){
    // check for Top Tollerance
    if (newScrollTop > (document.body.scrollHeight - window.innerHeight - this.get('bottomTolerance') - this.get('_menuHeight'))) {
      this.set('isHidden', false);
    } else if (!this.get('isHidden') && newScrollTop > this.get('_menuHeight') + this.get('topTolerance')) {
      this.set('isHidden', true);
    }
  },

  showMenu(){
    this.set('isHidden', false);
  },
});
