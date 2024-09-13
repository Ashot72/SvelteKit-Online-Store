<script lang="ts">
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import type { Auth } from '$lib/types';
	import MainPage from '../../+page.svelte';

	export let form: Auth;
	const title = 'Sign Up';

	export const snapshot = {
		capture: () => form,
		restore: (value: Auth) => (form = value)
	};
</script>

<MainPage />
<AuthForm {title} />
