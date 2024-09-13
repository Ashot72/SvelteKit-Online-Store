<script lang="ts">
	import ProductForm from '$lib/components/Products/ProductForm.svelte';
	import Products from '$lib/components/Products/Products.svelte';
	import type { Product } from '$lib/types.js';

	export let form: Product;

	export const snapshot = {
		capture: () => form,
		restore: (value: Product) => (form = value)
	};

	const title = 'Add Product';
</script>

<Products />
<ProductForm {title} />
