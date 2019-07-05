'use strict';

module.exports = () => ['span', ['style', `
body {
  hyphens: auto;
  background-color: black;
  font-family: 'Roboto', sans-serif;
}
table {
  border-collapse: collapse;
  border: 1px solid #000;
  margin: 3px
}
th,td {
  padding: 2px 8px;
  border: 1px solid #000;
}
.error { background: grey; }
.warning { color: yellow; }
.info { color: blue; }

div { color: white; }

pre {
  /* font-family: 'IBM Plex Mono', monospace; */
  font-family: 'Roboto Mono', monospace;
}

.Program    { color: #999; }
.VarRef     { color: white; }
.VarDef     { color: #ee3; }
.VarArg     { color: #55f; }
.Prim       { color: yellow; }
.Literal    { color: pink; }

*[sourceType]:hover { background-color: hsla(0, 100%, 100%, 0.1); }
*[focus='true']:hover { background-color: green; }

@-webkit-keyframes target-fade {
  from { background-color: red; } /* [1] */
  to { background-color: transparent; }
}

@-moz-keyframes target-fade {
  from { background-color: red; } /* [1] */
  to { background-color: transparent; }
}

@-o-keyframes target-fade {
  from { background-color: red; } /* [1] */
  to { background-color: transparent; }
}

@keyframes target-fade {
  from { background-color: red; } /* [1] */
  to { background-color: transparent; }
}

:target {
  -webkit-animation: target-fade 5s;
  -moz-animation: target-fade 5s;
  -o-animation: target-fade 5s;
  animation: target-fade 5s;
}

.tooltip {
  display: block;
  padding: 10px;
  z-index: 5;
  position: absolute;
  min-width: 200px;
  background-color: #333;
}

a:link {
  text-decoration: none;
}

`], ['link', {
  href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Roboto|IBM+Plex+Serif|Roboto+Mono&display=swap',
  rel: 'stylesheet'
}]];
