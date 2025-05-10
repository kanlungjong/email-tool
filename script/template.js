// You can add JavaScript functionality here if needed,
// for example, to handle clicks on the "Create" button
// or to dynamically load templates.

const createButton = document.querySelector('.create-button');
createButton.addEventListener('click', () => {
    alert('Create button clicked!');
    // Add your create functionality here
});

// Example of dynamically adding a new template card:
// const templatesGrid = document.querySelector('.templates-grid');
// const newCard = document.createElement('div');
// newCard.classList.add('template-card');
// newCard.innerHTML = `
//     <div class="template-preview"></div>
//     <div class="template-name">New Template</div>
// `;
// templatesGrid.appendChild(newCard);

var jwt = localStorage.getItem('jwt')
if (jwt == null) {
    window.location.href = '/login/textlogin.html'
}

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = '/login/textlogin.html'
}