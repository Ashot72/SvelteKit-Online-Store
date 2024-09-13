<script lang="ts">
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let title: string;

	// for exported for snapshot
	export let form;
	$: data = $page.data;

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

	const getImage = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				const result = reader.result;

				const base64 = document.getElementById('base64') as HTMLImageElement;
				const picture = document.getElementById('picture') as HTMLInputElement;

				base64.src = result as string;
				picture.value = result as string;
			},
			false
		);

		if (file) {
			reader.readAsDataURL(file);
		}
	};
</script>

<div>
	<div class="modal-backdrop fade show" style="display:block;"></div>
	<div id="modal" class="modal fade show" tabindex="-1" style="display:block;">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{title}</h5>
				</div>

				<div class="modal-body">
					<form
						enctype="multipart/form-data"
						class="mx-1 mx-md-4"
						action={title === 'Add Product' ? '/products/action?/add' : '/products/action?/update'}
						method="POST"
						use:enhance={action}
					>
						<input type="hidden" name="id" value={form?.data?.id ?? data?.product?.id} />
						<input
							type="hidden"
							id="picture"
							name="picture"
							value={form?.data?.picture ?? data?.product?.picture}
						/>
						<input type="hidden" id="categoryId" name="categoryId" value={data?.categoryId} />
						<div class="d-flex flex-row align-items-center mb-4">
							<div class="form-outline flex-fill mb-0">
								{#if form?.errors && form?.errors?.form}
									<div class="alert alert-danger" role="alert">
										{form.errors.form.join(', ')}
									</div>
								{/if}
								{#if form?.errors && form?.errors?.name}
									<div class="alert alert-danger" role="alert">
										{form.errors.name.join(', ')}
									</div>
								{/if}
								<!-- svelte-ignore a11y-autofocus -->
								<input
									autofocus
									required
									type="text"
									id="name"
									name="name"
									placeholder="Name"
									class="form-control"
									value={form?.data?.name ?? data?.product?.name ?? ''}
								/>
							</div>
						</div>
						<div class="d-flex flex-row align-items-center mb-4">
							<div class="form-outline flex-fill mb-0">
								{#if form?.errors && form?.errors?.description}
									<div class="alert alert-danger" role="alert">
										{form.errors.description.join(', ')}
									</div>
								{/if}
								<textarea
									required
									id="description"
									name="description"
									placeholder="Description"
									rows="4"
									class="form-control"
									>{form?.data?.description ?? data?.product?.description ?? ''}</textarea
								>
							</div>
						</div>

						<div class="d-flex flex-row align-items-center mb-4">
							<div class="form-outline flex-fill mb-0">
								{#if form?.errors && form?.errors?.price}
									<div class="alert alert-danger" role="alert">
										{form.errors.price.join(', ')}
									</div>
								{/if}
								<input
									required
									type="text"
									id="price"
									name="price"
									placeholder="Price"
									class="form-control"
									value={form?.data?.price ?? data?.product?.price ?? ''}
								/>
							</div>
						</div>

						<div class="d-flex flex-row align-items-center mb-4">
							<div class="form-outline flex-fill mb-0">
								{#if form?.errors && form?.errors?.count}
									<div class="alert alert-danger" role="alert">
										{form.errors.count.join(', ')}
									</div>
								{/if}
								<input
									required
									type="text"
									id="count"
									name="count"
									placeholder="Count"
									class="form-control"
									value={form?.data?.count ?? data?.product?.count ?? ''}
								/>
							</div>
						</div>

						<div class="d-flex flex-row align-items-center mb-4">
							<div class="form-outline flex-fill mb-0">
								{#if form?.errors && form?.errors?.picture}
									<div class="alert alert-danger" role="alert">
										{form.errors.picture.join(', ')}
									</div>
								{/if}
								<input
									type="file"
									id="image"
									name="image"
									placeholder="Image"
									class="form-control"
									accept="image/png, image/jpeg"
									on:change={(e) => getImage(e)}
								/>
							</div>
						</div>
						<div class="text-center mb-2">
							<img
								alt=""
								id="base64"
								style="max-width: 420px"
								src={form?.data?.picture ?? data?.product?.picture ?? ''}
							/>
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn btn-primary">
								{#if !loading}
									<span class="btn-content">{title}</span>
								{:else}
									<span>Wait...</span>
								{/if}
							</button>
							<button
								on:click={() => goto(`/products/${data?.categoryId ?? ''}`)}
								id="cancel-btn"
								type="button"
								class="btn btn-secondary"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
