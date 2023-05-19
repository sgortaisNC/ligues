export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.ab3214c7.js","app":"_app/immutable/entry/app.4ff97239.js","imports":["_app/immutable/entry/start.ab3214c7.js","_app/immutable/chunks/index.aee2c512.js","_app/immutable/chunks/singletons.bde56e73.js","_app/immutable/entry/app.4ff97239.js","_app/immutable/chunks/index.aee2c512.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
