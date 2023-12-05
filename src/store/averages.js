import { defineStore } from 'pinia';
import { getAverages } from 'src/services/averages';

export const useAveragesStore = defineStore('averages', {
  state: () => ({
    loading: false,
    error: '',
    list: []
  }),
  actions: {
    async getList() {
      try {
        this.loading = true;
        const docs = await getAverages();
        this.list = docs.toSorted((a, b) => a.order - b.order);
      } catch(error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
})