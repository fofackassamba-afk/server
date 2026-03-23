const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// dossier à partager
const DOSSIER = path.join(__dirname, "fichiers");

// créer le dossier s'il n'existe pas
if (!fs.existsSync(DOSSIER)) {
    fs.mkdirSync(DOSSIER);
}

// afficher les fichiers
app.get("/", (req, res) => {
    fs.readdir(DOSSIER, (err, files) => {
        if (err) {
            return res.send("Erreur serveur");
        }

        let html = "<h1>LISTE DES FICHIERS</h1><ul>";

        files.forEach(file => {
            html += `<li><a href="/download/${file}">${file}</a></li>`;
        });

        html += "</ul>";

        res.send(html);
    });
});

// télécharger fichier
app.get("/download/:name", (req, res) => {
    const filePath = path.join(DOSSIER, req.params.name);
    res.download(filePath);
});

// lancer serveur
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});