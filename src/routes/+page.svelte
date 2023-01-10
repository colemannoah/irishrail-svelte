<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="center-container">
  <input class="station-input" type="text" placeholder="Enter a train station" />
  <button class="search">Search</button>
</div>

<style>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
</style>