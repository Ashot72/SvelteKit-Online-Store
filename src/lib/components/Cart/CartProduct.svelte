<script lang="ts">
	import type { CartProducts } from '@prisma/client';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

	export let product: CartProducts;
	$: form = $page.form;

	let loadingPlus = false;
	let loadingMinus = false;
	let loadingDelete = false;

	const action: SubmitFunction = (input) => {
		const add = input.formData.get('add') as string;

		if (!add) {
			let text = 'Are you sure you want to delete the item?';
			if (confirm(text) == true) {
				const add = input.formData.get('add') as string;
				loadingDelete = true;
			} else {
				input.cancel();
			}
		} else {
			if (add === 'true') {
				loadingPlus = true;
			} else {
				loadingMinus = true;
			}
		}

		return async ({ result }: { result: ActionResult }) => {
			await applyAction(result);
			loadingPlus = false;
			loadingMinus = false;
			loadingDelete = false;
		};
	};
</script>

<div class="card mb-3">
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
					<div class="small mb-0 text-secondary">{product.description}</div>
					<div class="fw-bold mb-0 pe-3">Price: ${product.price}</div>
				</div>
			</div>
			<div class="d-flex flex-row align-items-center">
				{#if form?.errors && form?.errors?.form && form?.data?.id === product.id}
					<div class="alert alert-danger m-1" role="alert">
						{form.errors.form.join(', ')}
					</div>
				{/if}
			</div>
			<div class="d-flex flex-row align-items-center">
				<div style="width: 150px" class="d-flex flex-row">
					<div>
						<form action="/cart/action?/addremove" method="POST" use:enhance={action}>
							<input type="hidden" name="id" value={product.id} />
							<input type="hidden" name="add" value="false" />
							<button class="btn btn-link text-decoration-none" style="margin-top: -5px">
								{#if !loadingMinus}
									<i class="fas fa-minus"></i>
								{:else}
									<span class="text-decoration-none">Wait...</span>
								{/if}
							</button>
						</form>
					</div>
					<h5 class="fw-normal mb-0 px-1">{product.qty}</h5>
					<div>
						<form action="/cart/action?/addremove" method="POST" use:enhance={action}>
							<input type="hidden" name="id" value={product.id} />
							<input type="hidden" name="add" value="true" />
							<button class="btn btn-link text-decoration-none" style="margin-top: -5px">
								{#if !loadingPlus}
									<i class="fas fa-plus"></i>
								{:else}
									<span class="text-decoration-none">Wait...</span>
								{/if}
							</button>
						</form>
					</div>
				</div>
				<form action="/cart/action?/delete" method="POST" use:enhance={action}>
					<input type="hidden" name="id" value={product.id} />
					<button class="btn btn-link text-decoration-none" style="margin-top: -8px">
						{#if !loadingDelete}
							<i class="fas fa-trash-alt"></i>
						{:else}
							<span class="text-decoration-none">Wait...</span>
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
