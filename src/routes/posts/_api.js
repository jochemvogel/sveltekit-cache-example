export async function api(request, resource, data) {
	const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json',
		},
		body: data && JSON.stringify(data),
	});

	return {
		status: res.status,
		body: await res.json(),
	};
}
