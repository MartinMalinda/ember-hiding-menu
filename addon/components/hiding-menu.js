import Ember from 'ember';
import layout from '../templates/components/hiding-menu';

const {run, $, computed} = Ember;

export default Ember.Component.extend({
  layout,

  tagName: 'nav',
  classNames: ['hiding-menu'],

  throttleTime: 200,
  tolerance: 0,
  topTolerance: 50,
  bottomTolerance: 20,
  class: null,
  style: null,

  classNameBindings: ['isHidden:hidden','class', 'isAbsolutePositioned:absolute'],
  attributeBindings: ['style'],

  didInsertElement(){
    if(this.get('hasSupport')){
      this.setupScrollMenuToggle();
    }
  },

  willDestroyElement(){
    $(window).off(`scroll.${this.get('elementId')}`);
  },

  isAbsolutePositioned: computed.not('hasSupport'),
  hasSupport: computed(function(){
     return navigator.userAgent.match(/(iPhone|iPad|Macintosh|Windows NT|Linux)/) && !navigator.userAgent.match(/(Android)/);
  }), 

  setupScrollMenuToggle(){
    let $document = $(document);
    let $el = $(this.element);
    let $menu = $el;

    this.set('menuHeight', $menu.outerHeight());

    $(window).on(`scroll.${this.get('elementId')}`, event => {
      run.throttle(this, () => this.onScroll(event, $document), this.get('throttleTime'));
    });
  },
  
  onScroll(event, $document){
    if(!this.get('isDestroyed')){

    let newScrollTop = $document.scrollTop();
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
    if(newScrollTop > (document.body.scrollHeight - window.innerHeight - this.get('bottomTolerance') - this.get('menuHeight'))){
      this.set('isHidden', false);
    } else if(!this.get('isHidden') && newScrollTop > this.get('menuHeight') + this.get('topTolerance')){
      this.set('isHidden', true);
    } else {
    }

  },

  showMenu(){
      this.set('isHidden', false);
  },
});
