<template>
    <div class="login">
        <h1>login / register</h1>
        <section class="login-forms">

            <form class="register" @submit.prevent="handleRegister">
                <h2>Register</h2>
                <input type="email" placeholder="Email" v-model="register_form.email" required>
                <input type="password" placeholder="password" v-model="register_form.password" required>
                <input type="submit", value="Register">
                <p v-if="store.error" class="error">{{ store.error }}</p>
            </form>

            <form class="login" @submit.prevent="handleLogin">
                <h2>Register</h2>
                <input type="email" placeholder="Email" v-model="login_form.email" required>
                <input type="password" placeholder="password" v-model="login_form.password" required>
                <input type="submit", value="Login">
                <p v-if="store.error" class="error">{{ store.error }}</p>
            </form>

        </section>
    </div>
</template>

<script>
import { ref } from 'vue';
import { userStore } from "@/stores/user";
export default {
    setup() {
        const login_form = ref({
            email: '',
            password: '',
        });

        const register_form = ref({
            email: '',
            password: '',
        });

        const store = userStore();

        // Handle login submission
        const handleLogin = async () => {
        if (login_form.value.email && login_form.value.password) {
            await store.login(login_form.value.email, login_form.value.password);
        }};

        // Handle register submission
        const handleRegister = async () => {
        if (register_form.value.email && register_form.value.password) {
            await store.register(register_form.value.email, register_form.value.password);
        }};

        return {
            login_form,
            register_form,
            handleLogin,
            handleRegister,
            store,
        };
    }
}
</script>

<style>
body { background-color: white;}
</style>