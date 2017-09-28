import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import animateScroll from '../../tests/helpers/animate-scroll';

moduleForAcceptance('Acceptance | index');

function hasClass(element, className) {
  return element.classList.contains(className);
}

test('test hiding', async function(assert) {
  
  await visit('/');

  const topMenuEl = document.querySelector('.hiding-menu.top');
  assert.notOk(hasClass(topMenuEl, 'hidden'), 'menu is visible upon visit');

  await animateScroll(300);

  assert.ok(hasClass(topMenuEl, 'hidden'), 'menu is hidden after scrolling down significantly');

  await animateScroll(0);
  await animateScroll(40);

  assert.notOk(hasClass(topMenuEl, 'hidden'), 'scrolling just 40px will not make menu appear because it is less than menuHeight'); 
   
  await animateScroll(200);

  assert.ok(hasClass(topMenuEl, 'hidden'), 'scrolling 200px does hide the menu');  
});

test('menu appears when scrolling to the bottom', async function(assert) {
  await visit('/');

  const topMenuEl = document.querySelector('.hiding-menu.top');
  assert.notOk(hasClass(topMenuEl, 'hidden'), 'menu is visible upon visit');

  const containerHeight = document.querySelector('#ember-testing-container').scrollHeight;

  await animateScroll(containerHeight - topMenuEl.offsetHeight/2);
  assert.notOk(hasClass(topMenuEl, 'hidden'), 'scrolling (nearly) to the bottom should make menu appear');  
});
