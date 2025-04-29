document.addEventListener("DOMContentLoaded", function () {
    const fileSelector = document.getElementById("file-selector");
    const iframe = document.getElementById("preview");

    // โหลดไฟล์ HTML ที่เลือกไปแสดงใน iframe
    function loadFile() {
        const selectedFile = fileSelector.value;
        fetch(selectedFile)
            .then(response => response.text())
            .then(data => {
                iframe.srcdoc = data;
                localStorage.setItem("editedHTML", data);
            })
            .catch(error => console.error("Error loading file:", error));
    }

    // กู้คืน HTML ที่เคยแก้ไขไว้ ถ้ามี
    if (localStorage.getItem("editedHTML")) {
        iframe.srcdoc = localStorage.getItem("editedHTML");
    }

    // บันทึก HTML ที่แก้ไขแล้ว
    function saveHTML() {
        const editedHTML = iframe.contentDocument.documentElement.outerHTML;
        localStorage.setItem("editedHTML", editedHTML);
        alert("บันทึกสำเร็จ!");
    }

    // ดาวน์โหลด HTML ที่แก้ไข โดยให้ผู้ใช้ตั้งชื่อเอง
    function downloadHTML() {
        const editedHTML = iframe.contentDocument.documentElement.outerHTML;
        const blob = new Blob([editedHTML], { type: "text/html" });
    
        let fileName = prompt("กรุณาตั้งชื่อไฟล์ (เช่น myfile.html) โดยมีนามสกุลเป็น .html:",);
    
        if (fileName === null) {
            // ผู้ใช้กด Cancel -> ไม่ต้องดาวน์โหลด
            return;
        }
    
        fileName = fileName.trim();
        if (fileName === "") {
            fileName = "edited_template.html";
        }
        if (!fileName.endsWith(".html")) {
            fileName += ".html";
        }
    
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
    }    

    // ทำให้ฟังก์ชันเข้าถึงได้จากปุ่ม
    window.loadFile = loadFile;
    window.saveHTML = saveHTML;
    window.downloadHTML = downloadHTML;
});