from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("myapp").getOrCreate()
sc = spark.sparkContext

# Consumer code
df = spark.readStream.format("kafka")\
    .option("kafka.bootstrap.servers", "kafka:9092")\
    .option("subscribe", "bitcointopic1")\
    .load()

# Afficher la data
query = df.writeStream.outputMode("append").format("console").start()

query.awaitTermination()