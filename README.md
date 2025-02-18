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
    └── exemple.test.ts    # Arquivo de exemplo de teste unitário
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

| ID    | Descrição                                         | Passos                                                   | Dados de Entrada                                                                                                                                                                                                                                                                                                                                                                             | Resultado esperado                            |
| ----- | ------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| CT-01 | Registrar um novo Resgate                         | Enviar requisição POST para `/resgate` com dados válidos | `{ "data_hora": "2024-02-17T18:25:43.511Z", "local": "Centro CG", "descricao": "",  "animais": [{"nome": "Tom","especie": "Gato","raca": "Vira-lata","genero": "Macho","idade_estimada": 3},{"nome": "Frajola","especie": "Gato","raca": "Vira-lata","genero": "Macho","idade_estimada": 2},{"nome": "Brutus","especie": "Cão","raca": "Vira-lata","genero": "Macho","idade_estimada": 4}]}` | Resposta 201 Created e o ID do resgate        |
| CT-02 | Verificar se o resgate foi salvo no banco         | Consultar banco após o cadastro                          | ID do resgate retornado na requisicao anterior                                                                                                                                                                                                                                                                                                                                               | Resgate encontrado no banco                   |
| CT-03 | Retornar erro ao cadastrar um resgate sem local   | Enviar requisição POST sem o campo local                 | Mesma requisicao acima com exceção do local                                                                                                                                                                                                                                                                                                                                                  | Resposta 400 Bad Request com mensagem de erro |
| CT-04 | Retornar erro ao enviar animal com idade negativa | Enviar requisicao POST com idade negativa                | Mesma requisicao porém com um animal com idade negativa                                                                                                                                                                                                                                                                                                                                      | 400 Bad Request com mensagem                  |

Cenário 2: Tentativa de cadastro com campos obrigatórios ausentes

| CT-01 |

Cenário 2: Tentativa de cadastro com campos obrigatórios ausentes
Cenário 3: Registro bem-sucedido de adoção, vinculando um animal disponível a um pretendente válido
Cenário 4: Tentativa de adoção de um animal já adotado
Cenário 5: Registro bem-sucedido de uma nova doação de ração
Cenário 6: Tentativa de registrar consumo de um item não disponível no estoque
Cadastro de Resgates
Cenário 7: Registro bem-sucedido de um novo resgate
Cenário 8: Tentativa de cadastrar um resgate sem fornecer a localidade
Controle do fluxo de trabalho dos voluntários
Cenário 9: Registro bem-sucedido de escala e ponto de trabalho
Cenário 10: Tentativa de registrar um ponto de entrada futuro ao um pont ode saída

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
