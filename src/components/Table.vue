<script setup>
  import { useAveragesStore } from 'src/store/averages';
  import { computed } from 'vue';
  import { tableStatus } from 'src/constans';

  const store = useAveragesStore();

  const emptyList = computed(() => {
    return !store.list.length && !store.loading
  });

  const showError = computed(() => {
    return !!store.error;
  });

  const list = computed(() => {
    if (store.loading) return [];
    return store.list;
  })

  store.getList();
</script>

<template>
  <div class="table__container">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Id</th>
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table__row table__row--loading" v-if="store.loading">
          <td colspan="4">
            {{ tableStatus.LOADING }}
          </td>
        </tr>
        <tr class="table__row table__row--empty" v-if="emptyList">
          <td colspan="4">
            {{ tableStatus.EMPTY }}
          </td>
        </tr>
        <tr class="table__row" v-for="row in list" :key="row.id">
          <td>{{ row.order }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.id }}</td>
          <td>{{ row.average }}</td>
        </tr>
      </tbody>
    </table>
    <div class="table__error" v-if="showError">
      <p>{{ tableStatus.ERROR }}</p>
    </div>
  </div>
</template>
