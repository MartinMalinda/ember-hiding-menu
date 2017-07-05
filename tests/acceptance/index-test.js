import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import animateScroll from '../../tests/helpers/animate-scroll';

moduleForAcceptance('Acceptance | index');

test('test hiding', async function(assert) {
  
  await visit('/');


  let $topMenu = $('.hiding-menu.top');
  assert.equal($topMenu.hasClass('hidden'), false, 'menu is visible upon visit');

  await animateScroll(300);

  assert.equal($menu.hasClass('hidden'), true, 'menu is hidden after scrolling down significantly');

  await animateScroll(0);
  await animateScroll(40);

  assert.equal($menu.hasClass('hidden'), false); 
   
  await animateScroll(200);

  assert.equal($menu.hasClass('hidden'), true);  

});
