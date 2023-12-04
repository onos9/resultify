<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { Rating, Remark, Scores, StudentInfo } from "$lib/components/result";
  import Records from "$lib/components/result/records.svelte";
  import { configs } from "$lib/stores/configs";
  import { results, students, result, student, classDetail } from "$lib/stores/data_store";
  import { user } from "$lib/stores/user";
  import SelectStudent from "./select_student.svelte";

  let frame: HTMLIFrameElement;
  const onPrint = () => {
    // goto(`/print?id=${$student.id}&remoteId=${$rStudent?.id}`);
    // return;
    const params = `?&id=${$student?.id}`;
    window.history.pushState(null, $student?.full_name as string, `${$page.url.href}${params}`);

    frame.src = `/print${params}`;
    frame.onload = () => {
      const content = frame.contentWindow;
      if (!content) return;
      content.focus();
      content.print();
      content.onafterprint = () =>
        window.history.pushState(null, $student?.full_name as string, $page.url.href);
    };
  };

  const newResult = () => {
    return async ({ result, update }: any) => {
      await update();
      if (result.data)
        $result = $results.find((res) => res.id == result?.data?.id) as typeof $result;
    };
  };
</script>

<iframe hidden class="w-full h-screen" bind:this={frame} title="printf" />

{#if $student?.id}
  <div class="flex w-full justify-end mb-3">
     <SelectStudent />
    <!-- <form action="?/result" method="post" use:enhance={newResult}>
      <input hidden name="academicYear" value={$configs?.academicYear} type="text" />
      <input hidden name="term" value={$configs?.term} type="text" />
      <input hidden name="classId" value={$classDetail?.class_id} type="text" />
      <input hidden name="studentId" value={$student?.id} type="text" />
      <button disabled={!(!$result && !!$student)} class="btn btn-primary ms-1">
        New Result
      </button>
    </form> -->

    <button on:click={onPrint} class="btn btn-primary btn-sm ms-1">Preview</button>
  </div>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-semibold leading-6">Student Information</h3>
          <p class="mt-1 text-sm">
            Your Contact and personal information are very important and should be accurate.
          </p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <div class="card bg-base-100 shadow-sm md:w-full w-screen mb-4">
          <div class="card-body overflow-x-auto">
            {#if $result?.id}
              <StudentInfo />
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="divider" />

  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-semibold leading-6">Records</h3>
          <p class="mt-1 text-sm">
            Your Contact and personal information are very important and should be accurate.
          </p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <div class="card bg-base-100 shadow-sm md:w-full w-screen mb-4">
          <div class="card-body overflow-x-auto">
            {#if $result?.id}
              <!-- <Records records={$result?.records} resultId={$result?.id} />
              <Scores/> -->
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>

  {#if $user?.departments?.name == "GRADERS"}
    <div class="divider" />
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-base font-semibold leading-6">Ratings</h3>
            <p class="mt-1 text-sm">
              Your Contact and personal information are very important and should be accurate.
            </p>
          </div>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="card bg-base-100 shadow-sm md:w-full w-screen mb-4">
            <div class="card-body overflow-x-auto">
              {#if $result?.id}
                <Rating ratings={$result?.ratings} resultId={$result?.id} />
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div class="divider" />
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-semibold leading-6">Remarks</h3>
          <p class="mt-1 text-sm">
            Your Contact and personal information are very important and should be accurate.
          </p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <div class="card bg-base-100 shadow-sm md:w-full w-screen mb-4">
          <div class="card-body overflow-x-auto">
            {#if $result?.id}
              <!-- <Remark remarks={$result?.remarks} resultId={$result?.id} /> -->
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="alert md:w-8/12 m-auto my-48">
    <div class="i-bx:info-circle text-2xl" />
    <span>No student selected, click the button to select a student</span>
    <div>
      <SelectStudent />
    </div>
  </div>
{/if}
