import React, { useEffect, useState } from 'react';

const BitcoinData = () => {
  const [bitcoinData, setBitcoinData] = useState(null);

  // Fonction pour récupérer les données depuis l'API backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/bitcoin-data'); // URL de l'API backend
      const data = await response.json();
      setBitcoinData(data);
    } catch (error) {
      console.error('Error fetching bitcoin data:', error);
    }
  };

  useEffect(() => {
    // Appel API à intervalles réguliers
    const interval = setInterval(fetchData, 5000); // Toutes les 5 secondes
    return () => clearInterval(interval); // Nettoyage à la destruction du composant
  }, []);

  return (
    <div className="bitcoin-data">
      {bitcoinData ? (
        <div>
          <p><strong>Timestamp :</strong> {new Date(bitcoinData.timestamp).toLocaleString()}</p>
          <p><strong>Cours à l'achat :</strong> {bitcoinData.buyPrice}</p>
          <p><strong>Cours à la vente :</strong> {bitcoinData.sellPrice}</p>
          <p><strong>Volume de transactions :</strong> {bitcoinData.volume}</p>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default BitcoinData;
