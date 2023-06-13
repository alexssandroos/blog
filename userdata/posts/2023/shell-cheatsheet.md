title: Shell Cheatsheet
category: linux
date: 2023-06-13
------------------------------------

## Shell Cheatsheet
Soluções práticas para buchos do dia-a-dia ;)

### Uso de chaves para acesso a servidores sem necessidade de senha

Após gerar a chave com o ssh-keygen acesse o servidor registrando a chave gerada ao logar.

```shell
ssh-copy-id user@hostname
# caso queira especificar uma chave passe o parametro -i
ssh-copy-id -i path/para/chave.pub user@hostname
```

### Verificar portas e serviços em uso para debbug

```shell
#ipv4
lsof -Pnl +M -i4 
#ipv6
lsof -Pnl +M -i6
```
