const tagDescriptions = {
  h1: "Defines the largest heading. Used for titles.",
  p: "Defines a paragraph.",
  input: "Defines an input field where users can enter data.",
  button: "Creates a clickable button.",
  ul: "Creates an unordered list.",
  li: "Defines a list item inside lists.",
  img: "Embeds an image.",
  a: "Creates a hyperlink.",
  div: "Defines a container block element.",
  span: "Defines an inline container element.",
  br: "Inserts a single line break."
};

function visualizeTag() {
  const tag = document.getElementById("tagInput").value.trim().toLowerCase();
  const preview = document.getElementById("previewBox");
  const desc = document.getElementById("descriptionBox");

  preview.innerHTML = "";
  
  if (!tag || !/^[a-z0-9]+$/.test(tag)) {
    desc.textContent = "Please enter a valid tag (e.g., h1, input)";
    return;
  }

  let element;
  try {
    element = document.createElement(tag);
  } catch {
    desc.textContent = "Invalid HTML tag!";
    return;
  }

  // Customize some tags so they look better
  if (tag === "input") element.placeholder = "I'm an input";
  if (tag === "button") element.textContent = "Click Me";
  if (tag === "a") {
    element.href = "#";
    element.textContent = "I am a link";
  }
  if (tag === "img") {
    element.src = "https://via.placeholder.com/100";
    element.alt = "Placeholder image";
  }
  if (tag === "ul") {
    element.innerHTML = "<li>Item 1</li><li>Item 2</li>";
  }
  if (tag === "h1") element.textContent = "Hello, I'm an H1 tag!";
  if (tag === "p") element.textContent = "I'm a paragraph.";
  if (tag === "span") element.textContent = "I'm an inline span.";

  preview.appendChild(element);

  // Set description
  desc.textContent = tagDescriptions[tag] || "No description available for this tag.";
}
