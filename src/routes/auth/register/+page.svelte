<script lang="ts">
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import type { Home, Auth } from '$lib/types';
	import MainPage from '../../+page.svelte';

	export let form: Auth;
	const title = 'Sign Up';

	export let data: Home;

	export const snapshot = {
		capture: () => form,
		restore: (value: Auth) => (form = value)
	};
</script>

<MainPage {data} />
<AuthForm {form} {title} />
