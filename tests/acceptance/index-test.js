import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('test hiding', function(assert) {
  visit('/');

  andThen(function() {

    let $menu = $('.hiding-menu');
    // sunday evening callback hell
    // TODO: refactor this if needed

    assert.equal($menu.hasClass('hidden'), false, 'menu is visible upon visit');

    return animateScroll(300).then(() => {

      assert.equal($menu.hasClass('hidden'), true, 'menu is hidden after scrolling down significantly');
    });


  });

  andThen(function(){

    let $menu = $('.hiding-menu');

    animateScroll(0);
    andThen(function(){
      return animateScroll(40).then(() => {
        assert.equal($menu.hasClass('hidden'), false);  
      });

    })
  })

  andThen(function(){
    return animateScroll(200);
  })

  andThen(function(){
      let $menu = $('.hiding-menu');
        assert.equal($menu.hasClass('hidden'), true);  
  })

});
