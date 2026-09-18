//members: Rosas, Irig, Tingson

// 1. Target DOM Nodes (Matching Slide 7)
const categoryNameInput = document.getElementById("txtCatName");
const categoryDescInput = document.getElementById("txtCatDesc");
const addCategoryBtn = document.getElementById("btnAdd");
const incomeTableBody = document.getElementById("listIncomeCat");

// 2. Attach Non-Inline Event Listeners
addCategoryBtn.addEventListener("click", handleAddCategory);

// Live validation: clear/set feedback as the user types or leaves a field
[categoryNameInput, categoryDescInput].forEach((el) => {
  el.addEventListener("input", () => setValid(el, el.value.trim() !== ""));
  el.addEventListener("blur", () => setValid(el, el.value.trim() !== ""));
});

// Event delegation: one listener handles delete clicks for every row,
// including rows added after page load - DELETE BUTTON.
incomeTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-del")) {
    e.target.closest("tr").remove();
  }
});

// 3. Validation Helper, bootstrap
function setValid(input, isOk) {
  input.classList.toggle("is-invalid", !isOk);
  input.classList.toggle("is-valid", isOk);
}

// 4. Controller Action
function handleAddCategory() {
  const catName = categoryNameInput.value.trim();
  const catDesc = categoryDescInput.value.trim();

  // Inline Contextual Validation (replaces alert())
  const nameOk = catName !== "";
  const descOk = catDesc !== "";
  setValid(categoryNameInput, nameOk);
  setValid(categoryDescInput, descOk);
  if (!nameOk || !descOk) return;

  // Construct Row Markup
  const newRowHTML = `
<tr>
<td class="fw-semibold text-dark">${catName}</td>
<td class="text-secondary">${catDesc}</td>
<td class="text-end">
<button type="button" class="btn btn-sm btn-outline-danger btn-del">Delete</button>
</td>
</tr>
`;
  // Dynamic RAM Insertion
  incomeTableBody.insertAdjacentHTML("beforeend", newRowHTML);

  // Reset Inputs, Clear Validation State & Refocus
  categoryNameInput.value = "";
  categoryDescInput.value = "";
  categoryNameInput.classList.remove("is-valid", "is-invalid");
  categoryDescInput.classList.remove("is-valid", "is-invalid");
  categoryNameInput.focus();
}