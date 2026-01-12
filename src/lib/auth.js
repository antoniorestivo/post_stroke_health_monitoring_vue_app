import { ref } from "vue";

const isLoggedIn = ref(!!localStorage.getItem("jwt"));

export function useAuth() {
    return { isLoggedIn };
}

export function login(token) {
    localStorage.setItem("jwt", token);
    isLoggedIn.value = true;
}

export function logout() {
    localStorage.removeItem("jwt");
    isLoggedIn.value = false;
}
