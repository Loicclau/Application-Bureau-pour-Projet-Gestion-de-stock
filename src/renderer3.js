window.addEventListener("load", () => {
  //Le numero du chantier
  const NChantier = sessionStorage.getItem(`NumeroChantier`);

  // Objet contenant les listes d'images par nombre de chantiers
  const chantierImages = {
    0: [
      "../Img_Stock/chantier0_image1.jpg",
      "../Img_Stock/chantier0_image2.jpg",
      "../Img_Stock/chantier0_image3.jpg",
      "../Img_Stock/chantier0_image4.jpg",
    ],
    1: [
      "../Img_Stock/chantier1_image1.jpg",
      "../Img_Stock/chantier1_image2.jpg",
      "../Img_Stock/chantier1_image3.jpg",
      "../Img_Stock/chantier1_image4.jpg",
    ],
    2: [
      "../Img_Stock/chantier2_image1.jpg",
      "../Img_Stock/chantier2_image2.jpg",
      "../Img_Stock/chantier2_image3.jpg",
      "../Img_Stock/chantier2_image4.jpg",
    ],
    3: [
      "../Img_Stock/chantier3_image1.jpg",
      "../Img_Stock/chantier3_image2.jpg",
      "../Img_Stock/chantier3_image3.jpg",
      "../Img_Stock/chantier3_image4.jpg",
    ],
    4: [
      "../Img_Stock/chantier4_image1.jpg",
      "../Img_Stock/chantier4_image2.jpg",
      "../Img_Stock/chantier4_image3.jpg",
      "../Img_Stock/chantier4_image4.jpg",
    ],
  };

  const imageStock = document.getElementById("Image_Stock");

  // Récupérer la liste d'images correspondant au numero chantiers
  const images = chantierImages[NChantier];

  // Récupérer l'index actuel depuis le stockage de session, ou initialiser à 0
  let index = parseInt(
    sessionStorage.getItem(`dernierIndexImage_${NChantier}`),
    10
  );
  if (isNaN(index)) {
    index = 0;
  }
  // Sélectionner l'image correspondante et augementer l'index
  let imageChoisie = images[index];
  index++;
  if (index >= images.length) {
    imageChoisie = images[3];
  }
  // Mettre à jour de l'index
  sessionStorage.setItem(`dernierIndexImage_${NChantier}`, index);
  imageStock.src = imageChoisie;
});
