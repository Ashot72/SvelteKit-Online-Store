<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Checkout from '$lib/components/Cart/Checkout'; // must be imported
	import CartProducts from './CartProducts.svelte';

	$: data = $page.data;
	$: form = $page.form;
</script>

<div class="container mt-2" id="cart">
	{#if data.cart}
		<CartProducts products={data.cart.products} {form} />
		<div class="card mb-3">
			<div class="me-3">
				<div
					class="d-flex justify-content-end align-items-center"
					style="height: 72px; margin-right: 16px"
				>
					<div style="margin-right: 10px">
						Total:&nbsp;
						<b>
							<span id="total">${data.total}</span>
						</b>
					</div>
					&nbsp;
					{#if browser}
						<react:Checkout email={data.user.email} total={data.total} userId={data.user.id} />
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="alert-message">
			<div class="alert alert-primary" role="alert">
				<h3>No Items</h3>
			</div>
		</div>
	{/if}
</div>
