# Guia Passo a Passo: `01-manual-exec.yaml`

O ficheiro está estruturado em três grandes blocos: **Metadados (Nome)**, **Gatilhos (Triggers)** e **Tarefas (Jobs)**. Abaixo está a explicação de cada linha do código.

### 1. Nome da Pipeline

```yaml
# CI de Nível 01 - Disparo Manual através de clique e Push na Master
name: 'N1 - Execução Manual'

```

* **O que faz:** Define o nome amigável que vai aparecer no menu lateral esquerdo do separador **Actions** no GitHub. Ajuda a identificar facilmente qual o propósito deste fluxo de automação.

### 2. Gatilhos / Regras de Disparo (`on:`)

```yaml
on:
  workflow_dispatch:
  push:
    branches:
      - master

```

* **`workflow_dispatch:`** Este comando (vazio) diz ao GitHub para criar um botão chamado **"Run workflow"** na interface web. Permite-lhe acionar os testes manualmente com um clique sempre que desejar.
* **`push:` / `branches: [master]`:** Define que, sempre que alguém fizer um envio de código (`git push`) ou aceitar um Pull Request direcionado à branch `master`, a pipeline será ativada automaticamente para validar se o novo código não partiu os testes.

### 3. O Ambiente de Execução (`jobs:`)

```yaml
jobs:
  mocha-tests:
    runs-on: ubuntu-latest

```

* **`mocha-tests:`** É o identificador técnico da tarefa. Pode dar-lhe o nome que quiser.
* **`runs-on: ubuntu-latest`:** Especifica que o GitHub deve abrir uma máquina virtual limpa com o sistema operativo Linux Ubuntu (na versão estável mais recente) para rodar o seu projeto.

### 4. Os Passos da Execução (`steps:`)

Os passos são executados de forma sequencial, de cima para baixo. Se um passo falhar, a pipeline para (a menos que seja configurada uma exceção).

#### Passo 4.1: Clonar o Código

```yaml
      - name: Checkout do código
        uses: actions/checkout@v4

```

* **O que faz:** Como a máquina virtual do GitHub começa totalmente vazia, este passo usa uma ação oficial do GitHub (`checkout`) para copiar todos os ficheiros do seu repositório para dentro dessa máquina virtual.

#### Passo 4.2: Instalar o Ambiente Node.js

```yaml
      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

```

* **O que faz:** Instala o ambiente do Node.js na máquina virtual. O parâmetro `node-version: 20.x` garante que a máquina use a versão estável 20 (LTS), prevenindo incompatibilidades com o seu código local.

#### Passo 4.3: Instalar o Gestor de Pacotes Yarn

```yaml
      - name: Instalando Yarn
        run: npm install -g yarn

```

* **O que faz:** Utiliza o `npm` (que já vem com o Node) para instalar o **Yarn** globalmente dentro da máquina virtual, permitindo o uso dos comandos `yarn` nos passos seguintes.

#### Passo 4.4: Instalar as Dependências do Projeto

```yaml
      - name: Instalando dependências
        run: yarn install

```

* **O que faz:** Lê o ficheiro `package.json` e o `yarn.lock` do seu projeto e descarrega todas as bibliotecas necessárias para os testes funcionarem (incluindo o Mocha e o Mochawesome).

#### Passo 4.5: Executar os Testes

```yaml
      - name: Executando testes com Mocha
        run: yarn test

```

* **O que faz:** Executa o comando de teste que configurámos. O `yarn test` vai olhar para o seu `package.json` e disparar o comando completo do Mocha com o gerador de relatórios configurado.

#### Passo 4.6: Recolher e Guardar o Relatório Visual

```yaml
      - name: Salvando relatórios de testes
        uses: actions/upload-artifact@v4
        if: ${{ always() }}
        with:
          path: ./mochawesome-report
          name: Relatório de Testes Mochawesome

```

* **`if: ${{ always() }}`:** Esta é a regra mais importante deste passo. Garante que, **mesmo que algum teste falhe** (o que normalmente faria a pipeline parar imediatamente), o GitHub vai saltar direto para este passo para recolher o relatório. Afinal, quer saber quais os testes que falharam.
* **`path: ./mochawesome-report`:** Indica ao GitHub em que pasta da máquina virtual está guardado o relatório gerado (HTML, CSS e imagens).
* **`name:`** Define o nome do ficheiro `.zip` que ficará disponível para download na interface do GitHub após a execução terminar.

