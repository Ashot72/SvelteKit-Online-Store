<script lang="ts">
	import type { CartProducts } from '@prisma/client';
	import type { Cart } from '$lib/types';
	import CartProduct from './CartProduct.svelte';

	export let products: CartProducts[];
	export let form: Cart;
</script>

{#each products as product}
	<CartProduct {product} {form} />
{/each}
