<script lang="ts">
	import type { Product as DBProduct } from '@prisma/client';
	import Products from '$lib/components/Products/Products.svelte';
	import type { Product } from '$lib/types';

	export let data: { products: DBProduct[]; user: App.Locals['user']; categoryId: string };
	export let form: Product;
</script>

<Products {form} {data} />
