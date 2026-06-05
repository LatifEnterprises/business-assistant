const API_KEY = "AQ.Ab8RN6JJfIAmbg0E8FRqV7ZPAM28Q0WpNeVknWM8Stnf4dS3sw";

const chatBox = document.getElementById("chatBox");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value;

  if (!userText) return;

  addMessage("You: " + userText, "user");
  input.value = "";

  addMessage("AI is thinking...", "ai");

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: userText }] }
        ]
      })
    }
  );

  const data = await response.json();

  const aiText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response";

  addMessage("AI: " + aiText, "ai");
}
