<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-content">
        <div class="footer-section footer-logo">
          <h2>My D&D</h2>
        </div>
        <div class="footer-section footer-contact">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:example@email.com">example@email.com</a></p>
        </div>
        <div class="footer-section footer-about">
          <h4>About</h4>
          <p>This is an ambitious project aiming to provide an ultimate experience for D&D players.</p>
        </div>
        <div class="footer-section footer-menu">
          <h4>Menu</h4>
          <ul>
            <li><router-link to="/battle-tracker">Battle Tracker</router-link></li>
            <li><router-link to="/party">Party</router-link></li>
            <li><router-link to="/shop">Shop</router-link></li>
            <li><router-link to="/rules">Rules</router-link></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <router-link to="/terms">Terms of Use</router-link> |
        <router-link to="/privacy">Privacy Policy</router-link> |
        <router-link to="/cookies">Cookie Policy</router-link> |
        <router-link to="/contact">Contact</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
name: 'Footer'
};
</script>

<style scoped>
.footer {
background-color: var(--color-background-primary-dark);
color: var(--color-text-light);
border-top: 2px solid var(--color-secondary);
width: 100%;
}

.footer-inner {
max-width: 1440px;
margin: 0 auto;
padding: 20px;
}

.footer-content {
display: flex;
justify-content: space-between;
align-items: flex-start;
gap: 30px; /* Increased gap between columns */
}

.footer-section {
flex: 1;
text-align: left;
display: flex;
flex-direction: column;
}

.footer-logo {
align-items: center;
display: flex;
justify-content: center;
}

.footer-logo h2 {
font-family: 'Cinzel Decorative', serif;
color: var(--color-secondary);
text-align: center;
}

.footer-contact h4, .footer-about h4, .footer-menu h4 {
font-family: 'Cinzel', serif;
color: var(--color-secondary);
margin-bottom: 10px;
}

.footer-contact p, .footer-about p, .footer-menu ul {
color: var(--color-text-light);
font-family: 'Raleway', sans-serif;
font-size: 0.875rem;
}

.footer-contact a {
color: var(--color-secondary);
text-decoration: none;
}

.footer-contact a:hover {
text-decoration: underline;
}

.footer-menu ul {
list-style: none;
padding-left: 0;
}

.footer-menu li {
margin-bottom: 5px;
}

.footer-menu li a {
color: var(--color-text-light);
text-decoration: none;
}

.footer-menu li a:hover {
color: var(--color-secondary);
}

.footer-bottom {
text-align: center;
font-size: 0.75rem;
color: var(--grey-light);
margin-top: 20px;
}

.footer-bottom a {
color: var(--grey-light);
text-decoration: none;
}

.footer-bottom a:hover {
color: var(--color-secondary);
}
</style>
