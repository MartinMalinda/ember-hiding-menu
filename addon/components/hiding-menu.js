import Ember from 'ember';
import layout from '../templates/components/hiding-menu';

const {run, computed} = Ember;

export default Ember.Component.extend({
  layout,

  tagName: 'nav',
  classNames: ['hiding-menu'],

  throttleTime: 250,
  tolerance: 0,
  topTolerance: 50,
  bottomTolerance: 20,
  class: null,
  style: null,

  classNameBindings: ['isHidden:hidden','class', 'isAbsolutePositioned:absolute'],
  attributeBindings: ['style'],

  didInsertElement(){
    this.setupScrollMenuToggle();
  },

  willDestroyElement(){
    $(window).off(`scroll.${this.get('elementId')}`);
  },

  setupScrollMenuToggle(){
    let $el = $(this.element);
    let $menu = $el;

    this.set('menuHeight', $menu.outerHeight());

    $(window).on(`scroll.${this.get('elementId')}`, event => {
      this.raf(() => {
        run.throttle(this, () => this.onScroll(event), this.get('throttleTime'));
      });
    });
  },

  raf(cb){
    let fn = window.requestAnimationFrame || window.setTimeout;
    fn(cb);
  }, 
  
  onScroll(event, $document){
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
      if(newScrollTop > (document.body.scrollHeight - window.innerHeight - this.get('bottomTolerance') - this.get('menuHeight'))){
          this.set('isHidden', false);
      } else if(!this.get('isHidden') && newScrollTop > this.get('menuHeight') + this.get('topTolerance')){
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
