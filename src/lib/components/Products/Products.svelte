<script lang="ts">
	import { page } from '$app/stores';
	import ProductComp from './Product.svelte';

	$: data = $page.data;
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
					<ProductComp {product} userId={data.user.id} />
				</tr>
			{/each}
		</tbody>
	</table>
</div>
