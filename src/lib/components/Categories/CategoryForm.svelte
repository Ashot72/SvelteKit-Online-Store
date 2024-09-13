<script lang="ts">
	import type { ActionResult, Snapshot, SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Category } from '$lib/types.js';

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
</script>

<div>
	<div class="modal-backdrop fade show" style="display:block;"></div>
	<div class="modal fade show" tabindex="-1" style="display:block;">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{title}</h5>
				</div>
				<div class="modal-body">
					<form
						class="mx-1 mx-md-4"
						action={title === 'Add Category'
							? '/categories/action?/add'
							: '/categories/action?/update'}
						method="POST"
						use:enhance={action}
					>
						<input type="hidden" name="id" value={form?.data?.id ?? data?.category?.id} />
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
									value={form?.data?.name ?? data?.category?.name ?? ''}
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
									>{form?.data?.description ?? data?.category?.description ?? ''}</textarea
								>
							</div>
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn btn-primary">
								{#if !loading}
									<span class="btn-content">{title}</span>
								{:else}
									<span>Wait...</span>
								{/if}
							</button>
							<button type="button" class="btn btn-secondary" on:click={() => goto('/categories')}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
