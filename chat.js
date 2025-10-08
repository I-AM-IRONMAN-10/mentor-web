import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } 
    from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Function to send a message
export async function sendMessage(conversationId, sender, text) {
  await addDoc(collection(db, "messages", conversationId, "messages"), {
    sender,          // "student" or "mentor"
    text,            // The message text
    timestamp: serverTimestamp() // Firestore timestamp
  });
}

// Function to listen for new messages in real-time
export function listenToMessages(conversationId, callback) {
  const messagesRef = collection(db, "messages", conversationId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc")); // oldest to newest

  onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => doc.data());
    callback(messages); // Send messages to your UI
  });
}