# Relatório Técnico: Comandos Principais e Justificativa de Uso

Este documento detalha os comandos significativos de cada pipeline do GitHub Actions e a razão técnica de sua aplicação no projeto.

---

### `01-manual.yaml`

* **Comandos Principais:** `npm install -g yarn && yarn install && npx mocha test/servicoPagamento.test.js --reporter mochawesome...`
* **Por que é utilizado:** Instala as dependências de forma limpa via Yarn e isola a execução no arquivo específico de produção (`servicoPagamento.test.js`), garantindo que o relatório visual do Mochawesome seja gerado sob demanda diretamente por comandos explícitos do terminal.

### `02-agendada.yaml`

* **Comandos Principais:** `npm install -g yarn && yarn install && yarn test`
* **Por que é utilizado:** Automação de baixo custo para checagem de saúde na madrugada (*health check*), que roda o atalho global `yarn test` para revalidar se nenhuma alteração paralela quebrou a suíte principal enquanto a equipe estava ausente.

### `03-post-deploy.yaml`

* **Comandos Principais:** `npm install -g yarn && yarn install && yarn test`
* **Por que é utilizado:** Funciona como um teste de fumaça (*smoke test*) acionado por eventos de outras pipelines, garantindo que o código implantado permaneça estável e íntegro no ambiente sem a necessidade de intervenção humana ou cliques manuais.

### `04-integrated.yaml`

* **Comandos Principais:** `yarn run lint` (com `continue-on-error: true`), `yarn run test:unit` e `echo` de deploy.
* **Por que é utilizado:** Implementa o conceito de esteira robusta de CI/CD (DevOps), onde o código passa pela triagem estática do Linter sem travamentos catastróficos por estética, valida os testes unitários isolados e autoriza a simulação de entrega contínua.