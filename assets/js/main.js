function toggleContent(button) {
  const content = button.parentElement.previousElementSibling;
  content.classList.toggle('collapsed');
  button.textContent = content.classList.contains('collapsed') ? 'Expand' : 'Collapse';
}

