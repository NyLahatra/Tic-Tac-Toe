// RECUPERER TOUS LES ELEMENTS DU HTML
const cases = [...document.getElementsByClassName("case")];
const joueur = document.getElementById("joueur");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const scoreNul = document.getElementById("scoreNul");
const nomGagnant = document.getElementById("alert");
const boutonReset = document.getElementById("reset");

const state = {
    joueurEnCours : 1,
    score1 : 0,
    score2 : 0,
    scoreNul : 0,
    c1 : 0,
    c2 : 0,
    c3 : 0,
    c4 : 0,
    c5 : 0,
    c6 : 0,
    c7 : 0,
    c8 : 0,
    c9 : 0,
};

// REINITIALISEZ LE JEU
const resetState = () => {
    joueurEnCours = 1;
    state.c1 = 0;
    state.c2 = 0;
    state.c3 = 0;
    state.c4 = 0;
    state.c5 = 0;
    state.c6 = 0;
    state.c7 = 0;
    state.c8 = 0;
    state.c9 = 0;
}

const verifierVictoire = () => {
    // COMBINAISON GAGNANTE
    if (
        (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) || 
        (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
        (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0) ||
        (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
        (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
        (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
        (state.c3 == state.c5 && state.c5 == state.c7 && state.c3 > 0) ||
        (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0)
    ){
        return true;
    }
    // MATCHS NULS
    else if (
        state.c1 != 0 &&
        state.c2 != 0 &&
        state.c3 != 0 &&
        state.c4 != 0 &&
        state.c5 != 0 &&
        state.c6 != 0 &&
        state.c7 != 0 &&
        state.c8 != 0 &&
        state.c9 != 0
    ){
        return null;
    }
    else {
        return false;
    }
}

const jouerCase =(e) => {
    let idCase = e.target.id;
    
    if (state[idCase] != 0) return;

    state[idCase] = state.joueurEnCours;
    let Victoire = verifierVictoire();

    if(Victoire === true){
        nomGagnant.textContent = "Le jouer numero " + state.joueurEnCours + " gagne";
        if(state.joueurEnCours == 1){
            state.score1++;
            score1.textContent = state.score1;
        }
        else{
            state.score2++;
            score2.textContent = state.score2;
        }
    }
    else if (Victoire === null){
        nomGagnant.textContent = "Match nul";
        state.scoreNul++;
        scoreNul.textContent = state.scoreNul;
    }
    else if (Victoire === false){
        if (state.joueurEnCours === 1) {
            e.target.textContent = "X";
            state.joueurEnCours = 2;
            joueur.textContent = "2";
        } 
        else{
            e.target.textContent = "O";
            state.joueurEnCours = 1;
            joueur.textContent = "1";
        }
        nomGagnant.textContent = "";
    }
};

// BOUTON NOUVEAU JEU
boutonReset.addEventListener("click", () => {
    resetState();
    cases.forEach(c => c.textContent = "");
});

// POUR QUE LES CASES ENTTENDENT L'EVENEMENTS CLICK
cases.forEach((cases) => {
    cases.addEventListener("click", jouerCase);
});