var jwt = localStorage.getItem('jwt')
if (jwt == null) {
    window.location.href = '/Users/kanlungjong/Desktop/web/login/textlogin.html'
}

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = '/Users/kanlungjong/Desktop/web/login/textlogin.html'
}


previewBtn.addEventListener("click", () => {
    previewBtn.classList.add("active");
    editorBtn.classList.remove("active");
    
    // ดึงเนื้อหาที่ผู้ใช้ทำใน blox-center
    const content = bloxCenter.innerHTML;
  
    // นำ content ไปแสดงใน iframe (แทนตัวอย่าง template1.html เดิม)
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: #ffffff;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `);
    iframeDoc.close();
  });


  window.addEventListener("DOMContentLoaded", function() {
    const templateNameInput = document.getElementById("template-name");
    const editorBtn = document.getElementById("editorBtn");
    const previewBtn = document.getElementById("previewBtn");
    const sidebar = document.getElementById("sidebar");
    const iframe = document.getElementById("preview");
    const bloxCenter = document.querySelector(".blox-center");
  
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
  
      const content = bloxCenter.innerHTML;
  
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              background: #ffffff;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
        </html>
      `);
      iframeDoc.close();
    });
  });
  


// -----------------back-------------

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/'; // กลับไปหน้าแรกของเว็บถ้าไม่มีหน้าก่อน
    }
}


// -----------------------------------




function getIframeDocument() {
    let iframe = document.getElementById("preview");
    if (iframe && iframe.contentDocument) {
        return iframe.contentDocument;
    } else if (iframe && iframe.contentWindow) {
        return iframe.contentWindow.document;
    }
    return null;
}
function showOptions(type) {
    let doc = getIframeDocument();
    if (!doc) {
        alert("Failed to load template.");
        return;
    }

    let elements;
    switch (type) {
        case "image":
            elements = doc.querySelectorAll("img");
            break;
        case "text":
            elements = doc.querySelectorAll("p");
            break;
        case "head":
            elements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
            break;
        case "button":
            elements = doc.querySelectorAll("button");
            break;
        case "link":
            elements = doc.querySelectorAll("a");
            break;
        default:
            elements = [];
    }

    if (elements.length === 0) {
        alert(`No ${type} elements found!`);
        return;
    }

    let selector = document.getElementById("element-selector");
    selector.innerHTML = '<option value="">-- Select an Element --</option>';
    elements.forEach((el, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}`;
        selector.appendChild(option);
    });

    document.getElementById("edit-section").style.display = "block";
}


function showEditor() {
let doc = getIframeDocument();
if (!doc) return;

let selector = document.getElementById("element-selector");
let index = selector.value;
if (index === "") return;

let type = selector.options[selector.selectedIndex].text.split(" ")[0].toLowerCase();

let elements;
switch (type) {
    case "image":
        elements = doc.querySelectorAll("img");
        break;
    case "text":
        elements = doc.querySelectorAll("p");
        break;
    case "head":
        elements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
        break;
    case "button":
        elements = doc.querySelectorAll("button");
        break;
    case "link":
        elements = doc.querySelectorAll("a");
        break;
    default:
        elements = [];
}

let element = elements[index];

let editorLabel = document.getElementById("editor-label");
let editorInput = document.getElementById("editor-input");

if (type === "image") {
    editorLabel.textContent = "Image URL:";
    editorInput.value = element.src;
} else if (type === "link") {
    editorLabel.textContent = "Link URL:";
    editorInput.value = element.href;
} else {
    editorLabel.textContent = "Text:";
    editorInput.value = element.textContent;
}

document.getElementById("editor").style.display = "block";
}

function applyChange() {
let doc = getIframeDocument();
if (!doc) return;

let selector = document.getElementById("element-selector");
let index = selector.value;
if (index === "") return;

let type = selector.options[selector.selectedIndex].text.split(" ")[0].toLowerCase();

let elements;
switch (type) {
    case "image":
        elements = doc.querySelectorAll("img");
        break;
    case "text":
        elements = doc.querySelectorAll("p");
        break;
    case "head":
        elements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
        break;
    case "button":
        elements = doc.querySelectorAll("button");
        break;
    case "link":
        elements = doc.querySelectorAll("a");
        break;
    default:
        elements = [];
}

let element = elements[index];

let newValue = document.getElementById("editor-input").value;

if (type === "image") {
    element.src = newValue;
} else if (type === "link") {
    element.href = newValue;
} else {
    element.textContent = newValue;
}

alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated!`);
}

function addLayout(layoutNumber) {
const iframe = document.getElementById("preview");
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

const container = iframeDoc.createElement("div");
container.style.width = "600px";
container.style.margin = "20px auto";
container.style.display = "flex";
container.style.gap = "10px";
container.style.flexWrap = "wrap";

let boxCount = layoutNumber;

for (let i = 0; i < boxCount; i++) {
  const box = iframeDoc.createElement("div");
  box.style.flex = "1";
  box.style.height = "150px";
  box.style.border = "2px dashed gray";
  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.justifyContent = "center";

  // ✅ ทำให้ box ปรับความสูงได้
  box.style.resize = "vertical";
  box.style.overflow = "auto"; // สำคัญมาก ถ้าไม่มี resize จะไม่ทำงาน
  box.textContent = `Box ${i + 1} (ลากความสูงได้)`;

  container.appendChild(box);
}

iframeDoc.body.appendChild(container);
}  

// ใส่ใน script/main.js หรือ script/editor-contents.js
document.getElementById('preview').addEventListener('load', () => {
const iframe = document.getElementById('preview');
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

// เลือกเฉพาะ element ที่ต้องการให้แก้ไขได้
const editableTags = ['IMG', 'P', 'SPAN', 'A', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

iframeDoc.body.querySelectorAll('*').forEach(el => {
    if (editableTags.includes(el.tagName) || el.dataset.editable === "true") {
        el.style.cursor = 'pointer';

        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const tag = el.tagName.toLowerCase();
            let content;

            // ดึงค่าตามประเภท
            if (tag === 'img') content = el.src;
            else if (tag === 'a') content = el.href;
            else content = el.innerText;

            window.selectedElement = el;
            window.selectedType = tag;

            // เปิด editor ฝั่งแม่
            document.getElementById('edit-section').style.display = 'block';
            document.getElementById('editor').style.display = 'block';

            // แสดง label ตามประเภท
            let labelText = 'Edit ';
            if (tag === 'img') labelText += 'Image URL';
            else if (tag === 'a') labelText += 'Link URL';
            else labelText += 'Text';
            
            document.getElementById('editor-label').innerText = labelText;
            document.getElementById('editor-input').value = content;
        });
    }
});
});

function applyChange() {
const newValue = document.getElementById('editor-input').value;

if (!window.selectedElement || !window.selectedType) return;

const el = window.selectedElement;
const type = window.selectedType;

if (type === 'img') {
    el.src = newValue;
} else if (type === 'a') {
    el.href = newValue;
    el.innerText = newValue; // ถ้าต้องการเปลี่ยนข้อความด้วย
} else {
    el.innerText = newValue;
}

alert(`${type} updated!`);
}