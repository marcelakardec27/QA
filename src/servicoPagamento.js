// Adicione "export default" antes da classe
export default class ServicoDePagamento {
  constructor() {
    this.pagamentos = [];
  }

  pagar(codigoBarras, empresa, valor) {
    const categoria = valor > 100.00 ? 'cara' : 'padrão';
    
    const novoPagamento = {
      codigoBarras,
      empresa,
      valor,
      categoria
    };

    this.pagamentos.push(novoPagamento);
  }

  consultarUltimoPagamento() {
    if (this.pagamentos.length === 0) {
      return null;
    }
    return this.pagamentos[this.pagamentos.length - 1];
  }
}