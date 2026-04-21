"use strict";
const slider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const passwordEl = document.getElementById("password");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const copyFeedback = document.getElementById("copyFeedback");
const strengthEl = document.getElementById("strength");
const strengthBar = document.getElementById("strengthBar");
const copyIcon = document.getElementById("copyIcon");
lengthValue.textContent = slider.value;
slider.addEventListener("input", () => {
    lengthValue.textContent = slider.value;
    generate();
});
numbersCheckbox.addEventListener("change", generate);
symbolsCheckbox.addEventListener("change", generate);
function generatePassword(length, includeNumbers, includeSymbols) {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers)
        chars += "0123456789";
    if (includeSymbols)
        chars += "!@#$%^&*()_+[]{}";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}
function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8)
        score++;
    if (password.length >= 16)
        score++;
    if (/[A-Z]/.test(password))
        score++;
    if (/[0-9]/.test(password))
        score++;
    if (/[^A-Za-z0-9]/.test(password))
        score++;
    if (score <= 2)
        return { text: "Weak", score: 1 };
    if (score <= 4)
        return { text: "Medium", score: 2 };
    return { text: "Strong", score: 3 };
}
function updateStrengthUI(password) {
    const result = calculateStrength(password);
    strengthEl.textContent = `Strength: ${result.text}`;
    strengthBar.className = "strength-bar";
    if (result.score === 1) {
        strengthBar.classList.add("weak");
    }
    else if (result.score === 2) {
        strengthBar.classList.add("medium");
    }
    else {
        strengthBar.classList.add("strong");
    }
}
function generate() {
    const length = parseInt(slider.value);
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;
    const password = generatePassword(length, includeNumbers, includeSymbols);
    passwordEl.textContent = password;
    passwordEl.classList.add("updated");
    setTimeout(() => {
        passwordEl.classList.remove("updated");
    }, 200);
    updateStrengthUI(password);
}
generateBtn.addEventListener("click", generate);
copyBtn.addEventListener("click", () => {
    const password = passwordEl.textContent;
    if (!password)
        return;
    navigator.clipboard.writeText(password);
    copyFeedback.textContent = "Copied!";
    copyBtn.classList.add("copied");
    setTimeout(() => {
        copyFeedback.textContent = "";
        copyBtn.classList.remove("copied");
    }, 1500);
});
//# sourceMappingURL=script.js.map