<script lang="ts">
	import type { Home } from '$lib/types';
	import Categories from '$lib/components/Home/Categories.svelte';
	import Products from '$lib/components/Home/Products.svelte';

	export let data: Home;
</script>

<div class="d-flex container">
	<Categories {data} />
	<Products {data} />
</div>
