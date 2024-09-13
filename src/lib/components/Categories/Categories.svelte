<script lang="ts">
	import { page } from '$app/stores';
	import CategoryComp from './Category.svelte';

	$: data = $page.data;
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
					<CategoryComp {category} userId={data.user.id} />
				</tr>
			{/each}
		</tbody>
	</table>
</div>
