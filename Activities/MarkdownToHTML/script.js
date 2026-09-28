function convertMarkdown() {
  const markdownInput = document.getElementById("markdown-input");
  let html = markdownInput ? markdownInput.value : "";

  html = html.replace(/!\[([^\]]*)\]\(([^)]*)\)/g, '<img alt="$1" src="$2">');

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  html = html.replace(/^\s*### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^\s*## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^\s*# (.*)$/gm, "<h1>$1</h1>");

  html = html.replace(/^\s*> (.*)$/gm, "<blockquote>$1</blockquote>");

  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  html = html.replace(/\r?\n/g, "");

  return html;
}

function renderOutput() {
  const html = convertMarkdown();
  const htmlOutput = document.getElementById("html-output");
  const preview = document.getElementById("preview");

  if (htmlOutput) {
    if (
      "value" in htmlOutput &&
      (htmlOutput.tagName === "TEXTAREA" || htmlOutput.tagName === "INPUT")
    ) {
      htmlOutput.value = html;
    } else {
      htmlOutput.textContent = html;
    }
  }

  if (preview) {
    preview.innerHTML = html;
  }
}

const markdownInput = document.getElementById("markdown-input");
if (markdownInput) {
  markdownInput.addEventListener("input", renderOutput);
}
