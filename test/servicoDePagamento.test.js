import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Classe de Servico de Pagamento', () => {
    it('Validar retorno null ao consultar o último pagamento sem nenhum registro', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const resultadoEsperado = null;

        //Act
        const ultimo = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.strictEqual(ultimo, resultadoEsperado);
    });

    it('Validar que o pagamento é adicionada na lista de pagamentos', function() {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const codigoBarras = '0987-7656-3475';
        const empresa = 'Samar';
        const preco = 156.87;

        //Act
        servicoDePagamento.pagar(codigoBarras, empresa, preco);
        const pagamentos = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamentos.codigoBarras, codigoBarras);
        assert.equal(pagamentos.empresa, empresa);
        assert.equal(pagamentos.valor, preco);
    }); 

    it('Validar que o pagamento é classificado como "cara" com base no valor', function() {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const codigoBarras = '1234-5678-9012';
        const empresa = 'Empresa A';
        const preco = 150.00;
        const categoria = 'cara';

        //Act
        servicoDePagamento.pagar(codigoBarras, empresa, preco);
        const pagamentoCaro = servicoDePagamento.consultarUltimoPagamento();
       
        //Assert
        assert.equal(pagamentoCaro.categoria, categoria);
    });

    it('Validar que o pagamento é classificado como "padrão" com base no valor', function() {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const codigoBarras = '9876-5432-1098';
        const empresa = 'Empresa B';
        const preco = 50.00;
        const categoria = 'padrão';

        //Act
        servicoDePagamento.pagar(codigoBarras, empresa, preco);
        const pagamentoBarato = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.equal(pagamentoBarato.categoria, categoria);
    });

    it('Validar que o pagamento é classificado como "padrão" com o valor limite de 100.00', function() {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const codigoBarras = '1111-2222-3333';
        const empresa = 'Empresa C';
        const preco = 100.00;
        const categoria = 'padrão';

        //Act
        servicoDePagamento.pagar(codigoBarras, empresa, preco);
        const pagamentoLimite = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.equal(pagamentoLimite.categoria, categoria);
        assert.equal(pagamentoLimite.valor, preco);
    });

    it('Validar que apenas o último pagamento é retornado quando há múltiplos pagamentos', function() {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const primeiroCodigoBarras = '1234-1234-1234';
        const segundoCodigoBarras = '5678-5678-5678';
        const terceiroCodigoBarras = '9999-9999-9999';

        //Act
        servicoDePagamento.pagar(primeiroCodigoBarras, 'Empresa 1', 50.00);
        servicoDePagamento.pagar(segundoCodigoBarras, 'Empresa 2', 150.00);
        servicoDePagamento.pagar(terceiroCodigoBarras, 'Empresa 3', 75.00);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.equal(ultimoPagamento.codigoBarras, terceiroCodigoBarras);
        assert.equal(ultimoPagamento.empresa, 'Empresa 3');
        assert.equal(ultimoPagamento.valor, 75.00);
        assert.equal(ultimoPagamento.categoria, 'padrão');
    });
});