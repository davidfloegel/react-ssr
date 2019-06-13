import { Given, Then, When } from 'cucumber';
const assert = require('assert');

Given('I visit the main page', () => {
  // const url = type === 'url' ? page : browser.options.baseUrl + page;
  // console.log('url');

  console.log('helloooooooooooooooooooooooooooooooooooooooooooooooooooooo');

  browser.url('http://localhost:3030/');
});

Given('I start with {int}', function(input) {
  this.answer = input;
});
When('I add {int}', function(input) {
  this.answer = this.answer + input;
});
Then('I end up with {int}', function(input) {
  assert.equal(this.answer, input);
});
