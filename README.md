[![Build & Deploy](https://github.com/jbrennan414/currensee_backend/actions/workflows/deploy.yml/badge.svg)](https://github.com/jbrennan414/currensee_backend/actions/workflows/deploy.yml)


<!-- Spin up Docker container, start node and redis -->

`docker-compose up`

`access [Docker] redis-cli`

`docker exec -it [CONTAINER ID] redis-cli`


<!-- `
 INPUT 


 Exchange rate api ==> redis




` -->


<!-- 

Output 

redis ==> response 

REQUEST
/api/exchange_rates


RESPONSE
{
    USD: 1.00
    GBR: 1.24

}


 -->
