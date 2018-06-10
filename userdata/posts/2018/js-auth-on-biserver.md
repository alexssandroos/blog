[Home](index) / [BI-SERVER](biserver)
# Autenticação Javascript no Pentaho [under-contruction]
___
Recentemente assumi o desafio de extender funcionalidades e integrar o Pentaho Server a uma aplicação Javascrip feita em [VueJS](https://vuejs.org/), como a ideia trata de uma necessidade em comum de alguns usuários esse post registra como contornei o problema e dificuldades que encontrei até a solução definitiva.

### Ambiente 
- Pentaho 7.1
- VueJS 2
- [Axios](https://github.com/axios/axios)

### Passo a passo
- É possível testar a autenticação via token antes da implementação via `curl` ultilitário cli Linux/Macos
``` sh 
$ curl -i -H "Content-type: application/x-www-form-urlencoded" -c cookies.txt -X POST http://localhost:8080/pentaho/j_spring_security_check -d "j_username=seuUsuario&j_password=suaSenha"
```


### Deploy da aplicação
Inicialmente desenvolvi esse projeto para 'viver' contido em um plugin [Sparkl/App Builder](https://community.hds.com/docs/DOC-1009869-app-builder) mas conforme o desenvolvimento evoluiu acabei fazendo minha aplicação ter seu contexto próprio e somente consumir o Pentaho Server como uma api, então na lógica ela compartilha a mesma autenticação do Server e consome os dados nele disponibilizados mas pode estar em um outro ambiente (Apache/NGINX etc). O processo para deploy no Tomcat é tranquilamente simples basta copiar a pasta da aplicação para a **webapps** e pronto só ser feliz :) ! 

### Referências
https://help.pentaho.com/Documentation/7.1/0R0/070/020/010

https://github.com/axios/axios


