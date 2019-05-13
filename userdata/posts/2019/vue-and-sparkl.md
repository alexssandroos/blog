title: Vuejs and Sparkl 
category: pentaho
date: 2019-05-13
------------------------------------

## Vuejs e Sparkl, CRUD user

O proposíto desse blog post é mostrar o passo a passo para subir o projeto de CRUD com Application Builder (Aka Sparkl) integrado ao Vuejs. Os slides apresentados no lab podem ser encontrados [aqui](
https://docs.google.com/presentation/d/1BZ2OO0Pf7iOrJk3JN0vS0XdbtZfs8rzCBobZgfyhVyQ/edit?usp=sharing) .

> Recomendo olhar com carinho os links ;) 

> O projeto pode ser encontrado [aqui](https://github.com/alexssandroos/pentahoday2019)

A pasta `app` basicamente é um plugin Sparkl que carrega um [arquivo json](https://github.com/alexssandroos/pentahoday2019/blob/master/app/resources/config/config.json) como enviroment e usa de um [endpoint](https://github.com/alexssandroos/pentahoday2019/blob/master/app/endpoints/kettle/user.ktr) como inteface de backend para a aplicação. A pasta [front](https://github.com/alexssandroos/pentahoday2019/tree/master/app/front) contém a app [Vuejs](https://vuejs.org) feita com o [webpack-simple](https://github.com/vuejs-templates/webpack-simple) template, usa o [axios](https://github.com/axios/axios) como http client e o [vuetify](https://vuetifyjs.com/en/) como a biblioteca de componentes Vue mais linda do universo :) .

KTR que seta as variaveis de ambiente : 

![app enviroment](./userdata/images/appvue_enviroment.png)

KTR que serve de backend para o CRUD: 

![app user ](./userdata/images/appvue_user_ktr.png)

### E como faze-lo funcionar ? 

Esse plugin foi testado na versão 8.2 do pentaho-server e usa postgres como banco de dados. O passo a passo de uso é basicamente.

- baixar o projeto e copiar a pasta app para dentro da pasta do pentaho `pentaho-solutions/system` 
- rodar o script [build.sql](https://github.com/alexssandroos/pentahoday2019/blob/master/app/resources/config/build.sql)

![app build](./userdata/images/appvue_build.png)

- editar o [config.json](https://github.com/alexssandroos/pentahoday2019/blob/master/app/resources/config/config.json) com as credenciais de conexão do banco.

![app config](./userdata/images/appvue_config.png)

- Iniciar o server e após o login acessa-lo no menu superior `Tools`.

![app vue 01](./userdata/images/appvue_01.png)

![app vue 02](./userdata/images/appvue_02.png)

![app vue 03](./userdata/images/appvue_03.png)


Quaisquer dúvidas e sugestões são bem vindas, assim como issues e pull requests ;)
