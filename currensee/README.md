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
<!-- This shit is so confusing. Ultimately I want to hit api.currensee.app, and it return latest rates 

1) ✅ Setup a docker container with nginx
2) ✅ Hit localhost:{PORT} and get a response from nginx
3) ✅ Hit localhost/ and get a response from nginx
4) Can I wire up / to direct to server.js?
5) 

 -->