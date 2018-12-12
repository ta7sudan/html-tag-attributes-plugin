/* global DEBUG */
'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');

function addAttributes(tags, options) {
	tags.forEach(v => {
		if (typeof options[v.tagName] === 'function') {
			v.attributes = Object.assign(v.attributes, options[v.tagName](v));
		} else if (Object.prototype.toString.call(options[v.tagName]) === '[object Object]') {
			v.attributes = Object.assign(v.attributes, options[v.tagName]);
		}
	});
	
}

class HtmlTagAttributesPlugin {
	constructor(options) {
		this._options = options;
	}
	apply(compiler) {
		const options = this._options;
		compiler.hooks.compilation.tap(this.constructor.name, compilation => {
			if (typeof HtmlWebpackPlugin.getHooks === 'function') {
				HtmlWebpackPlugin
					.getHooks(compilation)
					.alterAssetTags
					.tapPromise(this.constructor.name, async ({ assetTags }) => {
						const allTags = Object.keys(assetTags).reduce((rst, k) => rst.concat(assetTags[k]), []);
						addAttributes(allTags, options);
					});
			} else {
				compilation.hooks.htmlWebpackPluginAlterAssetTags.tapPromise(this.constructor.name, async ({ body, head }) => {
					const allTags = body.concat(head);
					addAttributes(allTags, options);
				});
			}
		});
	}
}

module.exports = HtmlTagAttributesPlugin;
