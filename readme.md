# Serviço de Pagamento

Projeto em Node.js que implementa uma classe para registrar pagamentos e retornar o último pagamento realizado.

## Visão geral

A classe `ServicoDePagamento` oferece:

- `pagar(codigoBarras, empresa, valor)` para registrar um pagamento;
- `consultarUltimoPagamento()` para retornar apenas o último pagamento registrado;
- armazenamento interno em uma lista de objetos JavaScript;
- categoria automática: `cara` quando o valor for maior que `100.00`, caso contrário `padrão`.

## Estrutura do projeto

- `src/servicoDePagamento.js` - implementação da classe de pagamento
- `test/servicoDePagamento.test.js` - testes usando Mocha e `node:assert`
- `package.json` - configuração do projeto e script de teste

## Instalação

1. Abra a pasta do projeto.
2. Execute:

```bash
npm install
```

> O projeto usa `type: "module"` no `package.json` para habilitar ES Modules.

## Uso

Exemplo de uso:

```javascript
import ServicoDePagamento from './src/servicoDePagamento.js';

const servicoDePagamento = new ServicoDePagamento();
servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
const ultimo = servicoDePagamento.consultarUltimoPagamento();
console.log(ultimo);
```

Saída esperada:

```json
{
  "codigoBarras": "0987-7656-3475",
  "empresa": "Samar",
  "valor": 156.87,
  "categoria": "cara"
}
```

## Testes

Execute os testes com:

```bash
npm test
```

O projeto usa Mocha com `node:assert` para validar o comportamento da classe.

## Observações

- `consultarUltimoPagamento()` retorna `null` quando não há pagamentos registrados.
- Para valores maiores que `100.00`, a categoria é `cara`.
- Para valores iguais ou menores que `100.00`, a categoria é `padrão`.
