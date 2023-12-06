<script setup>
  import { ref, computed } from "vue";
  import { useAveragesStore } from 'src/store/averages';
  import { fileStatus } from "src/constans";
  import { saveAverages } from "src/services/averages";
  import { proccessTxt } from 'src/helpers/fileHelper';

  const store = useAveragesStore();
  const statusText = ref("");
  const statusClass = ref("");
  const selectedFile = ref(null);

  const uploadFile = async (e) => {
    try {
      e.preventDefault();

      statusText.value = fileStatus.PROCESSING;
      statusClass.value = 'request__status--loading';

      const docsList = await proccessTxt(selectedFile.value);
      await saveAverages(docsList);

      statusText.value = fileStatus.SAVED;
      statusClass.value = "request__status--success";

      store.getList();
    } catch(error) {
      console.error(error);
      statusClass.value = "request__status--error";
      statusText.value = fileStatus.ERROR;
    }

  }

  const onSelectFile = ({ target }) => {
    if (!target.files.length) return;

    selectedFile.value = target.files[0];
  }

  const showStatusText = computed(() => {
    return !!statusText.value;
  });
</script>

<template>
  <form class="form">
    <p class="form__description">
      Selecciona un archivo de tipo .txt y podras ver su información
      representada en la tabla.
    </p>

    <div class="form__actions">
      <div class="form__control">
        <label for="file">Subir archivo: </label>
        <input id="file" type="file" accept=".txt" @change="onSelectFile" />
      </div>
      <div class="btn__container">
        <button class="btn btn--primary" @click="uploadFile">Aceptar</button>
      </div>
    </div>
  </form>

  <div class="request" v-if="showStatusText">
    <p class="request__status" :class="statusClass">{{ statusText }}</p>
  </div>
</template>
