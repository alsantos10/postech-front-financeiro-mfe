export default function AboutContent() {
    return (
        <section className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-4 py-8 dark:bg-zinc-900 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6">Sobre a Bytebank</h1>

            <p className="mb-4">
                A Bytebank é uma empresa fictícia criada para demonstrar um sistema de
                controle de transações financeiras. Nosso objetivo é oferecer uma
                plataforma simples e segura para que usuários possam acompanhar suas
                movimentações de forma clara e organizada.
            </p>

            <p className="mb-4">
                Fundada com a missão de unir tecnologia e gestão financeira, a Bytebank
                busca proporcionar uma experiência prática e confiável para quem deseja
                ter controle total sobre suas finanças pessoais ou corporativas.
            </p>

            <p className="mb-4">
                O sistema permite registrar entradas e saídas, gerar relatórios e
                acompanhar o fluxo financeiro em tempo real, sempre com foco em
                transparência e facilidade de uso.
            </p>

            <p>
                Nossa visão é ser referência em soluções digitais para controle
                financeiro, ajudando pessoas e empresas a tomarem decisões mais
                inteligentes e seguras.
            </p>
        </section>
    );
}