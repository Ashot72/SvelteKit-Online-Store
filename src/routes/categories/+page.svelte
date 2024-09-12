<script lang="ts">
	import type { Category as DBCategory } from '@prisma/client';
	import Categories from '$lib/components/Categories/Categories.svelte';
	import type { Category } from '$lib/types';

	export let data: { categories: DBCategory[]; user: App.Locals['user'] };
	export let form: Category;
</script>

<Categories {form} {data} />
