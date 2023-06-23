title: Python Tricks
category: linux
date: 2023-06-13
------------------------------------

## Python tricks
Soluções práticas e truques para buchos do dia-a-dia ;)

### Requirements limpo

> Ao invés de ter um requirements poluido com as bibliotecas e suas dependencias, apenas registre as libs instaladas no arquivo.

```shell
pip freeze | grep -E 'lib-1|lib-2|lib-n'>> requirements.txt
```


