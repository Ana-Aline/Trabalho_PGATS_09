# Serviço de Pagamento - CI/CD Pipeline

[![CI Pipeline](https://github.com/Ana-Aline/Trabalho_PGATS_09/actions/workflows/principal.yml/badge.svg)](https://github.com/Ana-Aline/Trabalho_PGATS_09/actions)

Projeto acadêmico desenvolvido para a pós-graduação que implementa uma **pipeline de Integração Contínua (CI)** utilizando **GitHub Actions**, com testes automatizados, linting, análise de cobertura e relatórios de qualidade.

---

## 📋 Sobre o Projeto

A classe `ServicoDePagamento` oferece funcionalidades para registrar e consultar pagamentos:

- **`pagar(codigoBarras, empresa, valor)`** — Registra um novo pagamento com classificação automática
- **`consultarUltimoPagamento()`** — Retorna apenas o último pagamento registrado (ou `null` se vazio)
- **Armazenamento interno** — Lista privada de objetos JavaScript
- **Classificação automática** — `cara` (valor > 100.00) ou `padrão` (valor ≤ 100.00)

### Estrutura do Projeto

```
.github/workflows/     # Configurações da pipeline CI/CD
src/
  └── servicoDePagamento.js      # Implementação da classe
test/
  └── servicoDePagamento.test.js # Testes unitários
package.json           # Scripts e dependências
.eslintrc.json         # Configuração de linting
c8.json                # Configuração de cobertura
readme.md             # Este arquivo
```

---

## 🚀 Início Rápido

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Ana-Aline/Trabalho_PGATS_09.git
cd trabalho-final-ci

# Instale as dependências
npm install
```

> **Nota:** O projeto utiliza `"type": "module"` para habilitar ES Modules.

### Scripts Disponíveis

```bash
# Executar todos os testes
npm test

# Executar linting (validação de código)
npm run lint

# Corrigir automaticamente problemas de linting
npm run lint:fix

# Gerar relatório de cobertura de testes
npm run coverage

# Visualizar cobertura em HTML
npm run coverage:report
```

### Exemplo de Uso

```javascript
import ServicoDePagamento from './src/servicoDePagamento.js';

const pagamento = new ServicoDePagamento();
pagamento.pagar('0987-7656-3475', 'Samar', 156.87);

const ultimo = pagamento.consultarUltimoPagamento();
console.log(ultimo);
```

**Saída esperada:**
```json
{
  "codigoBarras": "0987-7656-3475",
  "empresa": "Samar",
  "valor": 156.87,
  "categoria": "cara"
}
```

---

## 🧪 Testes Unitários

O projeto implementa testes automatizados usando **Mocha** e **Node.js assert**:

### Cenários Cobertos

✅ Retorno de `null` quando não há pagamentos  
✅ Adição de pagamentos à lista  
✅ Classificação "cara" (valor > 100.00)  
✅ Classificação "padrão" (valor ≤ 100.00)  
✅ Classificação no limite exato (100.00)  
✅ Confirmação de que apenas o último pagamento é retornado em múltiplos registros  

### Executar Testes

```bash
npm test
```

Um relatório HTML será gerado em `./mochawesome-report/index.html`.

---

## 📊 Análise de Cobertura de Testes

O projeto utiliza **C8** para medir a cobertura de código:

```bash
npm run coverage
```

Métricas disponíveis:
- **Statements** — Percentual de linhas executadas
- **Branches** — Percentual de condições testadas
- **Functions** — Percentual de funções cobertas
- **Lines** — Percentual de linhas cobertas

Gerar relatório interativo:
```bash
npm run coverage:report
```

---

## 🔍 Linting e Qualidade de Código

O projeto utiliza **ESLint** para garantir padrões de código consistentes:

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

**Regras aplicadas:**
- Uso consistente de `const`/`let`
- Sem variáveis não utilizadas
- Sem funções não usadas
- Formatação consistente

---

## ⚙️ Pipeline de Integração Contínua (CI/CD)

A solução implementa um **Quality Gate robusto** que valida o código automaticamente em três gatilhos diferentes.

### 🎯 Gatilhos de Execução (Triggers)

| Gatilho | Descrição | Frequência |
|---------|-----------|-----------|
| **Push** | Executa em todo push para `main` | Imediato |
| **Schedule (Cron)** | Executa todos os domingos às 17:23 UTC | Semanal |
| **Manual** | Disparado pela interface do GitHub | Sob demanda |

#### Filosofia: Shift-Left Testing
- **Validação Imediata:** Cada push dispara a pipeline antes do merge (prevenindo regressões)
- **Testes Programados:** Execução semanal detecta problemas com dependências externas
- **Flexibilidade:** Disparo manual para testes ad-hoc

### 🏗️ Estrutura da Pipeline

```
┌─────────────────┐
│   GIT PUSH      │
│   / SCHEDULE    │
│   / WORKFLOW    │
│   DISPATCH      │
└────────┬────────┘
         │
         ▼
    ┌────────────────────────┐
    │  JOB: LINT             │
    │  - Validar código      │
    │  - ESLint check        │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │  JOB: UNITY (Testes)   │
    │  - npm install         │
    │  - npm run test        │
    │  - Mocha + coverage    │
    │  - Upload mochawesome  │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │  JOB: DEPLOY           │
    │  (Bloqueado se tests   │
    │   falharem)            │
    │  - Simulação: echo ..  │
    └────────────────────────┘
```

### 📝 Jobs Detalhados

#### Job 1: Lint (Validação)
- Instala ESLint
- Valida `src/` e `test/`
- Falha se houver problemas de qualidade

#### Job 2: Unity (Testes)
- Setup Node.js (latest)
- Instala dependências com npm
- Executa testes: `npm test`
- Gera relatório Mochawesome
- **Importante:** Usa `if: ${{ always() }}` para salvar relatório mesmo em falhas
- Upload do artefato `mochawesome-report` para análise

#### Job 3: Deploy
- Depende de todos os jobs anteriores (`needs: [lint, unity]`)
- **Bloqueio de Qualidade:** Jamais executa se testes falharem
- Atualmente em simulação (pronto para integrar com AWS, Vercel, etc)

### 📥 Acessando os Relatórios

1. Acesse **Actions** → **Continuous Testing Pipeline**
2. Selecione a execução desejada
3. Vá para **Artifacts** e baixe:
   - `mochawesome-report` (relatório de testes em HTML)
   - `coverage-report` (análise de cobertura)
4. Abra os arquivos HTML no navegador

### 🔑 Conceitos Chave

- **Quality Gate:** Barreira automática que impede código defeituoso na produção
- **Shift-Left:** Testes ocorrem no início do pipeline (antes de deploy)
- **Artefatos:** Evidências de execução armazenadas no GitHub
- **Análise de Root Cause:** Relatórios sempre gerados para investigação de falhas

---

## 📈 Requisitos Acadêmicos Atendidos

| Requisito | Status |
|-----------|--------|
| Trabalho individual | ✅ |
| Usar GitHub Actions | ✅ |
| Pipeline executando com sucesso | ✅ |
| Testes automatizados com sucesso | ✅ |
| Relatório armazenado na pipeline | ✅ |
| Aplicação correta de conceitos CI/CD | ✅ |
| Uso adequado de ferramentas | ✅ |
| Documentação completa | ✅ |

---

## 📚 Referências e Conceitos

- **CI/CD (Continuous Integration / Continuous Deployment)**: Prática de automatizar testes e deploys
- **Quality Gate**: Validações automáticas que bloqueiam código problemático
- **Shift-Left**: Mover testes para o início do ciclo de desenvolvimento
- **Mocha**: Framework de testes JavaScript
- **ESLint**: Ferramenta de análise estática para JavaScript
- **C8**: Ferramenta de cobertura de código baseada em V8

---

## 👤 Autor

![Ana Aline](https://avatars.githubusercontent.com/u/50156321?v=4&size=64)


## 📝 Notas Importantes

- `consultarUltimoPagamento()` retorna `null` quando não há registros
- Valores > 100.00 são classificados como "cara"
- Valores ≤ 100.00 são classificados como "padrão"
- Limite exato (100.00) é considerado "padrão"

# ⚙️ Continuous Testing & Deployment Pipeline

Esta documentação descreve a arquitetura da esteira de Integração Contínua (CI) e simulação de Entrega Contínua (CD) configurada no repositório via GitHub Actions.

A solução foi projetada como um *Quality Gate* robusto, garantindo que o código passe por validações unitárias rigorosas antes de seguir para os ambientes de implantação.

---

## 🎯 Gatilhos de Execução (Triggers)

A pipeline possui múltiplas estratégias de acionamento para cobrir diferentes necessidades do ciclo de desenvolvimento e garantia de qualidade:

* **Push (`push` na branch `main`):** Validação imediata (Shift-Left). Sempre que um novo código é integrado à branch principal, a pipeline roda automaticamente, prevenindo que regressões cheguem à produção.
* **Agendamento (`schedule`):** Configurado via *Cron* (`23 17 * * 0`), executa a esteira automaticamente todos os domingos às 17:23 UTC. Ideal para garantir que o projeto não sofra degradação silenciosa por mudanças de dependências externas ao longo da semana.
* **Sob Demanda (`workflow_dispatch`):** Permite o acionamento manual da pipeline diretamente pela interface do GitHub, útil para testes ad-hoc ou verificações após ajustes no ambiente.

---

## 🏗️ Estrutura de Trabalhos (Jobs)

A esteira é dividida em dois estágios sequenciais, promovendo a separação de responsabilidades (Testar $\rightarrow$ Entregar).

### 1. Job: `unity` (Validação e Qualidade)
Responsável por atestar a integridade do código-fonte.
* **Ambiente:** Executado em uma máquina virtual limpa `ubuntu-latest`.
* **Setup:** Provisiona a versão mais recente do Node.js e instala o gerenciador de pacotes Yarn.
* **Instalação e Execução:** Baixa as dependências do projeto e executa a suíte de testes unitários através do comando `yarn run test`.
* **Geração de Evidências:** Ao final, coleta o diretório `./mochawesome-report` e faz o upload como um artefato do GitHub. 
> **Nota de Arquitetura:** A cláusula `if: ${{ always() }}` garante que o relatório de testes será gerado e salvo **mesmo que os testes falhem**. Isso é vital para que a equipe possa analisar o relatório, identificar a falha e corrigir o código (análise de *Root Cause*).

### 2. Job: `deploy` (Implantação)
Representa o estágio de liberação do software.
* **Dependência Estrita:** Possui a regra `needs: [unity]`. Isso significa que o deploy **jamais** ocorrerá se o job de testes falhar, atuando como um bloqueio real contra código defeituoso.
* **Ação Atual:** Atualmente configurado como uma simulação (imprime *'Deploy sendo realizado...'* no log). Pronto para ser expandido com scripts de deploy reais (ex: AWS, Vercel, Docker, etc).

---

## 📥 Acessando os Relatórios de Qualidade

Como a pipeline abstrai a execução local, as evidências são exportadas para a nuvem:

1. Acesse a aba **Actions** no repositório.
2. Selecione a execução (Run) correspondente da *Continuous Testing Pipeline*.
3. Na seção inferior da tela, localize a área **Artifacts**.
4. Faça o download do pacote **`Unity test report`** e abra o arquivo HTML em seu navegador para visualizar as métricas detalhadas (sucessos, falhas e tempo de execução).