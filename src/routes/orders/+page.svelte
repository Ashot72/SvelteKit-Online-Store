<script lang="ts">
	import type { Payment as DBPayment } from '@prisma/client';
	import Payments from '$lib/components/Payments/Payments.svelte';

	export let data: {
		payments: DBPayment[];
		total: number;
	};
</script>

<Payments {data} />
