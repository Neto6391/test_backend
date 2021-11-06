## Descricao

Respositorio responsavel para o teste de backend da empresa [WEEDO it](http://weedo.it/)

Objetivo:

- Os usuários devem fazer login para ter acesso ao sistema;
- Deve existir um endpoint para que novos usuários se cadastrem;
- Não deve ser possível cadastrar o mesmo login mais de uma vez;
- Qualquer usuário pode criar um projeto, mas apenas o usuário que criou pode alterar/excluir;
- Não deverá ser possivel acessar um documento de um projeto excluido;
- O criador do projeto poderá convidar outros usuários para um projeto;
- Ao convidar um usuário para um projeto, deve ser informado o nivel de acesso aos documentos (leitura, escrita);
- Usuários convidados com acesso de escrita podem criar/editar/excluir  documentos dentro de um projeto;
- Usuários convidados leitura so podem visualizar os documentos do projeto;
- Todas as exclusões devem ser feitas com softdelete.

## Instalacao

```bash
# navegar ao projeto e instalar dependencias
$ yarn install

# Requer docker instalado(criar container do banco de dados MySQL)
docker run -p 3306:3306 --name mysql-db -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=test_backend -d mysql:8.0

# verificar se as variaveis de ambiente estao preenchidas corretamente

# cadastrar tabelas no banco de dados de acordo com o schema prisma
npx prisma migrate dev
```

## Rodando a API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
