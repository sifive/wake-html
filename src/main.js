'use strict';

const JSON5 = require('json5');
const stringify = require('onml/lib/stringify.js');
const style = require('../lib/style.js');
const utf8 = require('utf8');
// const tooltip = require('tooltip.js');

const spanner = root => {
  const str = utf8.encode(root.source);
  return function rec (node) {
    const pRange = node.range;
    const body = node.body;
    let res = [];
    let pointer = pRange[0];
    body.map(child => {
      const cRange = child.range;
      if (pointer < cRange[0]) {
        res.push(utf8.decode(str.slice(pointer, cRange[0])));
      }
      if (cRange[1] > pRange[1]) {
        console.error(cRange[1], pRange[1]);
        res.push(['span', {class: 'error'}, rec(child)]);
      } else {
        res.push(rec(child));
      }
      pointer = cRange[1];
    });
    if (pointer < pRange[1]) {
      res.push(utf8.decode(str.slice(pointer, pRange[1])));
    }
    const head = ['span', {
      id: root.filename + ':' + node.range.join(':'),
      class: node.type,
      title: node.sourceType
    }];

    if (node.target) {
      head[0] = 'a';
      head[1].href = '#' + node.target.filename + ':' + node.target.range.join(':');
    }

    return head.concat(res);
  };
};

const program = node => {
  // node.range = [0, node.source.length+1];
  // console.log(node.filename);
  const span = spanner(node);
  return ['div',
    ['hr'],
    ['h2', (node.filename || '---')],
    ['pre', span(node)]
  ];
};

const workspace = node => ['div'].concat((node.body || []).map(program));

function body (node) {
  document.body.innerHTML = stringify(['div', {class: 'content'},
    style(),
    workspace(node)
  ]);
}

function main () {
  var points = document.querySelectorAll('*');
  for(let point of points) {
    if (point.type === 'wake') {
      const node = JSON5.parse(point.innerHTML);
      body(node);
    }
  }
}

document.addEventListener('DOMContentLoaded', main);

// console.log(tooltip);

/* eslint-env browser */
