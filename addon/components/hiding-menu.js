import Ember from 'ember';
import layout from '../templates/components/hiding-menu';
const {run, $} = Ember;

export default Ember.Component.extend({
  layout,

  tagName: 'nav',
  classNames: ['hiding-menu'],

  throttleTime: 200,
  tolerance: 0,
  topTolerance: 50,
  class: null,

  classNameBindings: ['isHidden:hidden','class'],

  didInsertElement(){
    this.setupScrollMenuToggle();
  },

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
    if(!this.get('isHidden') && newScrollTop > this.get('menuHeight') + this.get('topTolerance')){
        this.set('isHidden', true);
    }
  },

  showMenu(){
      this.set('isHidden', false);
  },
});
