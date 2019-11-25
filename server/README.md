# Avalie Desempenho API

## Ambiente

- NodeJS 12.13.1
- Postgres

## Como executar o projeto?

1. No terminal acesse o diretório do projeto e execute o comando abaixo para instalar todas dependências **_(Os comandos aqui serão dados utilizando yarn, porém nada impede de usar o próprio npm)_**:

   ```
   yarn install
   ```

2. Crie o arquivo .env, seguindo o modelo apresentado em .env.example, alterando principalmente as credenciais para acesso ao banco de dados.

3. No Postgres crie uma database com o nome configurado em **DB_NAME**, o padrão é `avaliedesempenho`.

4) Com a certeza que o banco de dados está configurado e acessível, execute o comando abaixo para gerar as tabelas e relacionamentos necessários:

   ```
   yarn sequelize db:migrate
   ```

5. Com as tabelas geradas, crie o usuário administrador executando:

   ```
   yarn sequelize db:seed:all
   ```

   O administrador é acessado utilizando o e-mail `_admin@admin.com_` e senha `_teste123_`

6. Todos passos anteriores são necessários apenas na primeira execução do projeto, após executá-los será necessário apenas rodar o comando abaixo no terminal sempre que desejar executar o servidor no modo de desenvolvimento, disponibilizando os serviços na url `http://localhost:3333`:

   ```
   yarn dev
   ```

## Testes

Todos os testes do projeto se encontram no diretório `__tests__`, para executá-los utilize o comando abaixo:

```
yarn test
```

Após a execução os resultados serão exibidos no terminal. Com a execução o diretório `__tests__/coverage/lcov-report` será criado, contendo uma página html (**_index.html_**), que pode ser utilizada para visualizar quais trechos do código-fonte foram executados durantes os testes, ou seja, visualizar o code coverage dos testes.
