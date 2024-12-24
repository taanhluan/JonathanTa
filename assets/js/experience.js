// JavaScript to toggle collapsible sections
document.querySelectorAll('.collapsible').forEach((item) => {
  item.addEventListener('click', () => {
    const content = item.nextElementSibling;

    // Toggle open class for the chevron icon
    item.classList.toggle('open');

    // Toggle content visibility
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});
