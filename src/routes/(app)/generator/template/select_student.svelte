<script lang="ts">
  import { configs } from "$lib/stores/configs";
  import { results, students, result, student } from "$lib/stores/data_store";

  let disabled = true;
  const getStudent = (id: number) => {
    $student = $students.find((std) => std.id === id);

    $result = $results.find(
      (res) => $configs.term == res.exam_type && $configs.academicYear == res.academicYear
    ) as typeof $result;

    disabled = !(!!$result && !!$student);
  };

  const isComplete = (id: number) => {
    const result = $results.find(
      (result) =>
        result.term == $configs.term &&
        result == $configs.academicYear &&
        result.status == "uploaded"
    );
    return result?.status;
  };
</script>

<div class="dropdown dropdown-top md:dropdown-top md:dropdown-left">
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <label for="" tabindex="0" class="btn btn-sm btn-primary rounded-btn">Select Student</label>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul
    class="menu flex-row dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box mt-4 overflow-y-auto h-96"
  >
    {#each $students as student}
      <li class="flex-row">
        <a class="" href=" " on:click={() => getStudent(student.id)}>
          <div class="flex items-center space-x-3">
            {#if student?.student_photo}
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img
                    src={`https://llacademy.ng/${student?.student_photo}`}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
            {:else}
              <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content mask mask-squircle w-12">
                  <span class="text-xl">{student.full_name.charAt(0)}</span>
                </div>
              </div>
            {/if}
            <div class=" flex flex-col">
              <div class="font-bold">
                {student.full_name
                  .replace(/ +(?= )/g, "")
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
              </div>
              <span class="text-sm opacity-50">{student.class_name}</span>
              <span class="badge badge-sm badge-accent badge-outline capitalize">
                {isComplete(student.id) ?? "Pending"}
              </span>
            </div>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</div>
