let currentLang = 'en';
document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    const statusEl = document.getElementById('formStatus');
    statusEl.textContent = 'Sending...';

    // এখানে আপনার Apps Script URL টি বসান
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
    
    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      if (response.ok) {
        statusEl.textContent = '✅ Request sent successfully! We will contact you soon.';
        contactForm.reset();
      } else {
        statusEl.textContent = '❌ Error sending message. Please try again.';
      }
    } catch (error) {
      statusEl.textContent = '❌ Network error. Check your internet.';
    }
  });
}
