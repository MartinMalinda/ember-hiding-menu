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
  bottomTolerance: 20,
  class: null,
  style: null,

  classNameBindings: ['isHidden:hidden','class'],
  attributeBindings: ['style'],

  didInsertElement(){
    this.setupScrollMenuToggle();
  },

  willDestroyElement(){
    $(window).off(`scroll.${this.get('elementId')}`);
  },

  setupScrollMenuToggle(){
    let $document = $(document);
    let $el = $(this.element);
    let $menu = $el;

    this.set('menuHeight', $menu.outerHeight());
    this.set('documentHeight', $document.height());
    this.set('windowHeight', $(window).height());

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
    if(newScrollTop > (this.get('documentHeight') - this.get('windowHeight') - this.get('bottomTolerance') - this.get('menuHeight'))){
      this.set('isHidden', false);
    } else if(!this.get('isHidden') && newScrollTop > this.get('menuHeight') + this.get('topTolerance')){
      this.set('isHidden', true);
    } else {
      console.log(newScrollTop);
    }

  },

  showMenu(){
      this.set('isHidden', false);
  },
});
