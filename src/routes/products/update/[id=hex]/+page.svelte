<script lang="ts">
	import type { Product } from '$lib/types.js';
	import type { Product as DBProduct } from '@prisma/client';
	import ProductForm from '$lib/components/Products/ProductForm.svelte';
	import Products from '$lib/components/Products/Products.svelte';

	export let data: {
		products: DBProduct[];
		product: DBProduct;
		user: App.Locals['user'];
		categoryId: string;
	};
	export let form: Product;

	export const snapshot = {
		capture: () => form,
		restore: (value: Product) => (form = value)
	};

	let editData: Product;

	if (data.product) {
		const { id, name, description, price, count, picture } = data.product;
		editData = { data: { id, name, description, price, count, picture } } as Product;
	}

	const title = 'Update Product';
</script>

<Products {data} />
<ProductForm form={{ ...editData, ...form }} {title} categoryId={data.categoryId} />
