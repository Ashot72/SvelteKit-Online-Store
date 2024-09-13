<script lang="ts">
	import CategoryForm from '$lib/components/Categories/CategoryForm.svelte';
	import Categories from '$lib/components/Categories/Categories.svelte';
	import type { Category } from '$lib/types.js';

	export let form: Category;

	export const snapshot = {
		capture: () => form,
		restore: (value: Category) => (form = value)
	};

	const title = 'Update Category';
</script>

<Categories />
<CategoryForm {title} {form} />
