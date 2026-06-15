# APEX WEATHER
## Aplicativo Meteorológico com Tematização Dinâmica Neumórfica

Plataforma digital para monitoramento de condições meteorológicas globais desenvolvida com Angular 18+. A aplicação consome dados em tempo real da OpenWeatherMap API através de um pipeline reativo otimizado com operadores RxJS para controle de concorrência. O grande diferencial técnico reside na engenharia de interface, que aplica uma identidade visual baseada em Neumorfismo Inset reativo, alterando as variáveis de sombreamento e molduras físicas da página de acordo com as condições climáticas e o período do dia do local pesquisado.

---

### DEMONSTRAÇÃO VISUAL

![Interface do Simulador] Apex-Weather\assets\apex-weather.gif

---

### DESEMPENHO REAL
#### Indicadores de Auditoria Google Lighthouse

O aplicativo meteorológico passou pela auditoria oficial do Google Lighthouse, apresentando os seguintes resultados de desempenho e engenharia frontend:

*   **Melhores Práticas (100/100)**: Pontuação máxima em segurança de código, uso de APIs estáveis e conformidade com as diretrizes modernas do Angular.
*   **Acessibilidade (90/100)**: Zona de excelência. Rótulos bem definidos e prontos para leitores de tela na busca de cidades.
*   **SEO (90/100)**: Metadados estruturados e indexação otimizada para motores de busca.
*   **Performance (73/100 Desktop | 54/100 Mobile)**: Resposta rápida no carregamento inicial. A esteira RxJS com controle de debounce protege a cota de requisições e otimiza o processamento de dados ao digitar.

---

### ENGENHARIA DE SOFTWARE
#### Diferenciais Técnicos e Arquitetura

> O desenvolvimento do sistema meteorológico focou no controle estrito de requisições de rede, tratamento defensivo de falhas de serviços externos e sincronização entre barramentos de dados e propriedades de folhas de estilo nativas.

*   **Otimização de Requisições (Debounce Control)**
    O componente de buscas intercepta a digitação do usuário através do fluxo assíncrono `valueChanges`. Para blindar a infraestrutura e evitar o consumo desnecessário de cotas de API, o sistema implementa o operador `debounceTime(500)` combinado ao `distinctUntilChanged()`. Esta engenharia garante que o servidor externo seja acionado apenas meio segundo após a cessação completa da digitação, bloqueando também chamadas repetidas para um mesmo termo.

*   **Arquitetura de Tematização Dinâmica por Injeção de Classes**
    O sistema gerencia a atmosfera visual do aplicativo injetando classes de escopo diretamente na tag `<body>` do documento através do serviço `Renderer2` do Angular. Mutações nos Signals de dados acionam regras combinadas no SCSS global (como `.theme-noite.theme-rain` ou `.theme-hot`), alterando instantaneamente as variáveis nativas de cor e sombras do plano de fundo de forma automatizada.

*   **Isolamento de Contraste e Estabilidade Visual do Card**
    Para assegurar conformidade com as diretrizes de acessibilidade e legibilidade, o painel central de informações e a barra de busca utilizam variáveis de sombreamento neumórfico estáticas (`--card-bg`, `--card-shadow-dark`). Esta abordagem técnica fixa a cor marfim/cinza estável do núcleo, permitindo que as variações drásticas de clima ocorram exclusivamente nas extremidades da tela por meio de molduras quadradas profundas (`box-shadow: inset`).

*   **Tratamento Defensivo contra Erros de Provedores**
    O fluxo de inscrições HTTP incorpora mecanismos de restauração de estado. Caso o usuário insira termos inválidos (como nomes de países ou caracteres corrompidos), o interceptador de exceções captura o erro 404, limpa de forma automatizada as classes climáticas aplicadas ao body e redefine o Signal central para `null`, fazendo a interface retornar ao seu estado neutro inicial de forma segura.

---

### ESTRUTURA FUNCIONAL
#### Componentização e Responsabilidades

A interface foi projetada dividindo suas responsabilidades em estruturas autônomas de apresentação e consumo de dados:

*   **Home Component (Página Mãe)**: Unidade centralizadora responsável pela coordenação de ciclos de vida, processamento de injeção de classes no DOM e distribuição de dados via Angular Signals.
*   **Busca Cidade Component**: Widget de entrada estruturado em baixo relevo Neumórfico (Inset), responsável pela captura inteligente de digitações e validações básicas de extensão de strings.
*   **Card Clima Component**: Painel contábil meteorológico responsável por renderizar temperaturas arredondadas, sensações térmicas, umidade e os ícones vetoriais de correspondência da API.
*   **Weather Service**: Motor de integração de rede encarregado de injetar os parâmetros de internacionalização (`lang: pt_br`) e métricas em graus Celsius (`units: metric`), mapeando as respostas para as interfaces de contrato do sistema.

---

### TECNOLOGIAS E RECURSOS UTILIZADOS

*   **Angular 18+**: Standalone Components, injeção funcional por método `inject()` e gerenciamento de estados granulares por Angular Signals.
*   **TypeScript**: Modelagem estrita de payloads (`WeatherData`) e controle de propriedades booleanas para períodos diurnos e noturnos.
*   **RxJS Pipeline**: Operadores funcionais de filtragem e temporização contínuos (`debounceTime`, `distinctUntilChanged`, `filter` e `map`).
*   **SCSS Avançado**: Uso extensivo de propriedades estruturais de profundidade volumétrica (`box-shadow`), transições cinemáticas complexas (`transition: all 0.8s ease`) e linearizações flexíveis para dispositivos móveis.

---

### FLUXO INTERNO DE PROCESSAMENTO METEOROLÓGICO
#### Data Pipeline

A transformação de dados econômicos opera sequencialmente sob o seguinte pipeline:

1. Interceptação reativa da digitação com filtragem mínima de três caracteres no formulário.
2. Aguardo do tempo de segurança pelo operador `debounceTime` para estabilização de rede.
3. Despacho da requisição parametrizada contendo a chave de segurança criptográfica (API Key Variable).
4. Mapeamento e arredondamento matemático das variáveis de temperatura e checagem de sufixos de período (`endsWith('n')`).
5. Atualização do Signal central, alteração das classes de estilo do corpo da página e renderização instantânea do painel.

---

### COMO EXECUTAR O PROJETO

O projeto utiliza o ecossistema Angular CLI, exigindo o ambiente Node.js configurado localmente:

1. Clone o repositório utilizando o comando:
   ```bash
   git clone https://github.com
   ```
2. Realize o download de todas as dependências e módulos de desenvolvimento:
   ```bash
   npm install
   ```
3. Inicialize o processo de compilação local:
   ```bash
   ng serve
   ```
4. Abra o navegador no endereço local padrão fornecido pelo framework: `http://localhost:4200`
