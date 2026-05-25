export default class ServicoDePagamento {
    #pagamentos

    constructor() {
        this.pagamentos = [];
    }  

    //método para realizar pagamento
    pagar(codigoBarras, empresa, valor) {
        const categoria = valor > 100.00 ? 'cara' : 'padrão';

        const novoPagamento = {
            codigoBarras,
            empresa,
            valor,
            categoria
        };

        this.pagamentos.push(novoPagamento);    }

    //método para listar último pagamento
    listarUltimoPagamento() {

    }
}