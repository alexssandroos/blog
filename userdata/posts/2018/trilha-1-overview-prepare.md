title: Introdução a Trilha Pentaho - Parte 2
category: trilha-pentaho-init
date: 2018-06-21
------------------------------------

## Overview Pentaho e preparação do ambiente
___

### INTRODUÇÃO

Nesse post vamos conhecer um pouco do Pentaho e deixar nosso ambiente preparado para trabalhamos. 

### ARQUITETURA PENTAHO

Hitachi Vantara/Pentaho trata-se de uma suite para projetos de Business Intelligence/Big Data/Data Science ponta-a-ponta, possui soluções/ferramentas para atender as necessidades desde a retirada de informações até a exibição em forma de relatórios , modelos estátisticos, Dashboards etc. Desenvolvido em Java é extremamente customizável e extensível

![Arquitetura Pentaho](./userdata/images/trilha-1-01.jpg)


Das ferramentas que compoem essa suite podemos citar : 

+ **Pentaho Data Integration(Aka Kettle)** : Na minha humilde opnião a melhor ferramenta da suite, trata-se de uma ferramenta de Extração transformação e carga ou ETL para os mais intimos, possui componentes de conexão para arquivos(txt, csv, xls, xml, etc), para bancos de dados relacionais(PG, M$SQLSERVER, MYSQL), bancos Nosql (Hadoop, Mongo, Cassandra etc.), webservices e por ai vai. É bem intuitiva e poderosa, já preparada para Big Data e Ciencia de dados, pode ter funcionalidades estendidas via plugin ou interfaces de programação.

![Arquitetura Pentaho](./userdata/images/trilha-1-03.jpg)

+ **Pentaho Business Analytics Server** : Trata do front-end da suite, onde são exibidas aos usuários os relatórios, acesso as visões analiticas(OLAP), Dashboards, também é extremamente customizável e com funcionalidades extendidas por plugins. 

![Imagem BA Server 7](./userdata/images/trilha-1-04.jpg)

+ **Pentaho Schema Workbench(Aka Mondrian)** : De maneira resumida é a ferramenta da suite que usamos para modelar o cubo OLAP , mapear e definir as como serao exibidas as dimensoes e fatos bem como preestabelecer rebras de acesso(Roles).

![Imagem Schema Workbench](./userdata/images/trilha-1-06.jpg)

+ **Pentaho Report Design** :  Como o próprio nome já sugere essa ferrameta é responsavel pala criação de relatórios, lembra um pouco o Cristal Report. 

![Imagem Report Design](./userdata/images/trilha-1-05.jpg)

+ **Pentaho Metadata Editor** :  Ferramenta responsável pela criação de Metamodelos lógicos baseados na extrutura fisica do relacional, feito isso o usuário final poderá criar relatórios dinâmicos seguindo essa extrutura. 

![Imagem Metadata Editor](./userdata/images/trilha-1-07.jpg)


+ **Dentre outras** dentro da suite também temos soluções para Mineração de dados e aprendizado de maquina com [Pentaho Data Mining, aka Weka](https://wiki.pentaho.com/display/DATAMINING/Pentaho+Data+Mining+Community+Documentation), soluções para agregações de tabelas com [Pentaho Agreggator Design](https://help.pentaho.com/Documentation/7.1/0N0/010/000), e um mar de plugins e extensões que podem ser acopladas extendendo funcionalidades a suite. 


### PREPARACAO DO AMBIENTE 

A preparação do ambiente para trabalhar com o Pentaho é bem simples, basicamentes precisas de : 

- JDK 8 ORACLE 

- VARIAVEL de AMBIENTE 

Os s de inicio checam a existencia das variaveis `PENTAHO_JAVA_HOME` seguidas de `JAVA_HOME` E `JRE_HOME` e em ultimo caso não havendo as variáveis de ambiente ele executa com o launcher java.
Em resumo caso use Windows basta ir em Configurações avançadas do Sistema e na aba Avançado definir as variaveis apontando para jdk e jre. Já no Linux/Unix podes configurá-las no `/etc/profile` para todos os usuários ou no `~/.bashrc` para seu usuário específico.
De todo modo esses dois artigos podem lhe orientar melhor como proceder nas configurações relacionadas a essa etapa : 

[Configurando variaveis de ambiente Windows](https://confluence.atlassian.com/confbr1/configurando-a-variavel-java_home-no-windows-933709538.html)

[Configurando variaveis de ambiente Linux](https://www.2daygeek.com/setup-java-environment-variables-on-ubuntu-centos-debian-fedora-mint-rhel-opensuse/)

> Para esse projeto usarei somente a variável `PENTAHO_JAVA_HOME` 

> Caso use Linux recomendo instalar a lib `libwebkitgtk-1.0`

> No Windows recomendo atualizar o browser Microsoft Internet Explorer 11+


### BAIXANDO AS FERRAMENTAS 

Até a versão 7.X cada ferramenta da suite Pentaho ficava em um diretorio específico no dominio https://sourceforge.net/projects/pentaho/files apartir da versão 8.X as ferramentas estão dentro da pasta específica da versão dentro do mesmo domínio. Como comentei no [post anterior](#/blog/trilha-pentaho-init/2018/trilha-1-intro) usarei nessa trilha a versão 7.1 da suite, desta instalaremos : 


[Business Analytics Server](https://sourceforge.net/projects/pentaho/files/Business%20Intelligence%20Server/7.1/pentaho-server-ce-7.1.0.0-12.zip/download)

[Data Integration](https://sourceforge.net/projects/pentaho/files/Data%20Integration/7.1/pdi-ce-7.1.0.0-12.zip/download)

[Report Design](https://sourceforge.net/projects/pentaho/files/Report%20Designer/7.1/prd-ce-7.1.0.0-12.zip/download)

[Metadata Editor](https://sourceforge.net/projects/pentaho/files/Pentaho%20Metadata/7.1/pme-ce-7.1.0.0-12.zip/download)

[Schema Workbench](https://sourceforge.net/projects/mondrian/files/schema%20workbench/3.14.0/psw-ce-3.14.0.0-12.zip/download)

> Da versão 8 em diante o Schema Workbench está contido no diretorio do Pentaho na versão correspondente.

[Base ERP](drive.google.com)


Como SGBD usaremos o PostgreSQL em sua versão 9.5, navegue até a pasta `bin` do Postgres via CLI e execute os comandos : 
Criar Banco 

```bash
$ createdb -U postgres --lc-collate=C --lc-ctype=C -E LATIN1 -T template0 ERPDemo
```

Restaurar o Backup

```bash
$ psql -U postgres ERPDemo <(local-do-arquivo)\ERPDemo.bkp
```

A extrutura de arquivos que sugiro e uso é a seguinte : 

```bash
/
└── pentaho/
    ├── pentaho-server/
    └── design-tools/
       ├── data-integration
       ├── report-design
       ├── metadata-editor
       └── schema-workbench

```


### LINKS

[Doc - Preparando o ambiente Windows](https://help.pentaho.com/Documentation/7.1/Installation/Archive/010_Prepare_windows_environment)

[Doc - Preparando o ambiente Linux](https://help.pentaho.com/Documentation/7.1/Installation/Archive/015_Prepare_linux_environment)

[Doc - Referencia dos Componentes](https://help.pentaho.com/Documentation/7.1/0D0/160/000)

[Instalação JDK/JRE Linux](#/blog/linux/2018/install-jdk-jre-oracle)

