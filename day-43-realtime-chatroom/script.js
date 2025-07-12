const firebaseConfig = {
  apiKey: "AIzaSyCseXT0j5-qAGmOZrmnAWEuF3uK6l4QpHg",
  authDomain: "job-board-web.firebaseapp.com",
  databaseURL: "https://job-board-web-default-rtdb.firebaseio.com",
  projectId: "job-board-web",
  storageBucket: "job-board-web.firebasestorage.app",
  messagingSenderId: "347576977073",
  appId: "1:347576977073:web:43d1217e5329c7a352c490",
  measurementId: "G-NTGV46LLNP"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const username = "User#" + Math.floor(Math.random() * 1000);

function sendMessage() {
  const msg = document.getElementById("msgInput").value.trim();
  if (msg === "") return;

  db.ref("messages").push({
    user: username,
    text: msg,
    time: new Date().toLocaleTimeString()
  });

  document.getElementById("msgInput").value = "";
}

db.ref("messages").on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const box = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.innerHTML = `<strong>${msg.user}</strong> [${msg.time}]: ${msg.text}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
});
