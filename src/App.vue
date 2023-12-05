<script setup>
  import InputFile from './components/InputFile.vue';
  import TableComponent from './components/Table.vue';

</script>

<template>
  <header class="header">
    <h1>Visualiza tus datos</h1>
  </header>
  <main class="main__container">
    <section class="section">
      <InputFile />

      <TableComponent />
    </section>
  </main>
</template>
