<template>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-content">
          <div class="footer-section footer-logo">
            <img src="/path/to/placeholder-logo.png" alt="Logo" />
          </div>
          <div class="footer-section footer-contact">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:example@email.com">example@email.com</a></p>
            <p>Follow us on:</p>
            <div class="social-links">
              <!-- Social Media Icons Placeholder -->
              <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">Instagram</a>
            </div>
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
  }
  
  .footer-section {
    margin-right: 20px;
  }
  
  .footer-logo img {
    height: 40px;
  }
  
  .footer-contact a {
    color: var(--color-secondary);
    text-decoration: none;
  }
  
  .footer-about {
    max-width: 300px;
  }
  
  .footer-menu ul {
    list-style: none;
    padding-left: 0;
  }
  
  .footer-menu li {
    margin-bottom: 5px;
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