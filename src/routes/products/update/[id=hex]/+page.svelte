<script lang="ts">
	import type { Product } from '$lib/types.js';
	import ProductForm from '$lib/components/Products/ProductForm.svelte';
	import Products from '$lib/components/Products/Products.svelte';

	export let form: Product;

	export const snapshot = {
		capture: () => form,
		restore: (value: Product) => (form = value)
	};

	const title = 'Update Product';
</script>

<Products />
<ProductForm {title} {form} />
