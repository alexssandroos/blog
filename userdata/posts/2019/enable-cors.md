title: Enable CORS on Pentaho Server
category: pentaho
date: 2019-03-16
------------------------------------

## Habilitando Pentaho server para aceitar CORS

Adicionar ao `tomcat/webapps/pentaho/WEB-INF/web.xml` : 

```xml
<filter>
  <filter-name>CorsFilter</filter-name>
  <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
  <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>*</param-value>
  </init-param>
  <init-param>
    <param-name>cors.allowed.methods</param-name>
    <param-value>GET,POST,HEAD,OPTIONS,PUT, DELETE, PATCH</param-value>
  </init-param>
  <init-param>
    <param-name>cors.allowed.headers</param-name>
    <param-value>Content-Type,X-Requested-With,Accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Connection,Host,authorization</param-value>
  </init-param>
  <init-param>
    <param-name>cors.exposed.headers</param-name>
    <param-value>Access-Control-Allow-Origin,Access-Control-Allow-Credentials</param-value>
  </init-param>
  <init-param>
    <param-name>cors.support.credentials</param-name>
    <param-value>true</param-value>
  </init-param>
</filter>
<filter-mapping>
  <filter-name>CorsFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

adcionar ao `pentaho-solutions/system/pentaho.xml`

```xml
<cors-request-allowed>true</cors-request-allowed>
	<cors-requests-allowed-domains>127.0.0.1</cors-requests-allowed-domains> 
```

adicionar aos `settings.xml`  (CDA, CDF, CDF-DD):

```xml
	   <allow-cross-domain-resources>true</allow-cross-domain-resources> 
   <cross-domain-resources-whitelist>127.0.0.1</cross-domain-resources-whitelist>
```


> Podes alterar as origens e whitelists para serem mais específicas quanto a ips e portas permitidas pelo server por questões de segurança.


### Referencias 

[Doc Oficial Pentaho](https://help.pentaho.com/Documentation/8.2/Products/CTools/CDE_Advanced_Solutions#section_15)

[Doc Tomcat Cors](https://tomcat.apache.org/tomcat-8.5-doc/config/filter.html)

