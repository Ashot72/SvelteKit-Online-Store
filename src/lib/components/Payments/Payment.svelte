<script lang="ts">
	import type { CartProducts as DBCardProducts } from '@prisma/client';

	export let products: DBCardProducts[];
</script>

{#each products as product, index}
	<div class="card-body">
		<div class="d-flex justify-content-between">
			<div class="d-flex flex-row">
				<div>
					<img src={product.picture} alt={product.name} style="max-width: 420px" />
				</div>
			</div>
			<div class="d-flex flex-row align-items-center">
				<div class="ms-3">
					<h5 class="text-primary">{product.name}</h5>
					<div class="small mb-0 text-secondary">
						{product.description}
					</div>
					<div class="fw-bold mb-0 pe-3">Price: ${product.price}</div>
				</div>
			</div>
			<div class="d-flex flex-row align-items-center">
				<div style="width: 150px" class="d-flex flex-row">
					<h5 class="fw-normal mb-0">Qty: {product.qty}</h5>
				</div>
			</div>
		</div>
		{#if products.length > 1 && index < products.length - 1}
			<hr />
		{/if}
	</div>
{/each}
