<script lang="ts">
	import type { Product as DBProduct } from '@prisma/client';
	import type { Product } from '$lib/types';
	import ProductComp from './Product.svelte';

	export let data: { products: DBProduct[]; user: App.Locals['user']; categoryId: string };
	export let form: Product | undefined = undefined;
</script>

<div class="container">
	<div class="py-3">
		<a href={`/products/add/${data.categoryId}`} class="text-decoration-none">New Product</a>
	</div>
	<table class="table align-middle mb-0 bg-white">
		<thead class="bg-light">
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th class="text-center">Price</th>
				<th class="text-center">Count</th>
				<th class="text-center">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.products as product}
				<tr>
					{#if form}
						<ProductComp {form} {product} userId={data.user.id} />
					{:else}
						<ProductComp {product} userId={data.user.id} />
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
