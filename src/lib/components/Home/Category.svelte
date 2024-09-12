<script lang="ts">
	import { goto } from '$app/navigation';
	import { lnToBr } from '$lib/utils';

	export let category;
	export let categoryId;
	export let count;
</script>

<li
	class="list-group-item d-flex justify-content-between align-items-start"
	style="cursor: pointer"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="ms-2 me-auto" on:click={() => goto(`/home/${category.id}`)}>
		<div class="fw-bold">{category.name}</div>
		{@html lnToBr(category?.description)}
	</div>
	{#if categoryId === category.id}
		<span class="badge bg-primary rounded-pill">
			{count}
		</span>
	{/if}
</li>
