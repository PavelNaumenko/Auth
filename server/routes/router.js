export default function createRouter(arr, router) {

	for (let i = 0; i < arr.length; i++) {

		let route = arr[i];

		router[route.method](route.url, route.action);

	}

	return router;

}
