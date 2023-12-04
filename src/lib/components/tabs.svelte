<script lang="ts">
  import { page } from "$app/stores";

  export let active: number = 0;
  export let navs: string[] = [];
  export let tabContent: boolean = false;
  export let tabNav: boolean = true;
  $: pathname = $page.url.pathname.split("/").pop();
</script>

{#if tabNav}
    <div class="tabs">
  {#each navs as nav, i}
    <a
      href={`/generator/${nav.toLowerCase()}`}
      class:tab-active={pathname === nav.toLowerCase()}
      class="tab tab-bordered mr-6"
      on:click={() => (active = i)}
    >
      <span class="capitalize">
        {nav}
      </span>
    </a>
  {/each}
</div>
{/if}


{#if tabContent}
  <div class="w-full">
    <slot {active}/>
  </div>
{/if}
