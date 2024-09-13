<script lang="ts">
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let title: string;
	// for exported for snapshot
	export let form;

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
						action={title === 'Sign In' ? '/auth?/login' : '/auth?/register'}
						method="POST"
						use:enhance={action}
					>
						<div class="d-flex flex-row align-items-center mb-4">
							<i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
							<div class="form-outline flex-fill mb-0">
								{#if form?.errors && form?.errors?.form}
									<div class="alert alert-danger" role="alert">
										{form.errors.form.join(', ')}
									</div>
								{/if}
								{#if form?.errors && form?.errors?.email}
									<div class="alert alert-danger" role="alert">
										{form.errors.email.join(', ')}
									</div>
								{/if}
								<!-- svelte-ignore a11y-autofocus -->
								<input
									autofocus
									type="email"
									id="email"
									name="email"
									placeholder="Email"
									class="form-control"
									value={form?.data?.email ?? ''}
									required
								/>
							</div>
						</div>
						<div class="d-flex flex-row align-items-center mb-4">
							<i class="fas fa-lock fa-lg me-3 fa-fw"></i>
							<div class="form-outline flex-fill mb-0">
								{#if form?.errors && form?.errors?.password}
									<div class="alert alert-danger" role="alert">
										{form?.errors.password.join(', ')}
									</div>
								{/if}
								<input
									type="password"
									id="password"
									name="password"
									placeholder="Password"
									class="form-control"
									value={form?.data?.password ?? ''}
									required
								/>
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
							<button type="button" class="btn btn-secondary" on:click={() => goto('/')}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
