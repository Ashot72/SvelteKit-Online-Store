<script lang="ts">
	import type { CartProducts } from '@prisma/client';
	import CartProduct from './CartProduct.svelte';

	export let products: CartProducts[];
</script>

{#each products as product}
	<CartProduct {product} />
{/each}
