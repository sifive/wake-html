# wake-html

HTML view of WAKE flow

## Build

```sh
npm i
npm run build
```

## Use

In wake v0.16.0+

```sh
wake --html > foo.html
```

It should generate file like:

```html
<script src="wake.js"></script><script type="wake">
{
  ...
}
</script>
```

You open it in the browser.
