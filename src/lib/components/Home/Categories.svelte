<script lang="ts">
	import { page } from '$app/stores';
	import type { Home } from '$lib/types';
	import CategoryComp from './Category.svelte';

	export let data: Home;
	$: count = data.products.length;

	$: categoryId =
		$page.url.pathname === '/' ? data?.categories[0]?.id : $page.url.pathname.replace('/home/', '');
</script>

<div class="py-2" style="width: 385px">
	<ul class="list-group">
		{#each data.categories as category}
			<CategoryComp {category} {categoryId} {count} />
		{/each}
	</ul>
</div>
