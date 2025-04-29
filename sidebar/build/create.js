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


const main = document.querySelector("main");
let draggedType = null;

document.querySelectorAll(".row-option").forEach(row => {
  row.addEventListener("dragstart", () => {
    draggedType = row.children.length || 1; // 1, 2, 3, 4 columns
  });
});

document.querySelectorAll(".content-item").forEach(content => {
  content.addEventListener("dragstart", () => {
    draggedType = content.textContent;
  });
});

main.addEventListener("dragover", e => {
  e.preventDefault();
});

main.addEventListener("drop", e => {
  e.preventDefault();

  // ถ้าลาก row
  if (typeof draggedType === "number") {
    const row = document.createElement("div");
    row.className = "row";

    for (let i = 0; i < draggedType; i++) {
      const box = document.createElement("div");
      box.className = "box";

      const del = document.createElement("button");
      del.className = "delete-btn";
      del.textContent = "×";
      del.onclick = () => row.remove();

      box.appendChild(del);
      row.appendChild(box);
    }

    main.appendChild(row);
  }

  // ถ้าลาก content
  if (typeof draggedType === "string") {
    const targetBox = e.target.closest(".box");
    if (!targetBox) return alert("You need to add a row first!");

    const content = document.createElement("div");
    content.className = "content";
    content.textContent = draggedType;

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "×";
    del.onclick = () => content.remove();

    content.appendChild(del);
    targetBox.appendChild(content);
  }
});

// handle click เพื่อแสดงปุ่มลบ
document.addEventListener("click", e => {
  // remove active ทั้งหมดก่อน
  document.querySelectorAll(".box, .content").forEach(el => el.classList.remove("active"));

  const clickedBox = e.target.closest(".box");
  const clickedContent = e.target.closest(".content");

  if (clickedContent) clickedContent.classList.add("active");
  else if (clickedBox) clickedBox.classList.add("active");
});

document.querySelectorAll(".content-item").forEach(content => {
    content.addEventListener("dragstart", (e) => {
      draggedType = content.textContent;
      e.dataTransfer.setData("text/plain", draggedType); // บาง browser ต้องมี
    });
  });
  
  
content.addEventListener("dragstart", (e) => {
    draggedType = content.textContent;
    e.dataTransfer.setData("text/plain", draggedType);
});



function makeRowHeightEditable(rowBox) {
    rowBox.addEventListener("click", (e) => {
      e.stopPropagation();
  
      // ลบ editor เดิม (ถ้ามี)
      const oldEditor = document.querySelector(".height-editor");
      if (oldEditor) oldEditor.remove();
  
      // สร้าง editor ใหม่
      const editor = document.createElement("div");
      editor.className = "height-editor";
  
      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = "สูง (px)";
      input.value = parseInt(rowBox.style.height) || 200;
  
      const okBtn = document.createElement("button");
      okBtn.textContent = "ตกลง";
  
      okBtn.addEventListener("click", () => {
        rowBox.style.height = `${input.value}px`;
        editor.remove();
      });
  
      editor.appendChild(input);
      editor.appendChild(okBtn);
  
      // ให้ editor อยู่ในตำแหน่ง rowBox
      editor.style.position = "absolute";
      editor.style.top = "10px";
      editor.style.left = "10px";
      editor.style.background = "white";
      editor.style.border = "1px solid #ccc";
      editor.style.padding = "4px";
      editor.style.zIndex = 999;
  
      rowBox.style.position = "relative"; // สำคัญมาก!!
      rowBox.appendChild(editor);
    });
}


const row = document.createElement("div");
row.classList.add("row");

const rowBox = document.createElement("div");
rowBox.classList.add("row-box");
rowBox.style.width = "600px";
rowBox.style.margin = "0 auto";
rowBox.style.height = "200px"; // default

makeRowHeightEditable(rowBox); // ✅ เรียกใช้งาน

row.appendChild(rowBox);
document.querySelector(".editor-preview").appendChild(row);