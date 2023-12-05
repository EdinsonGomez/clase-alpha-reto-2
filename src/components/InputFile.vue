<script setup>
  import { ref, computed } from "vue";
  import { fileStatus } from "src/constans";
  import { saveAverages } from "src/services/averages";
  import { proccessTxt } from 'src/helpers/fileHelper';

  const emit = defineEmits(["onRefreshList"]);

  const statusText = ref("");
  const statusClass = ref("request__status--loading");

  const onSelectFile = async ({ target }) => {
    try {
      statusText.value = fileStatus.PROCESSING;

      const docsList = await proccessTxt(target.files[0]);
      await saveAverages(docsList);

      statusText.value = fileStatus.SAVED;
      statusClass.value = "request__status--success";

      emit('onRefreshList');
    } catch (error) {
      statusClass.value = "request__status--error";
      statusText.value = fileStatus.ERROR;
    }
  };

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
    <div class="form__control">
      <label for="file">Subir archivo: </label>
      <input id="file" type="file" accept=".txt" @change="onSelectFile" />
    </div>
  </form>

  <div class="request" v-if="showStatusText">
    <p class="request__status" :class="statusClass">{{ statusText }}</p>
  </div>
</template>
