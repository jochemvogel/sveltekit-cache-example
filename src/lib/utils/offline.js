/**
 * Adds the `offline` property to an single post, based on the posts cached status
 * @param post a post
 * @returns A promise that resolves to the post with a `offline` property
 */
export function patchSinglePostOfflineStatus(post) {
	return caches
		.open('postsCache')
		.then((cache) => {
			return cache.match(`/posts/${post.id}.json`);
		})
		.then((response) => {
			if (response) post.offline = true;
			else post.offline = false;
			return post;
		});
}

/**
 * Adds the `offline` property to an array of posts, based on their cached status returns only offline posts when `appOffline = true`
 * @param posts An array of posts
 * @param appOffline A boolean wether the app is offline, filtering out posts that are not cached
 * @returns A promise that resolves to posts with an `offline` property and only offline posts when `appOffline = true`
 */
export function patchAllpostsOfflineStatus(posts, appOffline) {
	return Promise.all(posts.map(patchSingleGameOfflineStatus)).then((posts) =>
		appOffline ? posts.filter((post) => post.offline) : posts
	);
}

/**
 * Saves a post in the cache based on its id
 * @param id the id of the post to save
 * @returns True if saved to cache, false on error
 */
export function saveInCache(id) {
	return Promise.all([
		caches.open('postsCache').then((cache) => cache.add(`/posts/${id}.json`)),
		caches.open('postsCacheSSR').then((cache) => cache.add(`/posts/${id}`)),
	])
		.then(() => true)
		.catch(() => false);
}

/**
 * Deletes a post in the cache based on its id
 * @param id the id of the post to save
 * @returns True if deleted and false if not
 */
export function deleteInCache(id) {
	return Promise.all([
		caches
			.open('postsCache')
			.then((cache) => cache.delete(`/posts/${id}.json`)),
		caches.open('postsCacheSSR').then((cache) => cache.delete(`/posts/${id}`)),
	]).then(([dataSuccess, ssrSuccess]) => dataSuccess && ssrSuccess);
}
