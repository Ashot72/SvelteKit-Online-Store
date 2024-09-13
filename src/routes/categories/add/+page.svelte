<script lang="ts">
	import CategoryForm from '$lib/components/Categories/CategoryForm.svelte';
	import Categories from '$lib/components/Categories/Categories.svelte';
	import type { Category } from '$lib/types.js';

	export let form: Category;
	const title = 'Add Category';

	export const snapshot = {
		capture: () => form,
		restore: (value: Category) => (form = value)
	};
</script>

<Categories />
<CategoryForm {title} />
