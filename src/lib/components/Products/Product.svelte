<script lang="ts">
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import type { Product as DBProduct } from '@prisma/client';
	import { lnToBr } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let product: DBProduct;
	export let userId: string;
	$: form = $page.form;

	let loading = false;

	const action: SubmitFunction = (input) => {
		let text = 'Are you sure you want to delete the product?';
		if (confirm(text) == true) {
			loading = true;
		} else {
			input.cancel();
		}

		return async ({ result }: { result: ActionResult }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<td>
	<div class="fw-bold mb-1">{product?.name}</div>
</td>
<td>
	<div class="mb-1">
		{@html lnToBr(product?.description)}
	</div>
</td>
<td class="text-center">
	<div class="mb-1">${product?.price}</div>
</td>
<td class="text-center">
	<div class="mb-1">{product?.count}</div>
</td>
<td>
	<div class="d-flex justify-content-center">
		<button
			disabled={product?.userId !== userId}
			type="button"
			class="btn btn-primary btn-sm btn-rounded"
			on:click={() => goto(`/products/update/${product.categoryId}`)}
		>
			Edit
		</button>&nbsp;
		<form action="/products/action?/delete" method="POST" use:enhance={action}>
			<input type="hidden" name="id" value={product.id} />
			<button
				disabled={product?.userId !== userId}
				type="submit"
				class="btn btn-primary btn-sm btn-rounded"
			>
				{#if !loading}
					Delete
				{:else}
					<span>Wait...</span>
				{/if}
			</button>
			{#if form?.errors && form?.errors?.form}
				<div class="alert alert-danger" role="alert">
					{form.errors.form.join(', ')}
				</div>
			{/if}
		</form>
	</div>
</td>
