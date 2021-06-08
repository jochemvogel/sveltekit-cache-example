<script context="module">

	export const load = async ({ page, fetch }) => {
		try {
			const res = await fetch(`/posts/${page.params.post}.json`);

			if (res.ok) {
				const post = await res.json();

				return {
					props: {
						post
					}
				};
			}

			const { message } = await res.json();

			return {
				error: new Error(message),
				status: res.status
			};
		} catch (error) {
			console.log(error)
		}
	};
</script>

<script>
    export let post;
</script>


<h1>Post</h1>

<a href="/posts">&larr; Go back</a>

<h2>{post.title}</h2>
<p>{post.body}</p>