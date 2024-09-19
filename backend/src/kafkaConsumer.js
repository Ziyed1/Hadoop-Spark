const dotenv = require('dotenv');
dotenv.config();

const kafka = require('kafka-node');

function startKafkaConsumer(onData) {
  const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
  const consumer = new kafka.Consumer(
    client,
    [{ topic: 'bitcoin_topic', partition: 0 }],
    { autoCommit: true }
  );

  consumer.on('message', (message) => {
    try {
      const data = JSON.parse(message.value);
      onData(data); 
    } catch (error) {
      console.error('Error parsing message', error);
    }
  });

  consumer.on('error', (err) => {
    console.error('Error with Kafka consumer', err);
  });
}

module.exports = {
  startKafkaConsumer,
};
