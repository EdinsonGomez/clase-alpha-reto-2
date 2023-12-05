<script setup>
  import InputFile from './components/InputFile.vue';
  import { computed, ref } from 'vue';
  import { proccessTxt } from 'src/helpers/fileHelper';
  import { getAverages } from 'src/services/averages';
  import { tableStatus } from './constans';
  
  const list = ref([]);
  const loading = ref(false);
  const showListError = ref(false);

  const onLoadList = async () => {
    try {
      loading.value = true;
      const listData = await getAverages();
      list.value = listData.toSorted((a, b) => a.order - b.order);
    } catch(error) {
      showListError.value = true;
    }
    
    loading.value = false;
  }

  const refreshList = () => {
    onLoadList();
  }

  const emptyList = computed(() => {
    return !list.value.length && !loading.value;
  });

  onLoadList();
</script>

<template>
  <header class="header">
    <h1>Visualiza tus datos</h1>
  </header>
  <main class="main__container">
    <section class="section">
      <InputFile @onRefreshList="refreshList" />

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
            <tr class="table__row table__row--loading" v-if="loading">
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
        <div class="table__error" v-if="showListError">
          <p>{{ tableStatus.ERROR }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
