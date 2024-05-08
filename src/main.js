const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");
const { exec } = require("child_process");
let win;
const mysql = require("mysql");

const createWindow = () => {
  win = new BrowserWindow({
    icon: path.join(__dirname, "img", "Image_Iris_systeme.png"),
    fullscreen: true,
    maximized: false,
    center: true,
    frame: false, //enleve la barre par defaut
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      sandbox: false,
    },
  });

  win.loadFile("./src/index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("dialog:quitApp", () => {
    app.quit(); // Quitter l'application
    console.log("Application Fermee");
  });

  ipcMain.handle(
    "dialog:test",
    (
      event,
      nameProduitInput,
      ReferenceInput,
      QRCodeInput,
      quantiteInput,
      Info_en_plus
    ) => {
      // Chemin vers le fichier Python à exécuter
      const cheminFichierPython = "src/Envoie_donnée_QRCode.py";

      // Exécution du fichier Python avec les données en tant qu'arguments de ligne de commande
      // avec module child_process pour installer : npm install child_process
      exec(
        `python ${cheminFichierPython} ${nameProduitInput} ${ReferenceInput} ${QRCodeInput}`, //ou python sur raspberry
        (erreur, stdout, stderr) => {
          if (erreur) {
            console.error(
              `Erreur lors de l'exécution du script Python : ${erreur}`
            );
            return;
          }
          console.log(`Python fini sans erreur`);
        }
      );
      // Create the connection to database
      const connection = mysql.createConnection({
        host: "localhost", //ip raspberry pi
        user: "admin",
        password: "adminadmin",
        database: "StockIris",
      });

      connection.connect((err) => {
        if (err) {
          console.log("Erreur de connexion");
          return;
        }
        console.log("Connectee a la base MariaDB !");
      });

      // Executer la requete INSERT INTO
      connection.query(
        "INSERT INTO Produit (nomProduit, referenceProduit, quantiteStock, infoSup) VALUES ('" +
          nameProduitInput +
          "', '" +
          ReferenceInput +
          "', '" +
          quantiteInput +
          "', '" +
          Info_en_plus +
          "')",
        (err) => {
          if (err) {
            console.error(
              "Erreur lors de lexecution de la requete : " + err.stack
            );
            return;
          }
          console.log("Ligne insérée avec succès!");
        }
      );

      // Executer la requete SELECT pour avoir le dernier produit rentree
      // Récupérer une seule ligne, la première qui est la dernière si triée par ordre décroissant
      connection.query(
        "SELECT * FROM Produit ORDER BY idProduit DESC LIMIT 1",
        (err, rows) => {
          if (err) {
            console.error(
              "Erreur lors de lexecution de la requ�te : " + err.stack
            );
            return;
          }
          console.log("Dernier produit inséré : ");
          console.log(rows);
        }
      );

      connection.end();
      return " Traitement effectué avec succès ! ";
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
