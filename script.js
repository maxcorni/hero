// On récupère tous les éléments avec la classe .accordion-item
let accordions = document.querySelectorAll(".accordion-item");

// Ajout d'un event listener pour chaque élément .accordion-header
accordions.forEach(function(item) {
    let header = item.querySelector(".accordion-header");
    header.addEventListener("click", function() {
        // Si l'élément a déjà la classe "open", on la retire pour cacher la body
        if (item.classList.contains("accordion-open")) {
            item.classList.remove("accordion-open");
        } else {
            // Cache toutes les autres bodies
            accordions.forEach(function(accordionBody) {
                accordionBody.classList.remove("accordion-open");
            });
            // Affiche la body de l'élément sélectionné
            item.classList.add("accordion-open");
        }
    });
});

