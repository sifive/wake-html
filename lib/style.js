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

.Lambda:hover { background: #333; }
.VarRef:hover { background: #333; }
.Prim:hover { background: #333; }
.DefBinding:hover { background: #333; }
.App:hover { background: #333; }

`], ['link', {
  href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Roboto|IBM+Plex+Serif|Roboto+Mono&display=swap',
  rel: 'stylesheet'
}]];
