title: SCD Tipo 2 no PDI
category: pentaho
date: 2018-07-12
------------------------------------

## Implementando SCD tipo 2 no Pentaho Data Integration

No ambiente analitico de DW uma das preocupações é com o versionamento da informação tornando favorável a tomada de decisão, existem extrategias para tal e a que abordarei nesse artigo é [SCD tipo 2](https://en.wikipedia.org/wiki/Slowly_changing_dimension#Type_2:_add_new_row) na qual teremos um registro adcionado para cada mudança na tabela de origem(não é a risca assim, mas, a frente detalharei melhor).

Nesse exemplo simularei o input de uma tabela de `Clientes` com a seguinte extrutura : 

| Campo | Tipo | Observação | 
| --- | :---: | ---: | 
| business_key | integer | Chave de negócio (ID) |
| name_customer | string | Nome do cliente |
| marital_status | string | Status Civil | 
| contact | string | Numero para contato |
| gender | string | Sexo |

Em seguida usarei o step [Get System Info](https://wiki.pentaho.com/display/EAI/Get+System+Info) para registrar na dimensão o horario em que foi atualizado o registro (isso é opcional mas é interessante em alguns casos para fins de auditoria e controle),

![imagem-step-get-system-info](http://link.com/image.jpg)

No PDI o step que tem a responsabilidade de fazer essa carga é o [Dimension Lookup/Update](https://wiki.pentaho.com/display/EAI/Dimension+Lookup-Update), basicamente para que funcione precisamos ter na dimensão que será implementada o SCD2 os seguintes campos criados : 

| Campo | Tipo | Observação | 
| --- | :---: | ---: | 
| Technical key | integer | Será a chave primária da dimensão | 
| Version field | integer | Corresponderá a versão do registro | 
| Start of date range | date | Início do range de datas | 
| End of date range | date | Fim do range de datas | 

Dito isso agora é definir para cada dimensão a estratégia de atualização e adaptar o step para atendê-la, nesse exemplo para análise de clientes é interessate que seja versionado o registro em caso de mudanças de Status Civil pois isso pode/vai alterar o perfil de consumo de um cliente, demais informações somente devem ser atualizados.

Segue ddl desse exemplo : 

```sql
CREATE TABLE "public".dim_customers
(
  tk BIGSERIAL
, version INTEGER
, date_from TIMESTAMP
, date_to TIMESTAMP
, busines_key INTEGER
, name_customer TEXT
, marital_status TEXT
, contact TEXT
, gender TEXT
, timestamp_of_load TIMESTAMP
)
``` 

Na aba `key` devemos definir a(s) chave(s) de negócio da tabela.

![img_config1]()

Na aba `fields` devemos definir os campos e qual estratégia será usada para cada um, update alterará o registro e insert irá inserir na dimensão uma nova versão do registro, seguindo o que definimos anteriormente para nosso exemplo o resultado será esse : 

![img_config2]()

O exemplo desse artigo pode ser encontrado aqui : 

[download-exemplo]()

### Referencias e Links Interessantes : 

[Conceitual Slowly Changing Dimension](https://canaltech.com.br/infra/O-que-significa-e-qual-a-importancia-do-SCD-no-Data-Warehouse/)

[Artigo Helical implementação PDI - en ](https://www.helicaltech.com/slowly-changing-dimension-in-pentaho-data-integrationkettle/)
