import assert from 'assert';
import ServicoDePagamento from '../src/servicoPagamento.js';  // Ajuste o caminho se necessário e inclua a extensão .js


describe('Testes de Cobertura Total - Classe ServicoDePagamento', () => {
  let servico;

  // Executa antes de cada teste para garantir um estado limpo
  beforeEach(() => {
    servico = new ServicoDePagamento();
  });

  // 1. Testa o ramo 'if (this.pagamentos.length === 0)' do método consultarUltimoPagamento
  it('Deve retornar null quando a lista de pagamentos estiver vazia', () => {
    assert.strictEqual(servico.consultarUltimoPagamento(), null);
  });

  // 2. Testa o ramo 'padrão' do operador ternário com valor menor que 100.00
  it('Deve categorizar como "padrão" quando o valor for menor que 100.00', () => {
    servico.pagar('1234-5678', 'Empresa Alfa', 99.99);
    const ultimo = servico.consultarUltimoPagamento();

    assert.strictEqual(ultimo.codigoBarras, '1234-5678');
    assert.strictEqual(ultimo.empresa, 'Empresa Alfa');
    assert.strictEqual(ultimo.valor, 99.99);
    assert.strictEqual(ultimo.categoria, 'padrão');
  });

  // 3. Testa o valor exatamente em 100.00 (fronteira da condição valor > 100.00)
  it('Deve categorizar como "padrão" quando o valor for exatamente 100.00', () => {
    servico.pagar('4321-8765', 'Empresa Beta', 100.00);
    const ultimo = servico.consultarUltimoPagamento();

    assert.strictEqual(ultimo.categoria, 'padrão');
  });

  // 4. Testa o ramo 'cara' do operador ternário com valor maior que 100.00
  it('Deve categorizar como "cara" quando o valor for maior que 100.00', () => {
    servico.pagar('1111-2222', 'Empresa Gamma', 100.01);
    const ultimo = servico.consultarUltimoPagamento();

    assert.strictEqual(ultimo.categoria, 'cara');
  });

  // 5. Testa a lógica do índice [this.pagamentos.length - 1] para múltiplos pagamentos
  it('Deve retornar estritamente o último pagamento inserido, ignorando os anteriores', () => {
    servico.pagar('1111-1111', 'Primeira Empresa', 50.00);
    servico.pagar('2222-2222', 'Segunda Empresa', 250.00);
    servico.pagar('3333-3333', 'Última Empresa', 120.00);
    
    const ultimo = servico.consultarUltimoPagamento();

    // Garante que o retorno é o terceiro pagamento e não os anteriores
    assert.strictEqual(ultimo.codigoBarras, '3333-3333');
    assert.strictEqual(ultimo.empresa, 'Última Empresa');
    assert.strictEqual(ultimo.valor, 120.00);
    assert.strictEqual(ultimo.categoria, 'cara');
  });
});