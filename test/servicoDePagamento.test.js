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
});