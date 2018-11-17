# html-tag-attributes-plugin
Add custom attributes to tags injected by html-webpack-plugin.



## Requirements

* html-webpack-plugin v4.0+
* set after html-webpack-plugin



## Installation

```shell
$ npm i -D html-tag-attributes-plugin
```



## Usage

```javascript
{
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['app', 'vendors']
        }),
        new HtmlTagAttributesPlugin({
            script: {
                crossorigin: 'anonymous',
                async: true
            },
            link(tag) {
                if (/app/.test(tag.attributes.src)) {
                    return {
                        crossorigin: 'anonymous'
                    };
                }
            },
            meta: {
                'data-test': 'test'
            }
        })
    ]
}
```

output

```html
<script src="app.ad38234f.js" crossorigin="anonymous" async></script>
<link rel="stylesheet" type="text/css" href="app.be372c5a.css" crossorigin="anonymous">
<meta data-test="test" />
```



## Options

* `<tagName>` (`Object` or `Function`), `<tagName>` can be `script`, `link` or `meta`, all tagNames of `HtmlTagObject` are supported, see [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin/blob/master/lib/html-tags.js)
* If `<tagName>` is an `Object`, all own properties of `<tagName>` will treat as html attributes.
* If `<tagname>` is a `Function`, whose arguments is a `HtmlTagObject`, must return a `Object` as html attributes.