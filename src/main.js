
import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="chat-app">
    <header class="topbar">
      <div class="avatar">R</div>
      <div>
        <h2>Riya AI</h2>
        <p>● Online · Your AI friend</p>
      </div>
    </header>

    <main id="messages" class="messages">
      <div class="message bot">
        Hey! I'm Riya 😊
        <br />How was your day?
      </div>
    </main>

    <form id="chat-form" class="chat-form">
      <input id="user-input" placeholder="Message Riya..." autocomplete="off" />
      <button type="submit" id="send-btn">➤</button>
    </form>
    <p class="footer">Riya AI · Powered by Gemini</p>
  </div>
`;

const messagesBox = document.querySelector("#messages");
const form = document.querySelector("#chat-form");
const input = document.querySelector("#user-input");
const sendBtn = document.querySelector("#send-btn");

const history = [];

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;
  bubble.textContent = text;
  messagesBox.appendChild(bubble);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");

  history.push({
    role: "user",
    text: text
  });

  input.value = "";
  input.disabled = true;
  sendBtn.disabled = true;

  const loading = document.createElement("div");
  loading.className = "message bot";
  loading.textContent = "Riya is typing...";
  messagesBox.appendChild(loading);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: history
      })
    });

    const data = await response.json();
    loading.remove();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    const reply =
      data.reply ||
      data.text ||
      data.message ||
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't reply.";

    addMessage(reply, "bot");

    history.push({
      role: "model",
      text: reply
    });

  } catch (error) {
    loading.remove();
    addMessage("Sorry! " + error.message, "bot");
  } finally {
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }
});
