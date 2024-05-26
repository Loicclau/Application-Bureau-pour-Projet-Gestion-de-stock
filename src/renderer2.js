const btn = document.getElementById("submit");
const messageElement = document.getElementById("message");
const messageElement_enplacement = document.getElementById(
  "message_enplacement"
);

// Fonction pour stocker le message dans le stockage local
function storeMessage(message, Visualisation) {
  localStorage.setItem("savedMessage", message);
  localStorage.setItem("savedMessage2", Visualisation);
}

// Fonction pour récupérer le message depuis le stockage local
function retrieveMessage() {
  return localStorage.getItem("savedMessage");
}
function retrieveMessage2() {
  return localStorage.getItem("savedMessage2");
}

// Afficher le message stocké au chargement de la page
window.addEventListener("load", () => {
  const savedMessage = retrieveMessage();
  const savedMessage2 = retrieveMessage2();
  if (savedMessage) {
    messageElement.innerText = savedMessage;
  }
  if (savedMessage2) {
    messageElement_enplacement.innerText = savedMessage2;
  }
  // Supprimer automatiquement le message après 5 secondes
  setTimeout(() => {
    messageElement.innerText = "";
  }, 5000); // 5 secondes
  storeMessage("", "");
});

btn.addEventListener("click", async (event) => {
  var nameProduitInput = document.getElementById("nameProduit").value.trim();
  var ReferenceInput = document.getElementById("Reference").value.trim();
  var quantiteInput = parseInt(
    document.getElementById("quantiteProduit").value
  );
  var QRCodeInput = parseInt(document.getElementById("numberQR").value);
  // Informations complémentaires
  var Info_en_plus = document.getElementById("Informations").value.trim();

  sessionStorage.setItem(`NumeroChantier`, Info_en_plus);

  // Vérifier que tous les champs requis sont remplis
  if (
    nameProduitInput.trim() !== "" &&
    ReferenceInput.trim() !== "" &&
    !isNaN(quantiteInput) &&
    quantiteInput > 0 &&
    !isNaN(QRCodeInput) &&
    QRCodeInput > 0
  ) {
    const response = await window.electronAPI.test(
      nameProduitInput,
      ReferenceInput,
      QRCodeInput,
      quantiteInput,
      Info_en_plus
    );
    //event.preventDefault();
    //document.getElementById("stockForm").reset();
    messageElement.innerText = response;
    Visualisation = "Voir l'emplacement";
    messageElement_enplacement.innerText = Visualisation;
    messageElement.classList.remove("bg-red-300", "text-red-700");
    messageElement.classList.add("bg-green-300", "text-green-700");
    storeMessage(response, Visualisation);
  } else {
    messageElement.innerText = " Remplis tous les champs ! ";
    messageElement.classList.remove("bg-green-300", "text-green-700");
    messageElement.classList.add("bg-red-300", "text-red-700");
    const envoieErreur = await window.electronAPI.VoixErreur();
  }
});
