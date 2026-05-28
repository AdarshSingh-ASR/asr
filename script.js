const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const triggers = document.querySelectorAll(".skill-trigger");

const savedTheme = localStorage.getItem("adarsh-theme");
if (savedTheme === "light") {
  body.classList.add("light");
}

function playToggleSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(520, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(820, context.currentTime + 0.08);

  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.14);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.16);
}

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const group = trigger.closest(".skill-group");
    const isOpen = group.classList.toggle("open");
    const icon = trigger.querySelector(".chevron");

    trigger.setAttribute("aria-expanded", String(isOpen));
    icon.textContent = isOpen ? "⌃" : "⌄";
    playToggleSound();
  });
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("adarsh-theme", body.classList.contains("light") ? "light" : "dark");
});
