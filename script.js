const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

let myTurn = true;

const client = io("http://localhost:3000");
client.on("connect", () => {
  displayMessage(`You connected with id: ${client.id}`);
});

client.on("chat-message", (receivedMessage) => {
  displayMessage(receivedMessage);
  messageInput.removeAttribute("disabled");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;
  displayMessage(message);
  client.emit("send-chat-message", message);
  messageInput.value = "";
  messageInput.disabled = true;
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}
