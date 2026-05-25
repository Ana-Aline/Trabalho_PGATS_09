import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Classe de Servico de Pagamento', () => {
    it('Validar retorno null ao consultar o último pagamento sem nenhum registro', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        //Act
        const ultimo = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.strictEqual(ultimo, null);
    });

    it('Validar que o pagamento é adicionada na lista de pagamentos', function() {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        //Act
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
        const pagamentos = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamentos.codigoBarras, '0987-7656-3475');
        assert.equal(pagamentos.empresa, 'Samar');
        assert.equal(pagamentos.valor, 156.87);
    }); 

    it('Validar que o pagamento é classificado como "cara" com base no valor', function() {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        //Act
        servicoDePagamento.pagar('1234-5678-9012', 'Empresa A', 150.00);
        const pagamentoCaro = servicoDePagamento.consultarUltimoPagamento();
       
        //Assert
        assert.equal(pagamentoCaro.categoria, 'cara');
    });

    it('Validar que o pagamento é classificado como "padrão" com base no valor', function() {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        //Act
        servicoDePagamento.pagar('9876-5432-1098', 'Empresa B', 50.00);
        const pagamentoBarato = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.equal(pagamentoBarato.categoria, 'padrão');
    });
});