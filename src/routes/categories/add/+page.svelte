<script lang="ts">
	import type { Category as DBCategory } from '@prisma/client';
	import CategoryForm from '$lib/components/Categories/CategoryForm.svelte';
	import Categories from '$lib/components/Categories/Categories.svelte';
	import type { Category } from '$lib/types.js';

	export let data: { categories: DBCategory[]; user: App.Locals['user'] };

	export let form: Category;
	const title = 'Add Category';

	export const snapshot = {
		capture: () => form,
		restore: (value: Category) => (form = value)
	};
</script>

<Categories {data} />
<CategoryForm {form} {title} />
