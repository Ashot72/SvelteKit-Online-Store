<script lang="ts">
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import type { Category } from '$lib/types';
	import type { Category as DBCategory } from '@prisma/client';
	import { lnToBr } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let category: DBCategory;
	export let userId: string;

	export let form: Category | undefined = undefined;

	let loading = false;

	const action: SubmitFunction = (input) => {
		let text = 'Are you sure you want to delete the category?';
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

<td style="width: 33%">
	<div class="fw-bold mb-1">{category?.name}</div>
</td>
<td style="width: 33%">
	<div class="mb-1">
		{@html lnToBr(category?.description)}
	</div>
</td>
<td>
	<div class="d-flex justify-content-center">
		<button
			disabled={category?.userId !== userId}
			type="button"
			class="btn btn-primary btn-sm btn-rounded"
			on:click={() => goto(`/categories/update/${category.id}`)}
		>
			Edit
		</button>&nbsp;
		<form action="/categories/action?/delete" method="POST" use:enhance={action}>
			<input type="hidden" name="id" value={category.id} />
			<button
				disabled={category?.userId !== userId}
				type="submit"
				class="btn btn-primary btn-sm btn-rounded"
			>
				{#if !loading}
					Delete
				{:else}
					<span>Wait...</span>
				{/if}
			</button>
			{#if form?.errors && form?.errors?.form && form?.data?.id === category.id}
				<div class="alert alert-danger m-1" role="alert">
					{form.errors.form.join(', ')}
				</div>
			{/if}
		</form>
		&nbsp;
		<button
			type="button"
			class="btn btn-primary btn-sm btn-rounded"
			on:click={() => goto(`/products/${category.id}`)}
		>
			View Products
		</button>
	</div>
</td>
