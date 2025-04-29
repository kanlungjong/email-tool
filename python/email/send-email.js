// script.js

const templateNameInput = document.getElementById("template-name");
templateNameInput.addEventListener("input", () => {
  document.title = templateNameInput.value || "Template Builder";
});

const editorBtn = document.getElementById("editorBtn");
const previewBtn = document.getElementById("previewBtn");
const sidebar = document.getElementById("sidebar");

editorBtn.addEventListener("click", () => {
  editorBtn.classList.add("active");
  previewBtn.classList.remove("active");
  sidebar.innerHTML = `
    <h3>Row</h3>
    <div class="row-options">
        <div draggable="true" class="row-option"></div>
        <div draggable="true" class="row-option two-col"><div></div><div></div></div>
        <div draggable="true" class="row-option three-col"><div></div><div></div><div></div></div>
        <div draggable="true" class="row-option four-col"><div></div><div></div><div></div><div></div></div>
    </div>
    <h3>Content</h3>
    <div class="content-boxes">
      <div class="content-item">Head</div>
      <div class="content-item">Text</div>
      <div class="content-item">Image</div>
      <div class="content-item">Button</div>
      <div class="content-item">Social</div>
      <div class="content-item">Divider</div>
    </div>
  `;
});

previewBtn.addEventListener("click", () => {
  previewBtn.classList.add("active");
  editorBtn.classList.remove("active");
  sidebar.innerHTML = `<p style="padding: 20px;">This is the preview sidebar. (จะใส่อะไรเพิ่มเติมก็บอกได้ครับ)</p>`;
});


function goBack() {
  if (window.history.length > 1) {
      window.history.back();
  } else {
      window.location.href = '/'; // กลับไปหน้าแรกของเว็บถ้าไม่มีหน้าก่อน
  }
}
