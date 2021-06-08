<script>
	import { saveInCache, deleteInCache } from '$lib/Utils/offline';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	export let offline;
	export let id;

	async function downloadGame() {
		saveInCache(id).then(() => dispatcher('saved'));
	}

	async function deleteGame() {
		deleteInCache(id).then(() => dispatcher('deleted'));
	}
</script>

{#if offline}
	<button on:click={deleteGame}>Remove download</button>
{:else}
	<button on:click={downloadGame}>Download post</button>
{/if}
