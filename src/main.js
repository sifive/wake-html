'use strict';

const JSON5 = require('json5');
const stringify = require('onml/lib/stringify.js');
const style = require('../lib/style.js');
const utf8 = require('utf8');

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
        // console.error(cRange[1], pRange[1]);
        res.push(['span', {class: 'error'}, rec(child)]);
      } else {
        res.push(rec(child));
      }
      pointer = cRange[1];
    });
    if (pointer < pRange[1]) {
      res.push(utf8.decode(str.slice(pointer, pRange[1])));
    }

    const head = ['span', { class: node.type }];

    if (node.sourceType) {
      head[1].sourceType = node.sourceType;
      head[1].onmouseover = 'onMouseOver(this, event)';
      head[1].onmouseout  = 'onMouseOut(this, event)';
    }

    if (node.type === 'VarDef' || node.type === 'VarArg') {
      head[1].id = root.filename + ':' + node.range.join(':');
      head[1].onclick = 'onMouseClick(this, event)';
    }

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

// tooltip
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');

// css to select uses
const usecss = document.createElement('div');
usecss.appendChild(document.createElement('style'));

function body (node) {
  document.body.innerHTML = stringify(['div', {class: 'content'},
    style(),
    workspace(node)
  ]);
  document.body.appendChild(usecss);
  document.body.appendChild(tooltip);
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

let depth = 0;
let inner = null;
let select = null;

function update () {
  let next = inner;
  for (let i = 0; i < depth; ++i) {
    let parent = next.parentElement;
    if (!parent.getAttribute('sourceType')) break;
    next = parent;
  }
  if (next != select) {
    if (select) {
      select.removeAttribute('focus');
      tooltip.style.visibility = 'hidden';
      tooltip.removeChild(tooltip.firstChild);
    }
    if (next) {
      next.setAttribute('focus', 'true');
      tooltip.style.visibility = 'visible';
      const line = document.createElement('div');
      line.innerHTML = next.getAttribute('sourceType');
      tooltip.insertBefore(line, tooltip.firstChild);
    }
  }
  select = next;
}

document.onMouseClick = function (that, event) {
  usecss.firstChild.innerHTML = 'a[href=\'#' + that.id + '\'] { background-color: red; }';
  event.stopPropagation();
};

document.onMouseOver = function (that, event) {
  inner = that;
  depth = 0;
  update();
  tooltip.style.cssText = `position: absolute; top: ${event.pageY + 10}px; left: ${event.pageX}px;`;
  event.stopPropagation();
};

document.onMouseOut = function (that, event) {
  inner = null;
  depth = 0;
  update();
  event.stopPropagation();
};

document.addEventListener('keypress', function(event) {
  let char = event.which || event.keyCode;
  if (char === 43) { ++depth; update(); }
  if (char === 45 && depth > 0) { --depth; update(); }
}, true);

/* eslint-env browser */
