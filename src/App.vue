<script setup>
  import { computed, ref } from 'vue';
  import { proccessTxt } from 'src/helpers/fileHelper';
  import { saveAverages, getAverages } from 'src/services/averages';
  import { fileStatus, tableStatus } from 'src/constans';
  
  const list = ref([]);
  const loading = ref(false);
  const statusText = ref('');
  const statusClass = ref('request__status--loading');
  const showListError = ref(false);

  const onSelectFile = async ({ target }) => {
    try {
      statusText.value = fileStatus.PROCESSING;
    
    const docsList = await proccessTxt(target.files[0])
      await saveAverages(docsList);
      
      statusText.value = fileStatus.SAVED;
      statusClass.value = 'request__status--success';

      onLoadList();
    } catch(error) {
      statusClass.value = 'request__status--error'
      statusText.value = fileStatus.ERROR;
    }
  }

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

  const emptyList = computed(() => {
    return !list.value.length && !loading.value;
  });

  const showStatusText = computed(() => {
    return !!statusText.value;
  })

  onLoadList();
</script>

<template>
  <header class="header">
    <h1>Visualiza tus datos</h1>
  </header>
  <main class="main__container">
    <section class="section">
      <form class="form">
        <p class="form__description">
          Selecciona un archivo de tipo .txt y podras ver su información representada en la tabla.
        </p>
        <div class="form__control">
          <label for="file">Subir archivo: </label>
          <input id="file" type="file" accept=".txt" @change="onSelectFile">
        </div>
      </form>

      <div class="request" v-if="showStatusText">
        <p class="request__status" :class="statusClass">{{ statusText }}</p>
      </div>

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
