const { contextBridge, ipcRenderer, dialog } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // nous pouvons aussi exposer des variables en plus des fonctions
});

contextBridge.exposeInMainWorld("electronAPI", {
  test: (
    nameProduitInput,
    ReferenceInput,
    QRCodeInput,
    quantiteInput,
    Info_en_plus
  ) =>
    ipcRenderer.invoke(
      "dialog:test",
      nameProduitInput,
      ReferenceInput,
      QRCodeInput,
      quantiteInput,
      Info_en_plus
    ),

  quitApp: () => ipcRenderer.invoke("dialog:quitApp"),
});
