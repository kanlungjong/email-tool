var jwt = localStorage.getItem('jwt')
if (jwt == null) {
    window.location.href = '/login/testlogin.html'
}

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = '/login/testlogin.html'
}

document.querySelector('iframe').addEventListener('load', () => {
  const iframe = document.querySelector('iframe');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  iframeDoc.body.querySelectorAll('*').forEach(el => {
      if (['P', 'H1', 'H2', 'IMG', 'A', 'BUTTON'].includes(el.tagName)) {
          el.addEventListener('click', () => {
              window.selectedElement = el;
              showEditorFor(el);
          });
      }
  });
});

function showEditorFor(el) {
  const editor = document.getElementById('editor');
  const input = document.getElementById('editor-input');
  const editType = document.getElementById('edit-type');

  window.selectedElement = el;
  editor.style.display = 'block';

  if (el.tagName === 'A') {
    // If it's a link, allow the user to choose between editing the text or the link
    editType.style.display = 'inline-block';
    editType.value = 'text'; // default
    input.value = el.textContent;
    input.dataset.type = 'text'; // initial state for text

    editType.addEventListener('change', function() {
      if (editType.value === 'text') {
        input.value = el.textContent;
        input.dataset.type = 'text';
      } else if (editType.value === 'href') {
        input.value = el.href;
        input.dataset.type = 'href';
      }
    });

  } else if (el.tagName === 'IMG') {
    editType.style.display = 'none';
    input.value = el.src;
    input.dataset.type = 'img';
  } else {
    editType.style.display = 'none';
    input.value = el.textContent;
    input.dataset.type = 'text';
  }
}

function applyChange() {
  const input = document.getElementById('editor-input');
  const editType = document.getElementById('edit-type');
  const el = window.selectedElement;

  if (!el) return;  // No element selected, exit the function

  if (el.tagName === 'A') {
      if (editType.value === 'text') {
          el.textContent = input.value;  // Change the link's text
      } else if (editType.value === 'href') {
          el.href = input.value;  // Change the link's href
      }
  } else if (el.tagName === 'IMG') {
      el.src = input.value;  // Change the image source
  } else {
      el.textContent = input.value;  // Change the text content of other elements
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const iframe = document.querySelector('iframe');
  iframe.addEventListener('load', () => {
      // Add any additional code for iframe interactions here
  });
});

// Handle link interactions in the iframe
const iframe = document.querySelector('iframe');

iframe.addEventListener('load', () => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  // Disable link clicks to avoid navigating away from the iframe
  iframeDoc.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();  // Prevent default link behavior
      });
  });
});

// Function to toggle fix mode (for locking/unlocking elements)
function toggleFixMode(enable) {
  const iframe = document.querySelector('iframe');
  iframe.style.pointerEvents = enable ? 'none' : 'auto';
}
