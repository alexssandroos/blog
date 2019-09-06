title: Criando cards de Indicadores com Template Component
category: pentaho
date: 2019-09-06
------------------------------------

## Criando cards de Indicadores com Template Component

Quando os componentes já definidos no cde não atendem uma das alternativas é criar um template component. No Pentaho é possível usar o Mustache  ou Underscorejs para essa tarefa.  Nesse artigo será demonstrado como implementar um template com Mustache, simulando uma visão de indicadores para um painel, necessidade constante quando fazemos Dashboards gerenciais.

### Camada de Layout

1. Crie a estrutura Row>Column>Html e adicione o código abaixo:
```html
<div id="titulo"><h1>Templates component com Mustache</h1></div>
<div id="template" class="flex_mae"></div>
<div id="table"></div> 
```

![img](./userdata/images/template-component-mustache01.png)

2. css:

```css
.flex {
display: flex;
flex-direction: column;
justify-content: center;
width: 280px;
align-items: center;
margin: 15px 15px;
}
.flex_mae {
display: flex;
flex-wrap: wrap;
} 

.bg-green, .callout.callout-success, .alert-success, .label-success, .modal-success .modal-body {
background-color: #00a65a !important;
} 

.bg-red, .callout.callout-success, .alert-success, .label-success, .modal-success .modal-body {
background-color: #dd4b39 !important;
} 

.small-box {
border-radius: 2px;
position: relative;
display: block;
margin-bottom: 20px;
box-shadow: 0 1px 1px rgba(0,0,0,0.1);
}

.small-box>.inner {
padding: 10px;
}

.small-box h3, .small-box p {
z-index: 5;
}

.small-box p {
font-size: 15px;
}

.small-box h3 {
font-size: 38px;
font-weight: bold;
margin: 0 0 10px 0;
white-space: nowrap;
padding: 0;
}

.small-box .icon {
-webkit-transition: all .3s linear;
-o-transition: all .3s linear;
transition: all .3s linear;
position: absolute;
top: -10px;
right: 10px;
z-index: 0;
font-size: 90px;
color: rgba(0,0,0,0.15);
}

.small-box>.small-box-footer {
position: relative;
text-align: center;
padding: 3px 0;
color: #fff;
color: rgba(255,255,255,0.8);
display: block;
z-index: 10;
background: rgba(0,0,0,0.1);
text-decoration: none;
} 
```

### Camada de Datasources
Por questões didáticas estou usando uma consulta mdx ao cubo Quadrant Analysis

```sql
MDX
WITH
SET [~ROWS] AS
{[Region].[Region].Members}
SELECT
NON EMPTY {[Measures].[Actual], [Measures].[Budget], [Measures].[Variance]} ON COLUMNS,
NON EMPTY [~ROWS] ON ROWS
FROM [Quadrant Analysis]
```

![img](./userdata/images/template-component-mustache02.png)


Pra complementar vou criar duas colunas calculadas que servirão para tornar a mágica da exibição dinâmica que preciso mais simples.

```sql
=IF(INT(["Variance"])>0;"up";"down")

=IF(INT(["Variance"])>0;"green";"red")
```

![layout](./userdata/images/template-component-mustache03.png)


O resultado deve ser algo assim: 

![img](./userdata/images/template-component-mustache04.png)


### Camada de components

1. Na categoria Standard selecione o Template componente.
Ajustes : 

Datasource: 	NOMEDODATASOURCE
HtmlObject:	 template
Template Library:	Mustache

2. Adicione um formatador para os números : 
```javascript
function(v) { 
return v.toLocaleString('pt-BR'); 
}
```

3. Adicione a função que vai renderizar o componente

```javascript
function() {
var template = `
{{#items}} 
<div class="small-box bg-{{5}} flex">
<div class="inner">
<h3>{{1 | formatter : "numeric"}}</h3>
<p>{{0}}</p>
</div>
<div class="icon">
<i class="fa fa-arrow-circle-o-{{4}}"></i>
</div>
<a href="#" class="small-box-footer">Meta: {{2 | formatter : "numeric"}} / Variação: {{3 | formatter : "numeric"}} 
<i class="fa fa-arrow-circle-right"></i>
</a>
</div> 
{{/items}}

`
return template;
} 
```

Como resultado deves ter um painel de indicadores tal qual: 

![img](./userdata/images/template-component-mustache05.png)


Os fontes podem ser encontrados [aqui]().

> Um dica é olhar na samples do pentaho-server os exemplos implementados para tirar algumas duvidas de implementações.



#### Referências:

https://mustache.github.io/mustache.5.html
http://mfgaspar.github.io/2017/Template-Component-Part-1/
http://mfgaspar.github.io/2017/Template-Component-Part-2/
http://mfgaspar.github.io/2017/Template-Component-Part-3/
http://mfgaspar.github.io/2017/Template-Component-Part-4/
http://mfgaspar.github.io/2017/Template-Component-Part-5/
https://github.com/PacktPublishing/Learning-Pentaho-CTools/tree/master/Chapter6/Template%2BComponent

