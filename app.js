const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const swapBtn = document.getElementById("swap");
const copyBtn = document.getElementById("copyBtn");

// Swap Languages
swapBtn.addEventListener("click", () => {
  let temp = fromLang.value;
  fromLang.value = toLang.value;
  toLang.value = temp;
});

//  Translate Function
translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();

  if (!text) {
    alert("Please enter text");
    return;
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang.value}&tl=${toLang.value}&dt=t&q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Translation result
    const translated = data[0].map(item => item[0]).join("");
    outputText.value = translated;

  } catch (error) {
    console.error(error);
    alert("Translation failed");
  }
});

// Copy text

copyBtn.addEventListener("click", () => {
  if (!outputText.value) {
    alert("Nothing to copy!");
    return;
  }

  navigator.clipboard.writeText(outputText.value);

  copyBtn.innerText = "✅ Copied!";
  
  setTimeout(() => {
    copyBtn.innerText = "Copy";
  }, 1500);
});