# Pet Link Shrine

Santuário do elo de Pets

## Objetivo

Criar um sistema que gerencie adoções e resgates de animais domésticos, pretendentes à adoções, voluntários, estoque e doadores

## Descrição do problema

O Centro de Recolhimento e Adoção de Animais Domésticos, mantido pela
prefeitura, tem como objetivo acolher, tratar e promover a adoção
responsável de animais abandonados. Para gerenciar suas atividades, o
centro necessita de um sistema que registre todas as informações
relacionadas ao seu funcionamento. O sistema deve manter um cadastro
de todos os animais que chegam ao local, incluindo informações como
espécie (por exemplo, cão ou gato), raça, idade estimada, sexo,
características físicas (como porte e cor), e o status de adoção
(disponível, adotado ou indisponível). É fundamental registrar as datas de
chegada e saída do animal, assim como o histórico de tratamentos
realizados, incluindo medicações administradas. Além disso, o sistema
deve gerenciar os voluntários que trabalham no centro, cadastrando
informações como nome, contato e função desempenhada, que pode
variar entre atuar em missões de resgate nas ruas ou prestar assistência
dentro do centro. Esses voluntários também possuem escalas de trabalho
que precisam ser organizadas e registradas. Outro grupo essencial para o
funcionamento do centro são os pretendentes à adoção, que devem ser
cadastrados com informações pessoais, como nome, contato e endereço.
Toda adoção realizada precisa ser registrada, indicando qual animal foi
adotado, a data em que isso ocorreu e o termo de responsabilidade
assinado pelo pretendente. O centro também depende de doações para
manter seu estoque de alimentos e medicamentos. Assim, o sistema deve
registrar os doadores, que podem ser indivíduos ou instituições, e
detalhar as doações recebidas, especificando

## Tecnologias Utilizadas

- Express (framework para API REST)
- SQLite (banco de dados relacional)
- Prismaa (ORM)
- Jest (para testes)

---

[Link para visualização do modelo entidade relacionamento](https://drive.google.com/file/d/1XzzgiO7trgbtjEJq4cqEU9-wR2k2MshB/view)

## Estrutura do projeto

```
├── prisma/                # Diretório do Prisma (ORM para banco de dados)
│   ├── migrations/        # Armazena arquivos de migração do banco de dados
│   ├── dev.db             # Banco de dados SQLite para ambiente de desenvolvimento
│   ├── dev.db-journal     # Arquivo de log do SQLite
│   └── schema.prisma      # Definição do esquema do banco de dados Prisma
├── src/                   # Diretório principal do código-fonte
│   ├── @types/            # Definições de tipos TypeScript
│   ├── controllers/       # Controladores responsáveis por lidar com requisições HTTP
│   ├── middlewares/       # Middlewares para interceptar e processar requisições/respostas
│   ├── repositories/      # Camada de acesso ao banco de dados (abstração sobre Prisma)
│   ├── router/            # Definição das rotas da aplicação
│   ├── services/          # Lógica de negócio e regras da aplicação
│   ├── utils/             # Funções utilitárias e auxiliares
│   ├── app.ts             # Configuração do Express
│   └── server.ts          # Arquivo de inicialização do servidor
└── tests/                 # Diretório de testes automatizados
    └── cenario_01.test.ts # Arquivo de teste: Cada cenario contém 4 testes de unidade
    └── [...]
    └── cenario_10.test.ts 
```

## Cenários de Testes para os principais Casos de Uso

1. Cadastro de Resgates
   - Cenário 1: Registro bem-sucedido de uma novo resgate
   - Cenário 2: Alterações, remoção e listagem dos resgates
2. Registro de Adoções
   - Cenário 3: Registro bem-sucedido de adoção, vinculando um animal disponível a um pretendente válido
   - Cenário 4: Alterações, remoção e listagem das adoções
3. Gerenciamento de Estoque
   - Cenário 5: Registro bem-sucedido de um novo item no estoque
   - Cenário 6: Alterações, remoção e listagem de itens no estoque
4. Registro de Tratamentos
   - Cenário 7: Registro bem-sucedido de um novo tratamento
   - Cenário 8: Alterações, remoção e listagem de tratamentos
5. Controle do fluxo de trabalho dos voluntários
   - Cenário 9: Registro bem-sucedido de escala e ponto de trabalho
   - Cenário 10: Listagem de entrada e saída por volntário

## Definição de Casos de Teste

Cenário 1: Registro bem-sucedido de uma novo resgate

| ID | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-01 | Registrar um novo Resgate | Enviar requisição POST para `/resgate` com dados válidos | `{ "data_hora": "2024-02-17T18:25:43.511Z", "local": "Centro CG", "descricao": "",  "animais": [{"nome": "Tom","especie": "Gato","raca": "Vira-lata","genero": "Macho","idade_estimada": 3},{"nome": "Frajola","especie": "Gato","raca": "Vira-lata","genero": "Macho","idade_estimada": 2},{"nome": "Brutus","especie": "Cão","raca": "Vira-lata","genero": "Macho","idade_estimada": 4}]}` | Resposta 201 Created e o ID do resgate |
| CT-02 | Verificar se o resgate foi salvo no banco  | Consultar banco após o cadastro | ID do resgate retornado na requisicao anterior | Resgate encontrado no banco |
| CT-03 | Retornar erro ao cadastrar um resgate sem local | Enviar requisição POST sem o campo local | Mesma requisicao acima com exceção do local | Resposta 400 Bad Request com mensagem de erro |
| CT-04 | Retornar erro ao enviar animal com idade negativa | Enviar requisicao POST com idade negativa | Mesma requisicao porém com um animal com idade negativa | 400 Bad Request com mensagem |

Cenário 2: Alterações, remoção e listagem dos resgates

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-05 | Alterar um resgate | Enviar requisicao PATCH para /resgates com o ID e os campos alterados | objeto json | resposta 201 Created e o ID do resgate |
| CT-06 | Remover um resgate | Enviar requisicao DELETE para /resgates com o ID do resgate | objeto json | Resposta 204 No Content |
| CT-07 | Alterar um resgate sem um id válido |  Enviar requisicao PATCH para /resgates com ID inválido | objeto json | Resposta 400 Bad Request |
| CT-08 | Listar todos os resgates | Enviar requisicao GET para /resgates | sem dados de entrada | Array com os resgates e resposta 200 Ok |

Cenário 3: Registro Bem-Sucedido de Adoção, Vinculando um Animal Disponível a um Pretendente Válido

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-09 | Registrar uma adoção | Enviar requisição POST para `/adocao` com os campos obrigatórios | `{ "animalId": "123", "pretendenteId": "456", "dataAdocao": "2024-02-17" }` | Resposta 201 Created e ID da adoção |
| CT-10 | Verificar se a adoção foi salva no banco | Consultar banco após o cadastro | ID da adoção retornado na requisição anterior | Adoção encontrada no banco |
| CT-11 | Retornar erro ao cadastrar uma adocao sem um pretendente válido | POST para /adocao com id inválido | `{ "animalId": "123", "pretendenteId": "", "dataAdocao": "2024-02-17" }` | Resposta 400 Bad Request |
| CT-12 |  Retornar erro ao cadastrar uma adocao sem um animal válido | POST para /adocao com id inválido | `{ "animalId": "", "pretendenteId": "456", "dataAdocao": "2024-02-17" }` | Resposta 400 Bad Request |

Cenário 4: Alterações, Remoção e Listagem das Adoções

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-13 | Alterar uma adoção | Enviar requisição PATCH para `/adocao/:id` com dados atualizados | `{ "dataAdocao": "2024-02-18" }` | Resposta 200 OK |
| CT-14 | Remover uma adoção | Enviar requisição DELETE para `/adocao/:id` | `{ "id": "789" }` | Resposta 204 No Content |
| CT-15 | Listar todas as adoções | Enviar requisição GET para `/adocao` | Sem dados de entrada | Array de adoções e resposta 200 OK |
| CT-16 | Retornar erro ao alterar uma adocao inválida | Enviar requisição PATCH para `/adocao/:id` com id inválido | `{ "dataAdocao": "2024-02-18" }` | Resposta 400 Bad Request |

Cenário 5: Registro Bem-Sucedido de um Novo Item no Estoque

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-17 | Registrar um novo item no estoque | Enviar requisição POST para `/estoque` | `{ "doadorId": "453", "nome": "Ração", "quantidade": 10, "tipo": "Alimento" }` | Resposta 201 Created e ID do item |
| CT-18 | Verificar se o item foi salvo no banco | Consultar banco | ID do item | Item encontrado no estoque |
| CT-19 | Retornar erro ao cadastrar um item sem informar o tipo | POST para /estoque | `{ "doadorId": "453","nome": "Ração", "quantidade": 10, "tipo": "" }` | Resposta 400 Bad Request |
| CT-20 | Retornar erro ao cadastrar item sem doador valido | POST para /estoque | `{ "doadorId": "","nome": "Ração", "quantidade": 10, "tipo": "Alimento" }` | Resposta 400 Bad Request |

Cenário 6: Alterações, Remoção e Listagem de Itens no Estoque

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-21 | Alterar um item no estoque | Enviar requisição PATCH para `/estoque/:id` | `{ "quantidade": 20 }` | Resposta 200 OK |
| CT-22 | Remover um item do estoque | Enviar requisição DELETE para `/estoque/:id` | `{ "id": "111" }` | Resposta 204 No Content |
| CT-23 | Listar todos os itens do estoque | Enviar requisição GET para `/estoque` | Sem dados de entrada | Array de itens e resposta 200 OK |
| CT-24 | Retornar erro ao alterar um item id invalido | Enviar requisição PATCH para `/estoque/:id` | `{ "quantidade": 20 }` | Resposta 400 Bad Request |

Cenário 7: Registro Bem-Sucedido de um Novo Tratamento

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-25 | Registrar um novo tratamento | Enviar requisição POST para `/tratamentos` | `{ "animalId": "123", "medicamento": "Antibiótico", "data": "2024-02-18" }` | Resposta 201 Created e ID do tratamento |
| CT-26 | Verificar se o tratamento foi salvo no banco | Consultar banco | ID | Tratamento | 
| CT-27 | Retornar erro ao cadastrar tratamento sem informar data | `{ "voluntarioId":"231", "animalId": "123", "medicamento": "Antibiótico" }` | 400 Bad Request
| CT-28 | Retornar erro ao cadastrar tratamento com id de animal invalido | `{ "voluntarioId":"231", "animalId": "", "medicamento": "Antibiótico", "data": "2024-02-18" }` | 400 Bad Request | 

Cenário 8: Alterações, Remoção e Listagem de Tratamentos

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-29 | Alterar um tratamento | Enviar requisição PATCH para `/tratamentos/:id` | `{ "medicamento": "Anti-inflamatório" }` | Resposta 200 OK |
| CT-30 | Remover um tratamento | Enviar requisição DELETE para `/tratamentos/:id` | `{ "id": "222" }` | Resposta 204 No Content |
| CT-31 | Listar todos os tratamentos | Enviar requisição GET para `/tratamentos` | Sem dados de entrada | Array de tratamentos e resposta 200 OK |
| CT-32 | Retornar erro ao alterar tratamento com ID inválido | Enviar requisição PATCH para `/tratamentos/:id` com ID inexistente | `{ "medicamento": "Anti-inflamatório" }` | Resposta 400 Bad Request |

## Cenário 9: Registro Bem-Sucedido de Escala e Ponto de Trabalho

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-33 | Registrar uma escala de voluntário | Enviar requisição POST para `/voluntarios/escala` | `{ "voluntarioId": "101", "data": "2024-02-18", "turno": "Manhã" }` | Resposta 201 Created e ID da escala |
| CT-34 | Registrar um ponto de entrada de voluntário | Enviar requisição POST para `/voluntarios/ponto` | `{ "voluntarioId": "101", "tipo": "entrada", "dataHora": "2024-02-18T08:00:00Z" }` | Resposta 201 Created e ID do ponto |
| CT-35 | Registrar um ponto de saída de voluntário | Enviar requisição POST para `/voluntarios/ponto` | `{ "voluntarioId": "101", "tipo": "saida", "dataHora": "2024-02-18T12:00:00Z" }` | Resposta 201 Created e ID do ponto |
| CT-36 | Tentar registrar um ponto de saída sem ter um ponto de entrada | Enviar requisição POST para `/voluntarios/ponto` | `{ "voluntarioId": "102", "tipo": "saida", "dataHora": "2024-02-18T12:00:00Z" }` | Resposta 400 Bad Request |

## Cenário 10: Listagem de Entrada e Saída por Voluntário

| ID    | Descrição | Passos | Dados de Entrada | Resultado esperado |
| --- | --- | --- | --- | --- |
| CT-37 | Listar entradas e saídas de um voluntário | Enviar requisição GET para `/voluntarios/horarios/:id` | `{ "voluntarioId": "101" }` | Array com os horários e resposta 200 OK |
| CT-38 | Listar apenas entradas de um voluntário | Enviar requisição GET para `/voluntarios/horarios/:id?tipo=entrada` | `{ "voluntarioId": "101" }` | Array apenas com horários de entrada e resposta 200 OK |
| CT-39 | Listar apenas saídas de um voluntário | Enviar requisição GET para `/voluntarios/horarios/:id?tipo=saida` | `{ "voluntarioId": "101" }` | Array apenas com horários de saída e resposta 200 OK |
| CT-40 | Tentar listar horários de um voluntário inexistente | Enviar requisição GET para `/voluntarios/horarios/:id` | `{ "voluntarioId": "999" }` | Resposta 404 Not Found |


## Como rodar o projeto

Requisitos:

- node.js (compilar typescript)
- npm (gerenciador de pacotes)

### Comandos

Instalação de dependencias

```
npm install
```

Criar o banco localmente

```
npx prisma migrate dev --name init
```

Rodar "workbench" do banco

```
npx prisma studio
```

Rodar o server (em modo dev)

```
npm run dev
```

Rodar testes (ainda não implementado)

```
jest tests
```
