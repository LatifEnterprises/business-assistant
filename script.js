const API_KEY = "YOUR_NEW_KEY_HERE";

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

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userText }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("API RESPONSE:", data); // 👈 VERY IMPORTANT

    if (data.error) {
      addMessage("Error: " + data.error.message, "ai");
      return;
    }

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No valid response from AI";

    addMessage("AI: " + aiText, "ai");

  } catch (err) {
    addMessage("Request failed: " + err.message, "ai");
  }
}
