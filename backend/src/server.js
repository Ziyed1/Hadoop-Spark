const express = require('express');
const dotenv = require('dotenv');
const { startKafkaConsumer } = require('./kafkaConsumer');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

let bitcoinData = null;  // Variable pour stocker les données

// Route pour obtenir les données du Bitcoin
app.get('/bitcoin-data', (req, res) => {
  if (bitcoinData) {
    res.json(bitcoinData);
  } else {
    res.status(404).json({ error: 'No data available' });
  }
});

// Lancer le consommateur Kafka
startKafkaConsumer((data) => {
  bitcoinData = data;  // Met à jour les données du Bitcoin avec les dernières infos
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
