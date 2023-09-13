#!/bin/bash
container_id=$(docker ps|grep digiapi-container|cut -d' ' -f1)
echo $container_id
cmd="winpty docker exec -u 0 -it "$container_id" //bin//bash"
echo $cmd
exec $cmd