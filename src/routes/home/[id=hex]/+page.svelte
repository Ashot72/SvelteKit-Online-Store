<script lang="ts">
	import type { Home } from '$lib/types';
	import MainPage from '../../+page.svelte';

	export let data: Home;
</script>

<MainPage {data} />
