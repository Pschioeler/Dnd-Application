<template>
    <nav class="breadcrumbs">
      <ul>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
            {{ crumb.name }}
          </router-link>
          <span v-else>{{ crumb.name }}</span>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'Breadcrumbs',
    setup() {
      const route = useRoute();
      const router = useRouter();
  
      const breadcrumbs = computed(() => {
        const pathArray = route.path.split('/').filter(Boolean);
        const crumbs = pathArray.map((segment, index) => {
          const path = `/${pathArray.slice(0, index + 1).join('/')}`;
          const name = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
          return { path, name };
        });
        return [{ path: '/', name: 'Home' }, ...crumbs];
      });
  
      return { breadcrumbs };
    },
  };
  </script>
  
  <style scoped>
  .breadcrumbs {
    padding: 10px 0;
    font-family: 'Raleway', sans-serif;
    text-align: left;
  }
  
  .breadcrumbs ul {
    list-style: none;
    display: flex;
    gap: 5px;
    padding: 0;
    margin: 0;
  }
  
  .breadcrumbs li {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
  }
  
  .breadcrumbs li:not(:last-child)::after {
    content: '>';
    margin-left: 5px;
    color: var(--grey-dark);
  }
  
  .breadcrumbs a {
    text-decoration: none;
    color: var(--color-text-dark);
    transition: color 0.3s ease;
  }
  
  .breadcrumbs a:hover {
    color: var(--color-secondary);
  }
  
  .breadcrumbs span {
    color: var(--color-text-dark);
    font-weight: bold;
  }
  </style>
  