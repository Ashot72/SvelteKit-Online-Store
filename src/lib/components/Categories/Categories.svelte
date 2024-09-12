<script lang="ts">
	import type { Category as DBCategory } from '@prisma/client';
	import type { Category } from '$lib/types';
	import CategoryComp from './Category.svelte';

	export let data: { categories: DBCategory[]; user: App.Locals['user'] };
	export let form: Category | undefined = undefined;
</script>

<div class="container">
	<div class="py-3">
		<a href="/categories/add" class="text-decoration-none">New Category</a>
	</div>
	<table class="table align-middle mb-0 bg-white">
		<thead class="bg-light">
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th class="text-center">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.categories as category}
				<tr>
					{#if form}
						<CategoryComp {form} {category} userId={data.user.id} />
					{:else}
						<CategoryComp {category} userId={data.user.id} />
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
