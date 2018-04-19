# [BI-SERVER] - Configurar importação/exportação de arquivos (like .saiku etc)

Por padrão o Pentaho não importa/exporta arquivos de plugins que podem ser adicionados a ele para extender suas funcionalidades(Saiku, Pivot4J, BTable etc), mas contornar essa restrição é algo extremamente simples, nesse post vou exemplificar para arquivos do Saiku mas essa modificação pode ser feita para adicionar qualquer outra bastando modificar as extensões.
Basicamente precisaremos alterar dois arquivos : 

1. Edite o pentaho-solutions/system/importExport.xml procure as seguintes tags bean e adiocione os values com a extensão do arquivo desejado.

```xml 
. . . 
<bean id="DefaultExportHandler"
        class="org.pentaho.platform.plugin.services.importexport.DefaultExportHandler">
        <property name="repository" ref="unifiedRepository" />
        <property name="localeExportList">
                <list>
                        <value>.xanalyzer</value>
                        <value>.prpti</value>
                        . . . 
                        <value>.xcdf</value>
                        <value>.saiku</value>
                </list>
        </property>
</bean>
...
<bean id="DefaultExportHandler"
        class="org.pentaho.platform.plugin.services.importexport.DefaultExportHandler">
        <property name="repository" ref="unifiedRepository" />
        <property name="localeExportList">
                <list>
                        <value>.xanalyzer</value>
                        <value>.prpti</value>
                        . . .
                        <value>.saiku</value>
                </list>
        </property>
</bean>
. . .
```

2. Edite o pentaho-solutions/system/ImportHandlerMimeTypeDefinitions.xml e na tag MimeTypeDefinition de tipo texto adicione a extensão desejada.

```xml
. . . 
<MimeTypeDefinition mimeType="text/xml">
    <extension>cda</extension>
    <extension>cdfde</extension>
    . . . 
    <extension>saiku</extension>
</MimeTypeDefinition>
. . . 
```
