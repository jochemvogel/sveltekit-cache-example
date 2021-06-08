import { api } from './_api';

export const get = async (request) => {
	const response = await api(request, `posts/${request.params.post}`);
	return response;
};
