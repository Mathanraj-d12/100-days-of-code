const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

// Initial demo content
editor.value = "# Hello 👋\nType **Markdown** here!\n\n- Item 1\n- Item 2\n";

function updatePreview() {
  preview.innerHTML = marked.parse(editor.value);
}

editor.addEventListener("input", updatePreview);

// Run once on load
updatePreview();
