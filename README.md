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
