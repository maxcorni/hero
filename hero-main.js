// Le héros commence à 250 PV
// Dans un premier temps, votre héros va faire le nombre d'entraînements que l'on veut, ce qui génère entre 10 et 20 points d'endurance mais lui fait également perdre entre 5 et 10 PV.
// En second, le héros va affronter des ennemis jusqu'à l'épuisement. Chaque combat consomme entre 10 et 20 points d'endurance et entre 5 et 10 points de vie.
// À chaque combat, on peut choisir si l'on veut fuir ou combattre.
// À chaque combat, il récupère un trésor parmi trois tirés au sort dans une liste donnée.
// En dernier, on va récupérer les trésors que l'on a obtenus. Attention : si l'on meurt, les trésors sont perdus, et si l'on s'épuise, on en perd 50%.

// Initialisation
let endurance = 0;
let nbCombat = 0;
let pv = 250;

// Liste des trésors obtenable
const tresorPossible = [
    "pièces d'argent", "diamant", "os", "cuir", "saphir", "rubis", "émeraude", "perles", "sac d'or", "clé mystérieuse", "potion magique", 
    "amulette", "arc ancien", "bouclier magique", "grimoire ancien", "couronne d'or", "boussole enchantée", "parchemin sacré", "pelle dorée"
];

let tresorObtenu = [];

let enemyRandom = [
    { name: "Goblin", type: "Creature", health: 30, attack: 5 },
    { name: "Orc", type: "Creature", health: 50, attack: 10 },
    { name: "Dragon", type: "Beast", health: 200, attack: 25 },
    { name: "Troll", type: "Creature", health: 80, attack: 15 },
    { name: "Vampire", type: "Undead", health: 60, attack: 12 },
    { name: "Witch", type: "Human", health: 40, attack: 8 },
    { name: "Griffon", type: "Beast", health: 120, attack: 18 },
    { name: "Skeleton Warrior", type: "Undead", health: 40, attack: 10 },
    { name: "Zombie", type: "Undead", health: 25, attack: 4 },
    { name: "Minotaur", type: "Beast", health: 90, attack: 20 }
];

// Partie Entrainement
let nbEntrainement = prompt("Combien d'entrainement veux-tu faire ? \nAttention un entrainement rajoute de l'endurance mais consomme des pv entre 10 et 20 points)\nPv = 250 Endurance = 0");

if (!isNaN(nbEntrainement) && nbEntrainement > 0) {
    for (let i = 0; i < nbEntrainement; i++) {
        let ajoutEndurance = Math.floor(Math.random() * 11) + 10;
        let pertePv = Math.floor(Math.random() * 11) + 10;
        endurance = endurance + ajoutEndurance;
        pv = pv - pertePv;
        let message = "Entrainement n° " + (i + 1) + " vous-avez gagné " + ajoutEndurance+" point d'endurance. Et perdu " + pertePv + " point de vie.\nPv = " + pv + " Endurance = "+endurance;  
        alert(message);
    }
} else {
    alert("Il faut un nombre entier positif");
}
alert("tu as en tout " + endurance +" point d'endurance et " + pv + " point de vie. \nUn combat consomme entre 10 et 20 point d'endurance et entre 5 et 10 point de vie. \nTu peut attaquer ou fuir. \nSi tu veut fuir répond F si tu veut attaquer repond A")

// Boucle de Combat
while (endurance > 0 && pv>0) {
    // Tirer trois trésors aléatoires
    nbCombat++;
    let enemy = encounterRandomEnemy();
    alert("Combat n°"+nbCombat+"\nTu rencontre un "+enemy.name);
    let tresorsChoisis = [];
    for (let i = 0; i < 3; i++) {
        let randomTresor = tresorPossible[Math.floor(Math.random() * tresorPossible.length)];
        tresorsChoisis.push(randomTresor);
    }
    // Calcul de la perte d'endurance
    let result = calculerAttaque(pv, endurance);
    pv = result.pv;
    endurance = result.endurance;
    if (endurance === 0 || pv === 0){
        break;
    }
    // Ajout du trésor choisi à la liste des trésors obtenus
    while (true) {
        // Afficher les trois trésors et demander à l'utilisateur lequel choisir
        let choixTresor = prompt("Bravo tu as gagner ce combat.\nChoisissez un trésor parmi les trois suivants :\n1. " + tresorsChoisis[0] + "\n2. " + tresorsChoisis[1] + "\n3. " + tresorsChoisis[2] + "\nEntrez le numéro de votre choix.");

        // Vérifier si le choix est un nombre
        if (isNaN(choixTresor)) {
            alert("Ce n'est pas un nombre valide. Veuillez entrer un nombre.");
        } else {
            if (choixTresor === "1") {
                tresorObtenu.push(tresorsChoisis[0]);
                break;  // Si un choix valide est fait, on sort de la boucle
            } else if (choixTresor === "2") {
                tresorObtenu.push(tresorsChoisis[1]);
                break;  // Si un choix valide est fait, on sort de la boucle
            } else if (choixTresor === "3") {
                tresorObtenu.push(tresorsChoisis[2]);
                break;  // Si un choix valide est fait, on sort de la boucle
            } else {
                alert("Tu as choisit de ne rien prendre.");
            }
        }
    }
    
    alert("Pv restant: " + pv +"\nEndurance restante: "+ endurance);

    // Choisir entre attaquer ou fuir
    let action;
    while (true) {
        action = prompt("Fuite (F) ou Attaque (A) ?").toUpperCase(); // Convertit en majuscule pour éviter les erreurs
        if (action === "A") {
            alert("Tu continues à attaquer !");
            break; // Sort de la boucle si "A" est choisi
        } else if (action === "F") {
            alert("Tu prends la fuite !");
            break; // Sort de la boucle si "F" est choisi
        } else {
            alert("Choix invalide ! Tu dois entrer 'F' pour fuir ou 'A' pour attaquer.");
        }
    }

    if (action === "F"){
        break;
    }
}

// Calcul final du nombre de trésor
if(endurance === 0) {
    const nbPerdu = Math.floor(tresorObtenu.length / 2); // Calcul du nombre de trésors à perdre (50%)
    tresorObtenu.splice(0, nbPerdu); // Supprime les premiers trésors pour perdre 50%
    alert("Tu as fait " + nbCombat + " combat. Tu n'as plus d'endurance ! Tu as perdu 50% de tes trésors.");
} else if(pv<0){
    alert("Tu as fait " + nbCombat + " combat. Tu es gravement mort, tu as perdu tout le loot");
    tresorObtenu = []; // Réinitialise les trésors
} else {
    alert("Tu as fait " + nbCombat + " combat. Mais tu as pris la fuite petit lâche mais au moins tu as garder tous les tésors");
}

// Affichage des trésors
if (pv > 0) {
    let message = "Voici les trésors que tu as récupérés :\n";
    let count = {};
    //count va compter le nombre d'accurence d'une meme valeur 
    tresorObtenu.forEach(function (tresor) {
        if (count[tresor] === undefined) { //si valeur non définie = undefined
            count[tresor] = 1;
        } else {                           //sinon valeur + 1
            count[tresor] = count[tresor] + 1;
        }
    });

    for (let tresor in count) {
        message = message + "- " + tresor + " x" + count[tresor] + "\n";
    }
    alert(message);
}

function encounterRandomEnemy() {
    let randomIndex = Math.floor(Math.random() * enemyRandom.length);
    return enemyRandom[randomIndex];
}

function calculerAttaque(pv, endurance) {
    // Calcul de la chance d'esquiver (10% de chance)
    let esquive = Math.random() < 0.1; // 10% de chance d'esquiver (probabilité entre 0 et 1)
    if (esquive) {
        alert("Attaque esquivée ! tu n'a pas pris de dégat");
        // Si esquivée, on consomme de l'endurance mais pas de points de vie
        let perteEndurance = Math.floor(Math.random() * 11) + 10; // Valeur entre 10 et 20
        endurance = Math.max(endurance - perteEndurance, 0);
        return { pv, endurance}; // Retourne sans perte de PV
    }
    // Si l'attaque n'est pas esquivée, on calcule la perte de vie et d'endurance
    let perteEndurance = Math.floor(Math.random() * 11) + 10; // Valeur entre 10 et 20
    endurance = Math.max(endurance - perteEndurance, 0);
    while (true){
        let arme = prompt("Quelles armes utilise tu ? (epee/arc)");
        if(arme === "arc"){
            let dmgArc = Math.random() < 0.5; // 50% de chance de prendre des dégats nomrmaux
            if(dmgArc){
                let pertePv = Math.floor(Math.random() * 6) + 5; // Valeur entre 5 et 10
                pv = Math.max(pv - pertePv, 0);
            } else {
                let pertePv = Math.floor(Math.random() * 11) + 5; // Valeur entre 5 et 10
                pv = Math.max(pv - pertePv, 0);
            }
            return { pv, endurance};
        } else if(arme === "epee"){
            let dmgEpee = Math.random() < 0.7; // 70% de chance de prendre des dégats nomrmaux
            if(dmgEpee){
                let pertePv = Math.floor(Math.random() * 6) + 5; // Valeur entre 5 et 10
                pv = Math.max(pv - pertePv, 0);
            } else {
                let pertePv = Math.floor(Math.random() * 11) + 5; // Valeur entre 5 et 10
                pv = Math.max(pv - pertePv, 0);
            }
            return { pv, endurance};
        } else {
            alert("Choix invalide ! Tu dois entrer 'epee' ou 'arc' pour attaquer.");
        }
    }
}