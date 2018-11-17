export default class HtmlWebpackTagAttrPlugin {
	constructor(options: {
		script?: object | {
			(tag: {
				tagName: string,
				attributes: object
			}): object;
		},
		link?: object | {
			(tag: {
				tagName: string,
				attributes: object
			}): object;
		},
		meta?: object | {
			(tag: {
				tagName: string,
				attributes: object
			}): object;
		}
	});
}
