// Je crée une variable promesse, en indiquant un timer de 2000 secondes. J'instaure une variable alea qui détermine
//avec une condition si alea > 0.5 alors l'opération est réussie, sinon elle a échouée.
//Dans ma promesse j'utilise .then pr gerer le succes de la promesse avec un console.log puis un .catch en cas d'erreur
//et ensuite un finally quand la promesse est terminée.

//Dans cet exemple, on crée une promesse qui simule une opération asynchrone qui prend deux secondes pour se terminer. 
//Ensuite, on utilise les méthodes then(), catch() et finally() pour enchaîner des traitements en fonction du résultat de la promesse :
//Si la promesse est résolue avec succès, la méthode then() est appelée avec la valeur de retour de la promesse en argument.
//Si la promesse échoue, la méthode catch() est appelée avec l'erreur en argument.
//La méthode finally() est toujours appelée une fois que la promesse est terminée, que ce soit avec succès ou en erreur.

const maPromesse = new Promise((resolve, reject) => {
    setTimeout(() => {
        const alea = Math.random();
        if (alea > 0.5 ) {
            resolve("L'opération est réussie !");
        }
        else {
            reject(new Error("L'opération a échoué. "));
            
        }
    }, 2000);
    });

maPromesse.then (resultat => {
    console.log(resultat);
}).catch(erreur => {
    console.error(erreur);
}).  finally (()=> {
    console.log("La promesse est terminée.");
});




