<script lang="ts">
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { lnToBr } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import type { Product as DBProduct } from '@prisma/client';

	export let product: DBProduct;
	export let userId: string;

	let loading = false;

	const action: SubmitFunction = (input) => {
		loading = true;

		return async ({ result }: { result: ActionResult }) => {
			await applyAction(result);
			if (result.type !== 'redirect') {
				loading = false;
			}
		};
	};
</script>

<div class="card mb-3">
	<div class="card-body">
		<div class="me-3">
			<div class="d-flex justify-content-between align-items-center">
				<img alt="" src={product.picture} class="img-fluid" style="width: 150px" />
				<div class="mx-5">
					<h5 class="text-primary">{product.name}</h5>
					<div class="text-secondary">
						{@html lnToBr(product?.description)}
					</div>
					<div class="fw-bold mb-0 pe-3 mt-2">
						Price: ${product.price}
					</div>
					<div class="mb-0 pe-3">Qty: {product.count}</div>
				</div>
				{#if userId}
					<div class="text-end">
						<form action="/cart/action?/add" method="POST" use:enhance={action}>
							<input type="hidden" name="id" value={product.id} />
							<button type="submit" class="btn btn-primary text-nowrap">
								{#if !loading}
									Add to Cart
								{:else}
									<span>Wait...</span>
								{/if}
							</button>
						</form>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
