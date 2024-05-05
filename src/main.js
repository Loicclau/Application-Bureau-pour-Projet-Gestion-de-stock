const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");
const { exec } = require("child_process");
let win;

const createWindow = () => {
  win = new BrowserWindow({
    icon: path.join(__dirname, "img", "Image_Iris_systeme.png"),
    fullscreen: true,
    maximized: false,
    center: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      sandbox: false,
    },
  });

  win.loadFile("./src/index.html");
};

app.whenReady().then(() => {
  ipcMain.handle(
    "dialog:test",
    (event, nameProduitInput, ReferenceInput, QRCodeInput) => {
      console.log("Username:", nameProduitInput);

      // Chemin vers le fichier Python à exécuter
      const cheminFichierPython = "src/Envoie_donnée_QRCode.py";

      // Exécution du fichier Python avec les données en tant qu'arguments de ligne de commande
      // avec module child_process pour installer : npm install child_process
      exec(
        `py ${cheminFichierPython} ${nameProduitInput} ${ReferenceInput} ${QRCodeInput}`, //ou python
        (erreur, stdout, stderr) => {
          if (erreur) {
            console.error(
              `Erreur lors de l'exécution du script Python : ${erreur}`
            );
            return;
          }
          console.log(`Sortie de l'exécution du script Python : ${stdout}`);
        }
      );

      return " Traitement effectué avec succès ! " /*ton username est " +
        nameProduitInput +
        " la ref : " +
        ReferenceInput +
        " Avec " +
        QRCodeInput +
        " QR CODE a generée"*/;
    }
  );

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
