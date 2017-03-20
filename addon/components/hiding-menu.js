import Ember from 'ember';
import layout from '../templates/components/hiding-menu';

const {run, computed, inject} = Ember;

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

  didInsertElement(){
    this.setupScrollMenuToggle();
  },

  willDestroyElement(){
    $(window).off(`scroll.${this.get('elementId')}`);
  },

  setupScrollMenuToggle(){
    let $el = $(this.element);
    let $menu = $el;
    let hidingScroll = this.get('hidingScroll');

    this.set('_menuHeight', this.get('menuHeight') || $menu.outerHeight());

    if(this.get('throttleTime') === parseInt(150)){
      hidingScroll.on('scrollingUp', newScrollTop => this.raf(() => this.showMenu()));
      hidingScroll.on('scrollingDown', newScrollTop => this.raf(() => this.hideMenu(newScrollTop)));
    } else {
      hidingScroll.on('scroll', event => {
        this.raf(() => {
          run.throttle(this, () => this.onScroll(event), this.get('throttleTime'));
        });
      });
    }

  },

  raf(cb){
    let fn = window.requestAnimationFrame || window.setTimeout;
    fn(cb);
  }, 
  
  onScroll(event){
    if(!this.get('isDestroyed')){
      let newScrollTop = $('html').scrollTop() || $('body').scrollTop();
      if(newScrollTop > this.get('bodyScrollTop')){
        this.hideMenu(newScrollTop);
      } else {
        this.showMenu();
      }

      this.set('bodyScrollTop', newScrollTop);
    }
  },

  hideMenu(newScrollTop){
    // check for Top Tollerance
    this.raf(() => { 
      if(newScrollTop > (document.body.scrollHeight - window.innerHeight - this.get('bottomTolerance') - this.get('_menuHeight'))){
          this.set('isHidden', false);
      } else if(!this.get('isHidden') && newScrollTop > this.get('_menuHeight') + this.get('topTolerance')){
          this.set('isHidden', true);
      }
    });

  },

  showMenu(){
    this.raf(() => {
      this.set('isHidden', false);
    });
  },
});
