<script lang="ts">
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import type { Auth, Home } from '$lib/types';
	import MainPage from '../../+page.svelte';

	export let form: Auth;
	const title = 'Sign In';

	export let data: Home;

	export const snapshot = {
		capture: () => form,
		restore: (value: Auth) => (form = value)
	};
</script>

<MainPage {data} />
<AuthForm {form} {title} />
