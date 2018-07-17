title: Sobrevivencia com MDX I
category: pentaho
date: 2018-07-17
------------------------------------

## Guia de Sobrevivencia MDX - Dicas e Truques I

> Para esse artigo estou a usar a base demo `Steel Whell Sales`que vem por padrao no Pentaho BA Server


### Navegando nas Hierarquias com MDX

1. ***Members***
Retorna os Membros de uma hierarquia ou level

```sql
WITH
SET [~ROWS] AS
{{[Markets].[Territory].Members}}
SELECT
NON EMPTY {[Measures].[Quantity]} ON COLUMNS,
NON EMPTY [~ROWS] ON ROWS
FROM [SteelWheelsSales]
```


2. ***Children***
Retorna os filhos partindo de um determinado level

```sql
WITH
SET [~ROWS] AS
{{[Markets].[Territory].Members},{[Markets].[Territory].&[APAC].Children}}
SELECT
NON EMPTY {[Measures].[Quantity]} ON COLUMNS,
NON EMPTY [~ROWS] ON ROWS
FROM [SteelWheelsSales]
```

3. ***Parent***
Retorna os pais partindo de um determinado Membro.

```sql
WITH
SET [~ROWS] AS
{{[Markets].[Country].[Australia].Parent}}
SELECT
NON EMPTY {[Measures].[Quantity]} ON COLUMNS,
NON EMPTY [~ROWS] ON ROWS
FROM [SteelWheelsSales]
```

4. ***Ascendants e Descendants***
Retornam a arvore hierarquica do(s) membro(s) superiores e inferiores respectivamente.

```sql
WITH
SET [~ROWS] AS
Descendants([Markets].[Country].&[Australia])
SET [~ROWS2] AS
Ascendants([Markets].[Country].&[Australia])
SELECT
NON EMPTY {[Measures].[Quantity]} ON COLUMNS,
NON EMPTY [~ROWS2] ON ROWS
FROM [SteelWheelsSales]
```

5. Lead and Lag -
Retorna os 'Irmãos' do Membro exibido a direita e a esquerda respectivamente, recebe o parametro da quantidade de membros que deseja 'pular'.

```sql
**/
WITH
SET [~ROWS] AS
{[Markets].[Country].[Australia].Lead(2),
[Markets].[Country].[Australia].Lag(-1)}
SELECT
NON EMPTY {[Measures].[Quantity]} ON COLUMNS,
NON EMPTY [~ROWS] ON ROWS
FROM [SteelWheelsSales]
/**
```

### Entendendo o Cross Join

Trata da função que é responsável pelo cruzamento entre dimensões e níveis diferentes. Pode ser usado de maneira aninhada(Função dentro de função)

```sql
WITH
SET [~ROWS] AS
Descendants([Markets].[Country].&[Australia])
SET [clientes] as
{[Customers].[Customer].Members}
SELECT
NON EMPTY crossjoin({[Measures].[Quantity]},{[clientes]}) ON rows,
NON EMPTY [~ROWS] ON columns
FROM [SteelWheelsSales]
```

> Usar com `NON EMPTY` para restringir os valores nulos dos cruzamentos

### Entendendo o Hierarchize

Exibe os membros da dimensão respeitando as regras pre-estabelecidas na ordem da Hierarquia(definidas quando criou seu cubo)

```sql
WITH
SET [~ROWS] AS
Hierarchize({[Time].[Months].Members})
SELECT
NON EMPTY {[Measures].[Sales]} ON COLUMNS,
NON EMPTY [~ROWS] ON ROWS
FROM [SteelWheelsSales]
```

### Ordenações em MDX

A função `ORDER` recebe o parametro de ASC ou DESC e BASC ou BDESC para quebrar a hiearquia.

```sql
ORDER (<SET>,<VARIAVEL/METRICA>,<TIPO ORDENACAO>)
```

```sql
WITH
SET [~ROWS] AS
Hierarchize({[Time].[Months].Members})
SELECT NON EMPTY
ORDER(
{[Time].[Months].Members},
[Measures].[Sales],
ASC
) ON ROWS,
NON EMPTY {[Markets].[Territory].&[APAC]} ON COLUMNS
FROM [SteelWheelsSales]
```

> Não é obrigatório usar um membro que está sendo exibido para definir a ordenação. basta passar a Medida que deseja exibir na cláusula `WHERE`.

### Usando Filtros

A função `FILTER` limita a exibição da consulta baseada em uma avaliação lógica.

```sql
FILTER (<SET>,<EXPRESSAO BOLEANA>)
```

```sql
SELECT NON EMPTY
FILTER(
({[Time].[Months].Members}),
[Measures].[Sales] >= 67000)
ON rows,
NON EMPTY {[Measures].[Sales]}ON columns
FROM [SteelWheelsSales]
where {[Markets].[Territory].&[APAC]}
```

>O Filter só pode ser usado quando há o indicador na coluna sem o uso de Cross Join (sem quebra, a coluna com o indicador deve ser única), caso deseje ver a seleção na exibição OLAP deves converter o set do Filter com o Cross Join



### Referências e Links Úteis

[Doc. Oficial M$](https://docs.microsoft.com/pt-br/sql/mdx/multidimensional-expressions-mdx-reference)
