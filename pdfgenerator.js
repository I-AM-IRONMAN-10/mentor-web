import { db } from "../firebaseConfig.js"; // keep if needed
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Use jsPDF from window if UMD
const { jsPDF } = window.jspdf;

// Match HTML ID
const generatePdfBtn = document.getElementById("generate-pdf"); 
const queriesList = document.getElementById("queries-list");

generatePdfBtn.addEventListener("click", () => {
  if (!queriesList || queriesList.children.length === 0) {
    alert("No queries available to export.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Student Queries Report", 10, 10);

  let y = 20;
  Array.from(queriesList.children).forEach((li, index) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${li.textContent}`, 10, y); // fixed template literal
    y += 10;
  });

  doc.save("student_queries.pdf");
});
