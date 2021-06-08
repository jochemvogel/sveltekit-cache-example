<script context="module">
import Post from "./[post].svelte";

	export const load = async ({ page, fetch }) => {
		try {
			const res = await fetch('posts.json');

			if (res.ok) {
				const posts = await res.json();

				return {
					props: {
						posts,
					}
				};
			}

			return {
				props: {
					status: res.status,
					error: await res.json(),
				}
			};
		} catch (error) {
			return {
				status: 500,
				error
			};
		}
	};
</script>

<script>
    export let posts;


</script>

<h1>Posts</h1>

{#each posts as post}
    {#if post.id < 11}
    <article>
        <h1>{post.title}</h1>
        <a href="/posts/{post.id}">View post &rarr;</a>
    </article>
    {/if}
{/each}


<style>

article {
    background-color: #fff;
    padding: 1em;
    border-radius: 1em;
    margin: 1em 0;
}

</style>