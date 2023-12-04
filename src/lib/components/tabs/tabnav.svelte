<script lang="ts">
  import { page } from "$app/stores";

  export let active: number;
  export let titles: string[];
  $: pathname = $page.url.pathname.split("/").pop();
  // $: console.log({ pathname: $page.url.pathname.split("/").pop() });
</script>

<div class="tabs">
  {#each titles as title, i}
    <a
      href={`/generator/${title.toLowerCase()}`}
      class:tab-active={pathname === title.toLowerCase()}
      class="tab tab-bordered mr-6"
      on:click={() => (active = i)}
    >
      <span class="capitalize">
        {title}
      </span>
    </a>
  {/each}
</div>


