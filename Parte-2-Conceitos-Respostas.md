# Respostas dos Conceitos Técnicos

## Diferenças entre REST e GraphQL
- A principal diferença entre os dois é como os endpoints são utilizados e como as respostas são obtidas.
- **REST:** Utiliza múltiplos endpoints para recursos específicos e retorna dados fixos definidos pelo servidor.
- **GraphQL:** Utiliza um único endpoint pois passa os argumentos diretamente na query, retornando dados flexíveis definidos por esses argumentos.

## O que é transação em Banco de Dados
- É uma unidade lógica de trabalho composta por uma ou mais operações no banco de dados que devem ser executadas em conjunto, garantindo que caso aconteça uma falha nas operações toda a transação seja revertida sem nenhuma mudança ser aplicada. Muito usadas em transações bancárias por exemplo.

## Diferença entre Autenticação e Autorização
- **Autenticação:** É o que verifica a identidade do usuário como por exemplo: Login e Senha, Biometria e Token.
- **Autorização:** É aquilo que o usuário tem acesso como por exemplo: Permissões e Níveis de acesso.

## Quando usar Cache e quando evitar
- **Quando usar:** É ideal para dados que raramente sofrem mudanças e que são lidos frequentemente ou que tenha um tempo de carregamento lento, ajudando a melhorar o desempenho, reduzindo impacto no banco de dados e no servidor. Exemplos de casos de uso de cache: Catálogos e Configs.
- **Quando evitar:** É ideal para dados de atualização em tempo real, voláteis ou para dados extremamente sensíveis que não podem ser salvos de forma temporária. Exemplos de casos onde evitar cache: Saldos bancários e Sessão de usuário.
