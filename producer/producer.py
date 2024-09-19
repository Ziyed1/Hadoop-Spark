import time
import json
import random
from kafka import KafkaProducer

# Créer une instance du producer Kafka
producer = KafkaProducer(
    bootstrap_servers=['kafka:9092'],  # Adresse du broker Kafka dans Docker Compose
    value_serializer=lambda v: json.dumps(v).encode('utf-8')  # Sérialise les messages en JSON
)

# Fonction pour générer des données aléatoires du Bitcoin
def generate_bitcoin_data():
    return {
        'timestamp': int(time.time()),
        'buy_price': round(random.uniform(30000, 40000), 2),
        'sell_price': round(random.uniform(30000, 40000), 2),
        'volume': round(random.uniform(1, 10), 2)
    }

# Boucle d'envoi de données dans Kafka
while True:
    data = generate_bitcoin_data()
    print(f"Envoi des données : {data}")
    producer.send('bitcointopic1', value=data)  
    time.sleep(5)  # Envoie de nouvelles données toutes les 5 secondes
