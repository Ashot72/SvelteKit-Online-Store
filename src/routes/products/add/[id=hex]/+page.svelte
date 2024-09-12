<script lang="ts">
	import type { Product as DBProduct } from '@prisma/client';
	import ProductForm from '$lib/components/Products/ProductForm.svelte';
	import Products from '$lib/components/Products/Products.svelte';
	import type { Product } from '$lib/types.js';

	export let data: { products: DBProduct[]; user: App.Locals['user']; categoryId: string };
	export let form: Product;

	export const snapshot = {
		capture: () => form,
		restore: (value: Product) => (form = value)
	};

	const title = 'Add Product';
</script>

<Products {data} />
<ProductForm {form} {title} categoryId={data.categoryId} />
