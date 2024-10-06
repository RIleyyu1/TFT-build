// Existing code for menu button toggle
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// ScrollReveal animations
const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".about__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".service__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".facility__content .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".facility__content p", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".mentor__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".banner__content h2", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".banner__content p", {
  ...scrollRevealOption,
  delay: 500,
});

// Modal code for service cards
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".close");

document.querySelectorAll('.service__card').forEach(card => {
  card.addEventListener('click', function (event) {
    if (event.target.classList.contains('save-btn')) {
      return; // Skip modal open if the save button is clicked
    }
    const imageUrl = this.getAttribute('data-image');
    modal.style.display = "block";
    modalImage.src = imageUrl; // Set the image source for the modal
  });
});

// Close the modal when the user clicks on the "x" button
closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

// Close the modal when the user clicks anywhere outside of the modal image
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Favorites functionality
let favorites = [];

// Load favorites from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
  if (savedFavorites) {
    favorites = savedFavorites;
  }
});

// Save card to favorites
document.querySelectorAll('.save-btn').forEach((button) => {
  button.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the modal from opening

    const card = button.closest('.service__card');
    const cardData = {
      image: card.querySelector('img').src,
      dataImage: card.getAttribute('data-image'),
      alt: card.querySelector('img').alt
    };

    // Check if the card is already in favorites
    if (!favorites.some(fav => fav.image === cardData.image)) {
      favorites.push(cardData);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  });
});

// Display favorites in the modal
const favoritesModal = document.getElementById("favoritesModal");
const favoritesContent = document.getElementById("favoritesContent");
const favoritesGrid = document.getElementById("favoritesGrid");
const favoritesClose = document.querySelector(".close-favorites");

document.querySelector("a[href='#favorites']").addEventListener('click', (e) => {
  e.preventDefault();
  displayFavorites();
  favoritesModal.style.display = "block";
});

// Close the favorites modal
favoritesClose.addEventListener('click', () => {
  favoritesModal.style.display = "none";
});

// Close the modal when the user clicks outside of it
window.addEventListener('click', (event) => {
  if (event.target === favoritesModal) {
    favoritesModal.style.display = "none";
  }
});

// Function to display favorites
function displayFavorites() {
  favoritesGrid.innerHTML = ''; // Clear current favorites

  favorites.forEach((favorite, index) => {
    const card = document.createElement('div');
    card.className = 'service__card';
    card.setAttribute('data-image', favorite.dataImage);

    const img = document.createElement('img');
    img.src = favorite.image;
    img.alt = favorite.alt;

    // Add click event to open the image modal
    img.addEventListener('click', function () {
      modal.style.display = "block";
      modalImage.src = favorite.dataImage; // Set the image source for the modal
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';

    // Add event listener to remove button
    removeBtn.addEventListener('click', () => {
      removeFavorite(index);
    });

    card.appendChild(img);
    card.appendChild(removeBtn);
    favoritesGrid.appendChild(card);
  });
}

// Function to remove a favorite
function removeFavorite(index) {
  favorites.splice(index, 1); // Remove the favorite at the given index
  localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
  displayFavorites(); // Refresh the favorites display
}
