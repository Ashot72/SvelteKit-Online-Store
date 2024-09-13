<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let name = $page?.data?.term;

	$: user = $page?.data?.user as App.Locals['user'];
	$: pathname = $page?.data?.pathname as string;
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="container-fluid">
		<!--  svelte-ignore a11y-invalid-attribute-->
		<a class="navbar-brand" href="">
			<div style="margin-left: 250px"></div>
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a href="/" class={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</a>
				</li>
				{#if user}
					<li class="nav-item">
						<a href="/categories" class={`nav-link ${pathname === '/categories' ? 'active' : ''}`}>
							Categories{' '}
						</a>
					</li>
				{/if}

				{#if user}
					<li class="nav-item">
						<a href="/cart" class={`nav-link ${pathname === '/cart' ? 'active' : ''}`}>
							Shopping Cart
						</a>
					</li>
				{/if}
				{#if user}
					<li class="nav-item">
						<a href="/orders" class={`nav-link ${pathname === '/orders' ? 'active' : ''}`}>
							Orders
						</a>
					</li>
				{/if}
				<li class="nav-item ms-3" id="search">
					<input
						on:change={() => {
							if (!name) {
								goto('/');
							} else {
								goto(`/?term=${name}`);
							}
						}}
						style="width: 200px"
						type="search"
						id="term"
						name="term"
						placeholder="Search"
						class="form-control"
						bind:value={name}
					/>
				</li>
			</ul>
			<ul class="navbar-nav ms-auto">
				{#if user}
					<li>
						<form method="POST" action="/auth/logout">
							<button class="btn btn-link nav-link">
								{user.email} | Sign Out
							</button>
						</form>
					</li>
				{:else}
					<li class="nav-item dropdown">
						<!--  svelte-ignore a11y-invalid-attribute-->
						<a
							class="nav-link dropdown-toggle"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							href=""
						>
							Account
						</a>

						<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
							<li>
								<a id="signin" class="dropdown-item" href="/auth/login"> Log In </a>
							</li>
							<li>
								<a id="signup" class="dropdown-item" href="/auth/register"> Sign Up </a>
							</li>
						</ul>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
