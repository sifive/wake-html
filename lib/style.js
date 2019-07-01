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

.Program { color: #999; }
.Lambda { color: red; }
.VarRef { color: green; }
.Prim { color: yellow; }
.DefBinding { color: #fff; }
.App { color: pink; }

.Lambda > .Lambda { background: #111; }
.Lambda > .Lambda > .Lambda { background: #222; }
.Lambda > .Lambda > .Lambda > .Lambda { background: #333; }

.Lambda:hover { background: #333; }
.VarRef:hover { background: #333; }
.Prim:hover { background: #333; }
.DefBinding:hover { background: #333; }
.App:hover { background: #333; }

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

`], ['link', {
  href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Roboto|IBM+Plex+Serif|Roboto+Mono&display=swap',
  rel: 'stylesheet'
}]];
