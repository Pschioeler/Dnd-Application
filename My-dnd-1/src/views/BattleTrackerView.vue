<template>
  <div class="battle-tracker-view">
    <Breadcrumbs />
    <div class="container">
      <h1>Battle Tracker</h1>
      <hr class="divider" />
      <Battletracker />
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Battletracker from '@/components/Battletracker.vue';

export default {
  name: 'BattleTrackerView',
  components: {
    Breadcrumbs,
    Battletracker,
  },
};
</script>

<style scoped>
.battle-tracker-view {
  padding: 0; /* Ensure no extra padding */
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0; /* Remove padding on left and right */
}

.battle-tracker-view h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-family: 'Cinzel', serif;
  text-align: left; /* Align with breadcrumbs */
}

.divider {
  border: none;
  border-top: 2px solid var(--color-border-light);
  margin: 20px 0;
}
</style>