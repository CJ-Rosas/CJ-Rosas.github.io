const buttons = document.querySelectorAll(".bodyNav .b-button");
const root = document.documentElement;

function spawnRipple(x, y, color) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = "20px";
  ripple.style.height = "20px";
  ripple.style.setProperty("--ripple-color", color);

  document.body.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // 1. Switch panels
    const targetId = btn.dataset.target;
    document
      .querySelectorAll(".Panel")
      .forEach((p) => p.classList.remove("active"));
    document.getElementById(targetId)?.classList.add("active");

    // 2. Switch accent color + ripple
    const color = btn.dataset.color || getComputedStyle(btn).backgroundColor;
    root.style.setProperty("--accent", color);
    spawnRipple(e.clientX, e.clientY, color);
  });
});