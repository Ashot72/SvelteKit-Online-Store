<script lang="ts">
	import type { Product as DBProduct } from '@prisma/client';
	import ProductComp from './Product.svelte';

	export let data: { products: DBProduct[]; user: App.Locals['user'] };
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
