const test = require('node:test');
const assert = require('node:assert/strict');
const { load } = require('./helpers.cjs');
const payload = '<img src=x onerror="globalThis.compromised=true">';
function element() {
  return { value: payload, textContent: '', classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, appendChild() {}, set innerHTML(value) { assert.notEqual(value, payload, 'untrusted HTML reached parser'); } };
}
for (const kind of ['stack', 'queue']) test(kind + ' renders markup as literal text', () => {
  const li = element(), input = element(), list = element(); list.querySelectorAll = () => [li];
  const handlers = {};
  const document = {
    createElement: element,
    getElementById(id) { if (id === 'stack-list') return list; if (id === 'stack-input') return input;
      return { ...element(), addEventListener(event, fn) { handlers[id] = fn; } }; },
    querySelector(selector) { if (selector === '.list-queue') return list; if (selector === '.queue-input') return input;
      return { ...element(), addEventListener(event, fn) { handlers[selector] = fn; } }; }
  };
  const StackDataStructure = function () { this.MAX_SIZE = 1; this.stackControl = []; this.canPush = () => true; this.push = value => this.stackControl.push(value); };
  const QueueDataStructure = function () { this.MAX_SIZE = 1; this.queueControl = []; this.canEnqueue = () => true; this.enqueue = value => this.queueControl.push(value); };
  load('js/' + kind + '/' + kind + '-dom.js', {}, { document, StackDataStructure, QueueDataStructure, newStack: { queueControl: [] } });
  handlers[kind === 'stack' ? 'add-stack' : '.btn-add-queue'](); assert.equal(li.textContent, payload);
});
