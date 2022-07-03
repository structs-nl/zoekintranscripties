
URL=""
USR=""

curl -u $USR -X DELETE $URL/inventory
curl -u $USR -X PUT $URL/inventory -d "@mapping_inventory.json" -H 'Content-Type: application/json'

curl -u $USR -X DELETE $URL/suggestions
curl -u $USR -X PUT $URL/suggestions -d "@mapping_suggestions.json" -H 'Content-Type: application/json'

curl -u $USR -X DELETE $URL/entity
curl -u $USR -X PUT $URL/entity -d "@mapping_entity.json" -H 'Content-Type: application/json'

curl -u $USR -X PUT $URL/inventory/_settings -d "@mapping_replicas.json" -H 'Content-Type: application/json'
curl -u $USR -X PUT $URL/suggestions/_settings -d "@mapping_replicas.json" -H 'Content-Type: application/json'
curl -u $USR -X PUT $URL/entity/_settings -d "@mapping_replicas.json" -H 'Content-Type: application/json'

