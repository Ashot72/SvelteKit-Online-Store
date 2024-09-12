<script lang="ts">
	import type { Category as DBCategory } from '@prisma/client';
	import CategoryForm from '$lib/components/Categories/CategoryForm.svelte';
	import Categories from '$lib/components/Categories/Categories.svelte';
	import type { Category } from '$lib/types.js';

	export let data: { categories: DBCategory[]; category: DBCategory; user: App.Locals['user'] };
	export let form: Category;

	export const snapshot = {
		capture: () => form,
		restore: (value: Category) => (form = value)
	};

	let editData: Category;

	if (data.category) {
		const { id, name, description } = data.category;
		editData = { data: { id, name, description } } as Category;
	}

	const title = 'Update Category';
</script>

<Categories {data} />
<CategoryForm form={{ ...editData, ...form }} {title} />
