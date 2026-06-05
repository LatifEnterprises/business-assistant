const API_KEY = "projects/1080005101064";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value;

  if (!text) return;

  document.getElementById("chatBox").innerHTML +=
    "<p><b>You:</b> " + text + "</p>";

  input.value = "";

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }]
      })
    }
  );

  const data = await res.json();

  const reply = data.candidates[0].content.parts[0].text;

  document.getElementById("chatBox").innerHTML +=
    "<p><b>AI:</b> " + reply + "</p>";
}
