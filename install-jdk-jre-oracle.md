[Home](index) / [BI-SERVER](biserver)
# Configuração – Instalando JDK/JRE Oracle no Ubuntu Server
___
Para um melhor aproveitamento do Pentaho é indicado usar o Java da Oracle, sendo assim seguem os passos para configurar um ambiente com JDK JRE redondo pronto para o Pentaho.

1 – Removendo OpenJdk

Caso possua em sua maquina o OpenJdk basta remove-lo com o seguinte comando
```sh
$ sudo apt-get purge openjdk-\*
```
2 – Baixe os Binarios e coloque na pasta /usr/local/java

Visite o site da Oracle e baixe os binários conforme a arquitetura de seu server(32 ou 64 bits). http://www.oracle.com/technetwork/java/javase/downloads/index.html

Criei um diretório em `/usr/local/java` e coloquei os binários JDK e JRE nele, caso seja de seu interesse mudar este local basta daqui para frente mudar as referencias que farei a esta pasta para a de sua preferencia.

3 – De permissão de execução aos binários e descompacte-os. Para dar permissão de execução aos binários basta rodar os comandos
```sh
$ sudo -s chmod a+x nomedobinario.tar.gz
```
rode o comando para ambos os binários(Jdk e Jre) e em seguida descompacte-os
```sh
$ sudo -s tar xvzf nomedobinario.tar.gz
```

4 – Edite o arquivo profile (/etc/profile) referenciando sua versão da JDK e JRE(em meu caso  1.8.0_91)

Adicione as linhas abaixo ao fim de seu arquivo `/etc/profile`  :
```sh
JAVA_HOME=/usr/local/java/jdk1.8.0_91
PATH=$PATH:$HOME/bin:$JAVA_HOME/bin
JRE_HOME=/usr/local/java/jre1.8.0_91
PATH=$PATH:$HOME/bin:$JRE_HOME/bin
export JAVA_HOME
export JRE_HOME
export PATH
```
se for o caso mude o final para a versão que baixou da jdk/jre.

5 – 'Aponte' onde o Oracle JDK/JRE esta instalado. Rode os comandos abaixo(caso tenha escolhido outra pasta para colocar os binários ou outra versão do Java altere antes de roda-los)
```sh
sudo update-alternatives –install “/usr/bin/java” “java” “/usr/local/java/jre1.8.0_91/bin/java” 1
```
```sh
sudo update-alternatives –install “/usr/bin/javac” “javac” “/usr/local/java/jdk1.8.0_91/bin/javac” 1
```
```sh
sudo update-alternatives –install “/usr/bin/javaws” “javaws” “/usr/local/java/jre1.8.0_91/bin/javaws” 1
```
6 – Defina o Java Oracle como padrão. Rode os comandos abaixo(caso tenha escolhido outra pasta para colocar os binários ou outra versão do Java altere antes de roda-los)
```sh
sudo update-alternatives –set java /usr/local/java/jre1.8.0_91/bin/java
```
```sh
sudo update-alternatives –set javac /usr/local/java/jdk1.8.0_91/bin/javac
```
```sh
sudo update-alternatives –set javaws /usr/local/java/jre1.8.0_91/bin/javaws
```
7 – Recarregue o profile.Rode o comando
```sh
./etc/profile
```
para testar rode :
```sh
java -version 
```
```sh
javac -version
```
