<script lang="ts">
	import { page } from '$app/stores';
	import ProductComp from './Product.svelte';

	const data = $page.data;
</script>

<span class="w-100">
	<div>
		{#if data.products.length > 0}
			<div class="px-2 py-2">
				{#each data.products as product}
					<ProductComp {product} userId={data.user?.id} />
				{/each}
			</div>
		{/if}
	</div>
</span>
