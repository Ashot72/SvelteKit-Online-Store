<script lang="ts">
	import type { Payment as DBPayment } from '@prisma/client';
	import Payment from './Payment.svelte';

	export let data: {
		payments: DBPayment[];
		total: number;
	};
</script>

<div class="container mt-2">
	{#if data.payments.length > 0}
		<div class="badge bg-primary text-wrap m-2 p-2">Total: ${data.total}</div>
	{/if}
	{#each data.payments as payment}
		<div class="card mb-3">
			<div class="badge bg-primary text-wrap m-2 p-2 align-self-end">
				{payment.dateAdded.toLocaleString()}
			</div>
			<Payment products={payment.products} />
		</div>
	{/each}
	{#if data.payments.length === 0}
		<div class="alert-message">
			<div class="alert alert-primary" role="alert">
				<h3>No Orders</h3>
			</div>
		</div>
	{/if}
</div>
