const slider = document.getElementById("lengthSlider") as HTMLInputElement;
const lengthValue = document.getElementById("lengthValue") as HTMLElement;
const passwordEl = document.getElementById("password") as HTMLElement;
const numbersCheckbox = document.getElementById("numbers") as HTMLInputElement;
const symbolsCheckbox = document.getElementById("symbols") as HTMLInputElement;
const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement;
const copyFeedback = document.getElementById("copyFeedback") as HTMLElement;
const strengthEl = document.getElementById("strength") as HTMLElement;
const strengthBar = document.getElementById("strengthBar") as HTMLElement;
const copyIcon = document.getElementById("copyIcon") as HTMLElement;

lengthValue.textContent = slider.value;

slider.addEventListener("input", () => {
  lengthValue.textContent = slider.value;
  generate();
});

numbersCheckbox.addEventListener("change", generate);
symbolsCheckbox.addEventListener("change", generate);

function generatePassword(
  length: number,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {

  let chars: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (includeNumbers) chars += "0123456789";
  if (includeSymbols) chars += "!@#$%^&*()_+[]{}";

  let password: string = "";

  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

function calculateStrength(password: string): { text: string, score: number } {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { text: "Weak", score: 1 };
  if (score <= 4) return { text: "Medium", score: 2 };
  return { text: "Strong", score: 3 };
}

function updateStrengthUI(password: string) {
  const result = calculateStrength(password);

  strengthEl.textContent = `Strength: ${result.text}`;

  strengthBar.className = "strength-bar";

  if (result.score === 1) {
    strengthBar.classList.add("weak");
  } else if (result.score === 2) {
    strengthBar.classList.add("medium");
  } else {
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
  if (!password) return;

  navigator.clipboard.writeText(password);

  copyFeedback.textContent = "Copied!";

  copyBtn.classList.add("copied");

  setTimeout(() => {
    copyFeedback.textContent = "";
    copyBtn.classList.remove("copied");
  }, 1500);
});
