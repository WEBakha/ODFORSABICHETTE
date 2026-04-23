let currentLevelIndex = 0;
let score = 0;

const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const levelContainer = document.getElementById('level-container');
const levelContent = document.getElementById('level-content');

// --- LA BASE DE DONNÉES DES 100 QUESTIONS ---
const gameData = [
    // 🎤 ANECDOTES ET FUN FACTS (1-20)
    { type: "quiz", question: "Quelle est la date et l'heure exactes de la formation du groupe ?", options: ["23 Juillet 2010 à 20h22", "23 Juillet 2011 à 19h00", "15 Août 2010 à 20h22", "25 Mars 2015 à 20h22"], answer: "23 Juillet 2010 à 20h22" },
    { type: "riddle", question: "Quelle était la phobie étonnante de Liam ? (Indice : couvert de table)", answer: "cuillère" },
    { type: "riddle", question: "Comment s'appelle le célèbre pigeon de Louis ?", answer: "Kevin" },
    { type: "quiz", question: "Qui aime les filles qui mangent des carottes ?", options: ["Harry", "Liam", "Louis", "Niall"], answer: "Louis" },
    { type: "riddle", question: "Combien de tétons Harry possède-t-il ?", answer: "4" },
    { type: "riddle", question: "Complète la célèbre réplique de Zayn : 'Vas...'", answer: "Happenin" },
    { type: "quiz", question: "Quelle chanson Harry a-t-il chantée à son audition ?", options: ["Isn't She Lovely", "Let Me Love You", "Cry Me A River", "So Sick"], answer: "Isn't She Lovely" },
    { type: "quiz", question: "Quelle chanson Niall a-t-il chantée à son audition ?", options: ["So Sick", "Hey There Delilah", "Let Me Love You", "Torn"], answer: "So Sick" },
    { type: "quiz", question: "Quelle chanson Liam a-t-il chantée à son audition ?", options: ["Cry Me A River", "Fly Me To The Moon", "Isn't She Lovely", "Stop Crying Your Heart Out"], answer: "Cry Me A River" },
    { type: "quiz", question: "Quelle chanson Louis a-t-il chantée à son audition ?", options: ["Hey There Delilah", "Iris", "Chasing Cars", "Make You Feel My Love"], answer: "Hey There Delilah" },
    { type: "quiz", question: "Quelle chanson Zayn a-t-il chantée à son audition ?", options: ["Let Me Love You", "Ignition", "So Sick", "With You"], answer: "Let Me Love You" },
    { type: "riddle", question: "Quelle est la ville natale de Niall ?", answer: "Mullingar" },
    { type: "quiz", question: "Comment s'appelait la boulangerie où travaillait Harry ?", options: ["W. Mandeville", "Holmes Chapel Bakery", "Cheshire Bakes", "Harry's Loaves"], answer: "W. Mandeville" },
    { type: "quiz", question: "Qui a eu l'idée du nom 'One Direction' ?", options: ["Simon Cowell", "Harry", "Zayn", "Liam"], answer: "Harry" },
    { type: "quiz", question: "Qui est le seul membre à ne pas être britannique ?", options: ["Niall", "Zayn", "Harry", "Louis"], answer: "Niall" },
    { type: "riddle", question: "Quel membre a acheté le club de football de Doncaster Rovers ?", answer: "Louis" },
    { type: "riddle", question: "Dans 'Best Song Ever', comment s'appelle l'assistante sexy jouée par Zayn ?", answer: "Veronica" },
    { type: "riddle", question: "Quel membre a dû porter un faux appareil dentaire dans un clip ?", answer: "Niall" },
    { type: "quiz", question: "Quelle était la couleur naturelle des cheveux de Niall pendant l'ère X-Factor ?", options: ["Blond", "Roux", "Brun", "Noir"], answer: "Brun" },
    { type: "quiz", question: "Quel mentor a formé le groupe ?", options: ["Nicole Scherzinger", "Simon Cowell", "Louis Walsh", "Cheryl Cole"], answer: "Simon Cowell" },

    // 📅 DATES ET CHIFFRES (21-40)
    { type: "quiz", question: "À quelle date Zayn a-t-il officiellement quitté le groupe ?", options: ["25 Mars 2015", "23 Juillet 2015", "1 Janvier 2016", "14 Février 2015"], answer: "25 Mars 2015" },
    { type: "quiz", question: "En quelle année est sorti l'album 'Midnight Memories' ?", options: ["2011", "2012", "2013", "2014"], answer: "2013" },
    { type: "riddle", question: "Combien d'albums studio les One Direction ont-ils sortis ?", answer: "5" },
    { type: "quiz", question: "Quel âge avait Harry lors de son audition ?", options: ["15", "16", "17", "18"], answer: "16" },
    { type: "quiz", question: "En quelle année le Hiatus a-t-il commencé ?", options: ["2014", "2015", "2016", "2017"], answer: "2016" },
    { type: "quiz", question: "Combien de titres composent l'édition standard de Made in the A.M. ?", options: ["11", "13", "15", "17"], answer: "13" },
    { type: "riddle", question: "À quelle place ont-ils fini lors de la finale d'X-Factor ?", answer: "3" },
    { type: "quiz", question: "En quelle année est né Louis Tomlinson ?", options: ["1991", "1992", "1993", "1994"], answer: "1991" },
    { type: "quiz", question: "En quelle année est né Liam Payne ?", options: ["1992", "1993", "1994", "1995"], answer: "1993" },
    { type: "quiz", question: "En quelle année est né Zayn Malik ?", options: ["1992", "1993", "1994", "1995"], answer: "1993" },
    { type: "quiz", question: "En quelle année est né Niall Horan ?", options: ["1992", "1993", "1994", "1995"], answer: "1993" },
    { type: "quiz", question: "En quelle année est né Harry Styles ?", options: ["1992", "1993", "1994", "1995"], answer: "1994" },
    { type: "quiz", question: "Combien de Brit Awards ont-ils remportés au total ?", options: ["5", "7", "9", "11"], answer: "7" },
    { type: "quiz", question: "Quelle est la date du '1D Day' (le live de 7h) ?", options: ["23 Juillet 2013", "23 Novembre 2013", "25 Décembre 2014", "1 Janvier 2015"], answer: "23 Novembre 2013" },
    { type: "quiz", question: "En quelle année est sorti le film 'This Is Us' ?", options: ["2012", "2013", "2014", "2015"], answer: "2013" },
    { type: "quiz", question: "Combien de dates comptait la tournée 'Where We Are Tour' ?", options: ["69", "85", "100", "115"], answer: "69" },
    { type: "quiz", question: "En quel mois est sorti 'Drag Me Down' (par surprise) ?", options: ["Juin 2015", "Juillet 2015", "Août 2015", "Septembre 2015"], answer: "Juillet 2015" },
    { type: "quiz", question: "En quelle année 'What Makes You Beautiful' a-t-il gagné son Brit Award ?", options: ["2011", "2012", "2013", "2014"], answer: "2012" },
    { type: "riddle", question: "Combien de membres comptaient les One Direction à l'origine ?", answer: "5" },
    { type: "quiz", question: "Combien de mois a duré l'ère X-Factor pour eux (audition à finale) ?", options: ["3 mois", "5 mois", "7 mois", "9 mois"], answer: "5 mois" },

    // ✒️ TATOUAGES (41-60)
    { type: "quiz", question: "Lequel des garçons n'a AUCUN tatouage ?", options: ["Niall", "Harry", "Zayn", "Liam"], answer: "Niall" },
    { type: "quiz", question: "Qui a un tatouage de grand papillon sur le torse ?", options: ["Zayn", "Louis", "Harry", "Liam"], answer: "Harry" },
    { type: "quiz", question: "Qui a un cerf tatoué sur l'épaule ?", options: ["Louis", "Liam", "Zayn", "Harry"], answer: "Louis" },
    { type: "quiz", question: "Qui a des chevrons sur l'avant-bras droit ?", options: ["Zayn", "Harry", "Liam", "Louis"], answer: "Liam" },
    { type: "quiz", question: "Qui a le mot 'ZAP!' tatoué sur le bras ?", options: ["Louis", "Zayn", "Harry", "Liam"], answer: "Zayn" },
    { type: "quiz", question: "Qui s'est tatoué une tasse de thé ?", options: ["Louis", "Harry", "Liam", "Niall"], answer: "Louis" },
    { type: "quiz", question: "Qui a une sirène tatouée sur l'avant-bras ?", options: ["Harry", "Liam", "Louis", "Zayn"], answer: "Harry" },
    { type: "quiz", question: "Qui a des plumes tatouées sur l'avant-bras ?", options: ["Zayn", "Liam", "Louis", "Harry"], answer: "Liam" },
    { type: "quiz", question: "Qui a une boussole tatouée ?", options: ["Louis", "Harry", "Zayn", "Liam"], answer: "Louis" },
    { type: "quiz", question: "Qui a une grande ancre tatouée sur le poignet ?", options: ["Harry", "Louis", "Liam", "Zayn"], answer: "Harry" },
    { type: "quiz", question: "Qui a une corde tatouée sur le poignet droit ?", options: ["Louis", "Zayn", "Harry", "Liam"], answer: "Louis" },
    { type: "quiz", question: "Qui s'est tatoué '17 Black' ?", options: ["Harry", "Louis", "Zayn", "Liam"], answer: "Harry" },
    { type: "quiz", question: "Qui a 'It is what it is' tatoué sur le torse ?", options: ["Louis", "Zayn", "Harry", "Liam"], answer: "Louis" },
    { type: "quiz", question: "Qui a des roses tatouées sur la main ?", options: ["Liam", "Harry", "Zayn", "Louis"], answer: "Liam" },
    { type: "quiz", question: "Qui a deux hirondelles tatouées sur le torse ?", options: ["Harry", "Louis", "Zayn", "Liam"], answer: "Harry" },
    { type: "quiz", question: "Qui a un cœur anatomique tatoué ?", options: ["Harry", "Zayn", "Louis", "Liam"], answer: "Harry" },
    { type: "quiz", question: "Qui a 'Oops!' tatoué sur le bras ?", options: ["Louis", "Harry", "Zayn", "Liam"], answer: "Louis" },
    { type: "quiz", question: "Qui a 'Hi' tatoué sur le bras (souvent associé au précédent) ?", options: ["Harry", "Louis", "Zayn", "Niall"], answer: "Harry" },
    { type: "quiz", question: "Qui s'est tatoué 'Chillin' avec un palmier ?", options: ["Zayn", "Louis", "Liam", "Harry"], answer: "Zayn" },
    { type: "quiz", question: "Qui a une petite croix sur la main ?", options: ["Harry", "Zayn", "Liam", "Louis"], answer: "Harry" },

    // 🎵 PAROLES ET MUSIQUES (61-80)
    { type: "riddle", question: "Paroles mélangées : Remets ces lettres dans l'ordre pour trouver une chanson (rnto)", answer: "torn" },
    { type: "riddle", question: "Complète : 'Baby you light up my world like...'", answer: "nobody else" },
    { type: "riddle", question: "Complète : 'Does it ever drive you...'", answer: "crazy" },
    { type: "riddle", question: "Complète : 'I have loved you since we were...'", answer: "18" },
    { type: "riddle", question: "Paroles mélangées : (oetnsy gseb rve)", answer: "best song ever" },
    { type: "riddle", question: "Complète : 'We took a chonce' - Quel membre a prononcé 'chance' de cette façon culte ?", answer: "Niall" },
    { type: "quiz", question: "Qui chante le premier solo dans What Makes You Beautiful ?", options: ["Liam", "Harry", "Zayn", "Louis"], answer: "Liam" },
    { type: "riddle", question: "Complète : 'Written in these walls are the...'", answer: "stories" },
    { type: "riddle", question: "Paroles mélangées : (dighnmti smieeomr)", answer: "midnight memories" },
    { type: "quiz", question: "Qui chante les notes aiguës mythiques à la fin de Steal My Girl ?", options: ["Zayn", "Liam", "Harry", "Louis"], answer: "Zayn" },
    { type: "riddle", question: "Complète : 'I'm half a heart without...'", answer: "you" },
    { type: "riddle", question: "Paroles mélangées : (itellt nistgh)", answer: "little things" },
    { type: "riddle", question: "Complète : 'Let's go crazy, crazy, crazy till we see the...'", answer: "sun" },
    { type: "riddle", question: "Complète : 'If you ever feel alone, don't...'", answer: "cry" },
    { type: "riddle", question: "Paroles mélangées : (rgda em dwon)", answer: "drag me down" },
    { type: "quiz", question: "Dans quelle chanson disent-ils 'Waking up to kiss you and nobody's there' ?", options: ["Half a Heart", "Perfect", "If I Could Fly", "A.M."], answer: "Half a Heart" },
    { type: "quiz", question: "Quelle chanson contient les paroles 'Lights go down, and the night is calling to me' ?", options: ["Drag Me Down", "Night Changes", "Story of My Life", "No Control"], answer: "Drag Me Down" },
    { type: "quiz", question: "Dans 'Olivia', qui crie 'I love you Olivia' à la fin ?", options: ["Harry", "Niall", "Liam", "Louis"], answer: "Harry" },
    { type: "quiz", question: "Quelle chanson est inspirée par une fan qui leur a jeté une chaussure ?", options: ["Jamais arrivé", "No Control", "Rock Me", "Il n'y a pas de chanson"], answer: "Il n'y a pas de chanson" },
    { type: "riddle", question: "Complète : 'Now I'm climbing the walls, but you don't notice at...'", answer: "all" },

    // 🎧 BLIND TESTS (81-90) - Nécessite des fichiers audio locaux (ex: audio/track1.mp3)
    { type: "quiz", audio: "audio/wmyb.mp3", question: "Quel est ce hit emblématique ?", options: ["What Makes You Beautiful", "One Thing", "Live While We're Young", "Kiss You"], answer: "What Makes You Beautiful" },
    { type: "quiz", audio: "audio/soml.mp3", question: "Reconnais-tu cette mélodie ?", options: ["Story of My Life", "You & I", "Night Changes", "Steal My Girl"], answer: "Story of My Life" },
    { type: "riddle", audio: "audio/signofthetimes.mp3", question: "Écoute cet extrait solo. Quel est le titre de cette chanson d'Harry ?", answer: "Sign of the times" },
    { type: "riddle", audio: "audio/slowhands.mp3", question: "Écoute cet extrait solo. Quel est ce hit de Niall ?", answer: "Slow Hands" },
    { type: "riddle", audio: "audio/pillowtalk.mp3", question: "Écoute cet extrait solo. Quel est le premier single solo de Zayn ?", answer: "Pillowtalk" },
    { type: "riddle", audio: "audio/stripthatdown.mp3", question: "Écoute cet extrait solo. Quel est ce titre de Liam ?", answer: "Strip that down" },
    { type: "riddle", audio: "audio/backtoyou.mp3", question: "Écoute cet extrait solo. Quel est ce hit de Louis ?", answer: "Back to you" },
    { type: "quiz", audio: "audio/nightchanges.mp3", question: "De quelle chanson des 1D vient cet extrait ?", options: ["Night Changes", "Perfect", "History", "18"], answer: "Night Changes" },
    { type: "quiz", audio: "audio/bestsongever.mp3", question: "Quel est ce titre rock/pop ?", options: ["Best Song Ever", "Midnight Memories", "Kiss You", "No Control"], answer: "Best Song Ever" },
    { type: "riddle", audio: "audio/dragmedown.mp3", question: "Écoute cette intro. Quel est le titre ?", answer: "Drag Me Down" },

    // 🖼️ IMAGES ET POCHETTES (91-100) - Nécessite des images locales
    { type: "quiz", image: "images/up-all-night.jpg", question: "De quel album est cette pochette ?", options: ["Up All Night", "Take Me Home", "Midnight Memories", "Four"], answer: "Up All Night" },
    { type: "quiz", image: "images/take-me-home.jpg", question: "De quel album est cette pochette (Cabine téléphonique) ?", options: ["Take Me Home", "Four", "Up All Night", "Made in the A.M."], answer: "Take Me Home" },
    { type: "quiz", image: "images/midnight-memories.jpg", question: "Sur quelle pochette les voit-on marcher dans la rue la nuit ?", options: ["Midnight Memories", "Four", "Take Me Home", "Up All Night"], answer: "Midnight Memories" },
    { type: "riddle", image: "images/four.jpg", question: "Quel est le nom de cet album ?", answer: "Four" },
    { type: "riddle", image: "images/made-in-the-am.jpg", question: "Quel est le nom de leur dernier album de groupe ?", answer: "Made in the A.M." },
    { type: "quiz", image: "images/harrys-house.jpg", question: "À qui appartient cet album solo (Pièce à l'envers) ?", options: ["Harry", "Niall", "Louis", "Liam"], answer: "Harry" },
    { type: "riddle", image: "images/flicker.jpg", question: "Quel est le nom du premier album solo de Niall ?", answer: "Flicker" },
    { type: "riddle", image: "images/mind-of-mine.jpg", question: "Quel est le nom du premier album solo de Zayn ?", answer: "Mind of Mine" },
    { type: "riddle", image: "images/walls.jpg", question: "Quel est le nom du premier album solo de Louis ?", answer: "Walls" },
    { type: "quiz", image: "images/wmyb-clip.jpg", question: "De quel clip est tirée cette image (Plage) ?", options: ["What Makes You Beautiful", "Live While We're Young", "Kiss You", "Steal My Girl"], answer: "What Makes You Beautiful" }
];

// --- LOGIQUE DU JEU ---

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    levelContainer.classList.remove('hidden');
    loadLevel();
});

function loadLevel() {
    levelContent.classList.remove('fade-in'); 
    void levelContent.offsetWidth; // Reset l'animation CSS
    
    const level = gameData[currentLevelIndex];
    levelContent.innerHTML = ""; 
    levelContent.classList.add('fade-in');

    // Mise à jour du Header
    document.getElementById('current-level').textContent = currentLevelIndex + 1;
    document.getElementById('score').textContent = score;

    // Création du Titre
    const questionTitle = document.createElement('h2');
    questionTitle.textContent = level.question;
    levelContent.appendChild(questionTitle);

    // Ajout Image (Si le niveau en a une)
    if (level.image) {
        const img = document.createElement('img');
        img.src = level.image;
        img.alt = "Indice visuel";
        img.style.maxWidth = "100%";
        img.style.borderRadius = "15px";
        img.style.marginBottom = "20px";
        img.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
        levelContent.appendChild(img);
    }

    // Ajout Audio (Si le niveau en a un)
    if (level.audio) {
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = level.audio;
        audio.style.marginBottom = "20px";
        audio.style.width = "100%";
        levelContent.appendChild(audio);
    }

    // Affichage des Choix (Quiz) ou du Champ de texte (Riddle)
    if (level.type === "quiz") {
        createQuiz(level);
    } else if (level.type === "riddle") {
        createRiddle(level);
    }
}

function createQuiz(level) {
    const optionsContainer = document.createElement('div');
    
    level.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('main-button');
        
        btn.onclick = () => {
            if (option === level.answer) {
                score += 10;
                nextLevel();
            } else {
                alert("Oups... Essaie encore ! ❌");
            }
        };
        optionsContainer.appendChild(btn);
    });
    levelContent.appendChild(optionsContainer);
}

function createRiddle(level) {
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "Ta réponse ici...";
    input.id = "riddle-input";
    
    const submitBtn = document.createElement('button');
    submitBtn.textContent = "Valider";
    submitBtn.classList.add('main-button');
    
    submitBtn.onclick = () => {
        const val = document.getElementById('riddle-input').value.trim();
        // On met en minuscule pour éviter les erreurs de casse
        if (val.toLowerCase() === level.answer.toLowerCase()) {
            score += 15; // Les énigmes rapportent plus !
            nextLevel();
        } else {
            alert("Ce n'est pas ça ! Cherche bien 🧐");
        }
    };
    
    levelContent.appendChild(input);
    levelContent.appendChild(submitBtn);
}

function nextLevel() {
    currentLevelIndex++;
    if (currentLevelIndex < gameData.length) {
        loadLevel();
    } else {
        levelContent.innerHTML = `
            <h2>Félicitations ! Tu as terminé le jeu ! 🎉</h2>
            <p>Ton score final est de : <strong>${score}</strong> points.</p>
            <p>Tu es officiellement une Directioner Légendaire !</p>
        `;
    }
}

function nextLevel() {
    currentLevelIndex++;
    if (currentLevelIndex < gameData.length) {
        loadLevel();
    } else {
        showFinalScreen();
    }
}

function showFinalScreen() {
    // Demander le pseudo du joueur
    const playerName = prompt("Félicitations ! Entre ton pseudo pour le classement :") || "Anonyme";
    
    // Sauvegarder le score
    saveScore(playerName, score);

    // Afficher l'écran de fin avec le classement
    levelContent.innerHTML = `
        <h2>Jeu Terminé ! 🏆</h2>
        <p>Bravo <strong>${playerName}</strong>, ton score est de : <span style="font-size:2rem; color:var(--secondary)">${score}</span></p>
        
        <div id="leaderboard">
            <h3>Classement des Directioners</h3>
            <ul id="score-list"></ul>
        </div>

        <button class="main-button" onclick="location.reload()">Rejouer</button>
    `;

    displayLeaderboard();
}

function saveScore(name, finalScore) {
    // Récupérer les anciens scores ou créer un tableau vide
    let highScores = JSON.parse(localStorage.getItem('1DHighScores')) || [];
    
    // Ajouter le nouveau score
    highScores.push({ name: name, score: finalScore });
    
    // Trier par score décroissant et ne garder que les 5 meilleurs
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5);
    
    // Enregistrer dans le navigateur
    localStorage.setItem('1DHighScores', JSON.stringify(highScores));
}

function displayLeaderboard() {
    const scoreList = document.getElementById('score-list');
    const highScores = JSON.parse(localStorage.getItem('1DHighScores')) || [];

    scoreList.innerHTML = highScores.map(entry => {
        return `<li class="score-item">
                    <span>${entry.name}</span>
                    <span class="points">${entry.score} pts</span>
                </li>`;
    }).join('');
}