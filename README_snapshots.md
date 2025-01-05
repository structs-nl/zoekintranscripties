





# Elastic snapshot stuff


gsutil -m cp -r gs://zit-elastic-public/ .
 
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "repositories.url.allowed_urls=http://192.168.178.30:8080/zit-elastic-public/" docker.elastic.co/elasticsearch/elasticsearch:7.12.1


curl -X PUT "localhost:9200/_snapshot/my_read_only_url_repository?pretty" -H 'Content-Type: application/json' -d'
{
  "type": "url",
  "settings": {
    "url": "http://192.168.178.30:8080/zit-elastic-public/"
  }
}'



curl -X GET "localhost:9200/_snapshot/my_read_only_url_repository/*?verbose=false"


curl -X POST "localhost:9200/_snapshot/my_read_only_url_repository/daily-2024.12.23-39x2-hfutcwxkzlmyzmk4w/_restore?pretty" -H 'Content-Type: application/json' -d'
{
  "indices": "entity" 
}'



curl -X POST "localhost:9200/_snapshot/my_read_only_url_repository/daily-2024.12.23-39x2-hfutcwxkzlmyzmk4w/_restore?pretty" -H 'Content-Type: application/json' -d'
{
  "indices": "suggestions"
}'


curl -X POST "localhost:9200/_snapshot/my_read_only_url_repository/daily-2024.12.23-39x2-hfutcwxkzlmyzmk4w/_restore?pretty" -H 'Content-Type: application/json' -d'
{
  "indices": "inventory"
}'



curl -X GET "localhost:9200/_cluster/health?pretty"
curl -X GET "localhost:9200/_cat/recovery"


docker save --output zit-data.tar zit-data:latest

docker load --input zit-data.tar

curl -X GET "localhost:9200/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "query_string": {
      "query": "paard"
    }
  }
}'