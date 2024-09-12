<script lang="ts">
	import type { Cart as DBCart } from '@prisma/client';
	import type { Cart as CartType } from '$lib/types';
	import Cart from '$lib/components/Cart/Cart.svelte';

	export let data: { cart: DBCart; total: number; user: App.Locals['user'] };

	export let form: CartType;
</script>

<Cart {data} {form} />
