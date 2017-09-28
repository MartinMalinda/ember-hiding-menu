import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import animateScroll from '../../tests/helpers/animate-scroll';

moduleForAcceptance('Acceptance | index');

function hasClass(element, className) {
  return element.classList.contains(className);
}

test('test hiding', async function(assert) {
  
  await visit('/');

  let topMenuEl = document.querySelector('.hiding-menu.top');
  assert.notOk(hasClass(topMenuEl, 'hidden'), 'menu is visible upon visit');

  await animateScroll(300);

  assert.ok(hasClass(topMenuEl, 'hidden'), 'menu is hidden after scrolling down significantly');

  await animateScroll(0);
  await animateScroll(40);

  assert.notOk(hasClass(topMenuEl, 'hidden')); 
   
  await animateScroll(200);

  assert.ok(hasClass(topMenuEl, 'hidden'));  
});
