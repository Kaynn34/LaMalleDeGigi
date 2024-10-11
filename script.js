
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);


// Animation de défilement en douceur
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  



    // Sélectionner les éléments du DOM
    const menuToggle = document.getElementById('menu-toggle');
    const navbari = document.querySelector('.navbar');

    // Ajouter un écouteur d'événements pour le clic sur le bouton toggle
    menuToggle.addEventListener('click', () => {
        // Basculer la classe 'active' sur la navbar
        navbari.classList.toggle('active');
    });






// Variables pour suivre la position de scroll
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function() {
    // Obtenez la position actuelle du scroll
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si on descend, on cache la navbar
    if (scrollTop > lastScrollTop) {
        navbar.classList.add("navbar-hidden");
    } else {
        // Si on remonte, on affiche la navbar
        navbar.classList.remove("navbar-hidden");
    }

    // Mettre à jour la dernière position de scroll
    lastScrollTop = scrollTop;
});








let panier = [];

// Charger le panier à partir du localStorage
function chargerPanier() {
    const panierSauvegarde = localStorage.getItem('panier');
    if (panierSauvegarde) {
        panier = JSON.parse(panierSauvegarde);
    }
}

// Sauvegarder le panier dans le localStorage
function sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(panier));
}

// Ajouter un produit au panier
function ajouterProduitAuPanier(id, nom, prix, image) {
    const produitExistant = panier.find(produit => produit.id === id);

    if (produitExistant) {
        produitExistant.quantite += 1;
    } else {
        panier.push({
            id: id,
            nom: nom,
            prix: prix,
            quantite: 1,
            image: image
        });
    }

    sauvegarderPanier();
    afficherPanier();
    afficherTotal(); // Mettez à jour le total immédiatement après l'ajout
}

// Retirer un produit du panier
function retirerProduit(id) {
    panier = panier.filter(produit => produit.id !== id);
    sauvegarderPanier();
    afficherPanier();
    afficherTotal(); // Mettre à jour le total après la suppression
}

// Augmenter la quantité d'un produit
function augmenterQuantite(id) {
    const produit = panier.find(produit => produit.id === id);
    if (produit) {
        produit.quantite += 1;
        sauvegarderPanier();
        afficherPanier();
        afficherTotal(); // Mettez à jour le total après augmentation
    }
}

// Diminuer la quantité d'un produit
function diminuerQuantite(id) {
    const produit = panier.find(produit => produit.id === id);
    if (produit && produit.quantite > 1) {
        produit.quantite -= 1;
        sauvegarderPanier();
        afficherPanier();
        afficherTotal(); // Mettez à jour le total après diminution
    }
}

// Afficher le panier
function afficherPanier() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        panier.forEach(produit => {
            const produitHTML = `
                <div class="cart-item" data-id="${produit.id}">
                    <img src="${produit.image}" alt="${produit.nom}">
                    <div class="item-details">
                        <h3>${produit.nom}</h3>
                        <p>Quantité: ${produit.quantite}</p>
                        <p>Prix: ${(produit.prix * produit.quantite).toFixed(2)}€</p>
                    </div>
                    <div class="item-actions">
                        <button class="btn-minus">-</button>
                        <button class="btn-plus">+</button>
                        <button class="btn-remove">Retirer</button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += produitHTML;
        });

        afficherTotal();
    }
}

// Afficher le total
function afficherTotal() {
    const total = panier.reduce((acc, produit) => acc + produit.prix * produit.quantite, 0);
    
    // Mettre à jour le total dans la section panier
    const totalElement = document.querySelector('.cart-total h2');
    if (totalElement) {
        totalElement.textContent = `Total: ${total.toFixed(2)}€`;
    }

    // Mettre à jour la notification de prix à côté du bouton "Mon Panier"
    const cartNotification = document.querySelector('.cart-notification');
    if (cartNotification) {
        cartNotification.textContent = `${total.toFixed(2)}€`;
    }
}

// Charger et afficher le panier au démarrage
document.addEventListener('DOMContentLoaded', () => {
    chargerPanier();
    afficherPanier();
    afficherTotal(); // Appeler aussi afficherTotal pour mettre à jour la notification du prix
});

// Ajouter un produit au panier depuis la galerie/produits
document.addEventListener('click', function (event) {
    if (event.target.matches('.btn-commander')) {
        event.preventDefault(); // Empêcher le comportement par défaut du lien

        // Récupérer les informations du produit à partir des attributs data-*
        const produitCard = event.target.closest('.product-card');
        const id = produitCard.getAttribute('data-id');
        const nom = produitCard.getAttribute('data-nom');
        const prix = parseFloat(produitCard.getAttribute('data-prix'));
        const image = produitCard.getAttribute('data-image');

        // Ajouter le produit au panier
        ajouterProduitAuPanier(id, nom, prix, image);

        // Afficher un message ou notification si nécessaire (optionnel)
       
    }
});

// Gérer les événements pour les boutons "+", "-", et "Retirer"
document.addEventListener('click', function (event) {
    const cartItem = event.target.closest('.cart-item');
    if (cartItem) {
        const id = cartItem.getAttribute('data-id');

        if (event.target.matches('.btn-plus')) {
            augmenterQuantite(id);
        }

        if (event.target.matches('.btn-minus')) {
            diminuerQuantite(id);
        }

        if (event.target.matches('.btn-remove')) {
            retirerProduit(id);
        }
    }
});

