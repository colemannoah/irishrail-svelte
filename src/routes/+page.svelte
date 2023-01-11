<head>
	<title>Irish Rail Query</title>
</head>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	let resp: any = [];

	async function search(stationName: string) {
		const response = await fetch('/api/stations', {
			method: 'POST',
			body: JSON.stringify({ stationName: stationName }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const json = await response.json();
    resp = json.data;
	}

	let station: string = '';
	let hidden: boolean = true;
	
	export let data: PageData;
</script>

<!-- Add a div with a button in the corner to show a dropdown of all the station names -->
<div class="dropdown">
	<button type="button" class="dropdown-button" on:click={() => {hidden = !hidden}} aria-controls="content" aria-expanded={!hidden}>Show Stations</button>
	{#if !hidden}
		<div id="content" class="dropdown-content" transition:fade>
			<ul class="dropdown-list">
				{#each data.stations as station}
					<li>{station}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<div class="center-container">
	<div class="info">
		<img class="irishrail-logo" src="https://www.irishrail.ie/Content/Images/logo.svg" alt="Irish Rail Logo" width="200" />

		<p>Data is fetched from Irish Rail's realtime API </p>
		<a href="http://api.irishrail.ie/realtime/" target="_blank" rel="noreferrer">API Documentation</a>
	</div>

	<div class="input">
		<input
			class="station-input"
			type="text"
			bind:value={station}
			placeholder="Enter a train station"
		/>
		<button type="button" class="search" on:click={() => search(station)}>Search</button>
	</div>

  <div class="results">
    <ul class="station-info">
      {#if resp}
				{#each resp as station}
					<li class="station-info-piece">
						<h3>{station.name}</h3>
						<p>{station.address}</p>
					</li>
				{/each}					
			{:else}
				<li class="station-info-piece">
					<h3>No results available for {station} at this time</h3>
				</li>
			{/if}
    </ul>
  </div>
</div>

<style>
  * {
    font-family: 'Roboto', sans-serif;
  }

	.dropdown {
		position: relative;
	}

	.dropdown-button {
		position: absolute;
		top: 0;
		right: 0;
		padding: 1%;
		border: none;
		background-color: #fff;
		cursor: pointer;
	}

	.dropdown-content {
		position: absolute;
		top: 40px;
		right: 0;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 5px;
		transition: all 0.5s ease;
	}

	.dropdown-list {
		list-style: none;
		padding: 0;
	}

	.dropdown-list li {
		padding: 5px 10px;
	}

	.dropdown-list li:hover {
		background-color: #eee;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2%;
		font-size: 1.2rem;
	}

	.info a {
		text-decoration: underline;
		color: #000;
	}

	.center-container {
		display: flex;
    flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
    padding: 5%;
	}

	.station-input {
		width: 300px;
		height: 40px;
		font-size: 1.2rem;
		padding: 0 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.search {
		width: 100px;
		height: 40px;
		font-size: 1.2rem;
		margin-left: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #fff;
		cursor: pointer;
	}

  .station-info {
    list-style: none;
    padding: 0;
  }

  .station-info-piece {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

	.irishrail-logo {
		padding: 2.5%;
	}
</style>
