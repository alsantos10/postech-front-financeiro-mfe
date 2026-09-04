export default function ProductsContent() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center">Serviços da Bytebank</h1>

      <p className="mb-10 text-center text-lg text-gray-600">
        A Bytebank oferece um sistema completo para controle de transações financeiras,
        garantindo segurança e praticidade em cada operação.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-2 text-custom-green">Depósito</h2>
          <p className="text-gray-600">
            Registre depósitos de forma rápida e segura, mantendo o controle total
            sobre suas entradas financeiras.
          </p>
        </div>

        <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-2 text-custom-green">Transferência</h2>
          <p className="text-gray-600">
            Realize transferências entre contas com praticidade e transparência,
            garantindo rastreabilidade em cada operação.
          </p>
        </div>

        <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-2 text-custom-green">Investimento</h2>
          <p className="text-gray-600">
            Acompanhe seus investimentos e tenha relatórios claros sobre o desempenho
            do seu portfólio financeiro.
          </p>
        </div>

        <div className="rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-2 text-custom-green">Pagamento</h2>
          <p className="text-gray-600">
            Gerencie pagamentos com segurança, mantendo o histórico organizado e
            acessível sempre que precisar.
          </p>
        </div>
      </div>
    </main>
  );
}
