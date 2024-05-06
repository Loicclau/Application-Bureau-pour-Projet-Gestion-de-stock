const information = document.getElementById("info");
const btnQuitter = document.getElementById("quitButton");

information.innerText = `Cette application utilise Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), et Electron (v${versions.electron()})`;

btnQuitter.addEventListener("click", async (event) => {
  const response = await window.electronAPI.quitApp();
});
