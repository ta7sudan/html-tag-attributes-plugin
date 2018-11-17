/* global DEBUG */
'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlTagAttributesPlugin {
	constructor(options) {
		this._options = options;
	}
	apply(compiler) {
		const options = this._options;
		compiler.hooks.compilation.tap('htmlTagAttributesPlugin', compilation => {
			const hooks = HtmlWebpackPlugin.getHooks(compilation);
			hooks.alterAssetTags.tapPromise('htmlTagAttributesPlugin', async ({ assetTags }) => {
				const allTags = Object.keys(assetTags).reduce((rst, k) => rst.concat(assetTags[k]), []);
				allTags.forEach(v => {
					if (typeof options[v.tagName] === 'function') {
						v.attributes = Object.assign(v.attributes, options[v.tagName](v));
					} else if (Object.prototype.toString.call(options[v.tagName]) === '[object Object]') {
						v.attributes = Object.assign(v.attributes, options[v.tagName]);
					}
				});
			});
		});
	}
}

module.exports = HtmlTagAttributesPlugin;
