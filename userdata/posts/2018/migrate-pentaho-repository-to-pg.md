title: Migrando repositorio Pentaho para PostgreSQL
category: pentaho
date: 2018-06-19
------------------------------------

### Migração do Repositório Pentaho(5.X,6.X,7.X) para PostgreSQL
___

<blockquote class="tip">
  <p>
    Esse post toma como referencia os diretorios a partir de sua bi-server/pentaho-server, assume que usarás o usuário postgres, Tomcat como container da aplicação e credencias sugeridas na doc, caso mude algum desses atentar-se as modificações necessárias ao editar os devidos arquivos de configuração. 
  </p>
</blockquote>

Scripts a rodar no banco( estão dentro da pasta data/postgresql)

```sql   
   psql -U postgres -a -f create_repository_postgresql.sql 
   psql -U postgres -a -f create_quartz_postgresql.sql
   psql -U postgres -a -f create_jcr_postgresql.sql
```   

<blockquote class="tip">
  <p>
    Para contornar o erro que persiste referente ao [JIRA BISERVER-11028](http://jira.pentaho.com/browse/BISERVER-11028). Criar a tabela QRTZ_DUMMY com letras *MAIUSCULAS* no banco Quartz
  </p>
</blockquote>

```sql
CREATE TABLE "QRTZ_DUMMY"
(
  id bigint
);
ALTER TABLE "QRTZ_DUMMY" OWNER TO pentaho_user;
```

#### Arquivos a serem editados seguidos do motivo: 

| Arquivo | Observação |
| :----: | -----: |
| pentaho-solutions/system/quartz/quartz.properties | Configurações do Quartz |
| pentaho-solutions/system/hibernate/hibernate-settings.xml | Configurações do Hibernate 1 |
| pentaho-solutions/system/hibernate/postgresql.hibernate.cfg.xml | Configurações do Hibernate 2 |
| pentaho-solutions/system/jackrabbit/repository.xml | Configuração do Jackrabbit |
| pentaho-solutions/system/applicationContext-spring-security-hibernate.properties | Spring Security |
| pentaho-solutions/system/simple-jndi/jdbc.properties | Conexões JNDI default |
| tomcat/webapps/pentaho/META-INF/context.xml | Contexto da aplicação | 
| tomcat/webapps/pentaho/WEB-INF/web.xml | *Opcional* caso deseje desativar o Hypersonic |
| pentaho-solutions/system/pentaho-spring-beans.xml | *Opcional* caso deseje desativar o H2 | 

<blockquote class="tip">
  <p>
    Caso esqueça de editar algum arquivo e tenha subido o serviço do Pentaho pare-o edite os arquivos necessários e rode novamente os scripts de create.
  </p>
</blockquote>

#### 1 - Configurando o Quartz
Os dados referentes a eventos como agendameto de relatórios ficam armazenados no Quartz JobsStore. 
  1.1 - editar : pentaho-solutions/system/quartz/quartz.properties

```properties
org.quartz.jobStore.driverDelegateClass = org.quartz.impl.jdbcjobstore.PostgreSQLDelegate
```

```properties
org.quartz.dataSource.myDS.jndiURL = Quartz
```

#### 2 - Configurando o Hibernate
Pentaho usa o [Hibernate](http://hibernate.org/orm/) como seu orm
  2.1 - editar : pentaho-solutions/system/hibernate/hibernate-settings.xml

```xml
<config-file>system/hibernate/postgresql.hibernate.cfg.xml</config-file>
```

  2.2 - editar : pentaho-solutions/system/hibernate/postgresql.hibernate.cfg.xml
  
```xml
    ... trecho anterior omitido ...
    <property name="connection.driver_class">org.postgresql.Driver</property>
    <property name="connection.url">jdbc:postgresql://localhost:5432/hibernate</property>
    <property name="dialect">org.hibernate.dialect.PostgreSQLDialect</property>
    <property name="connection.username">hibuser</property>
    <property name="connection.password">password</property>
    <property name="connection.pool_size">10</property>
    <property name="show_sql">false</property>
    <property name="hibernate.jdbc.use_streams_for_binary">true</property>
    <property name="hibernate.hbm2ddl.auto">update</property>
    <mapping resource="hibernate/postgresql.hbm.xml" />
    ... trecho posterior omitido ...
```
#### 3 - Ajustes Spring Security
  3.1 edit : pentaho-solutions/system/applicationContext-spring-security-hibernate.properties

```properties
jdbc.driver=org.postgresql.Driver
jdbc.url=jdbc:postgresql://localhost:5432/hibernate
jdbc.username=hibuser
jdbc.password=password
hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```
#### 4 - 
  4.1 - edite: pentaho-solutions/system/simple-jndi/jdbc.properties
```properties

```
<blockquote class="tip">
  <p>
    Caso pretenda desativar o H2/Hypersonic ṕodes comentar as linhas da demo.
  </p>
</blockquote>



#### Opcionais( Mas eu em seu lugar faria hehe :) )

#### Referencias e links úteis

[Artigo Kleyson Rios para Pentaho 5.4](http://kleysonrios.blogspot.com/2015/09/pentaho-54-postgresql.html)

[Doc. Oficial](https://help.pentaho.com/Documentation/6.0/0F0/0K0/040/0A0)








