import Image from "next/image";
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-[80vh] items-center justify-center gap-4" style={{
            background: "linear-gradient(180deg, #004D61 0%, #FFFFFF 100%)"
        }}>

            <h1 className="text-2xl font-bold line-1.2 text-gray-800">Ops, não encontramos a página</h1>
            
            <div className="flex flex-col items-center justify-center">
                <p>E olha que exploramos o universo procurando por ela!</p>
                <p>Que tal voltar e tentar novamente?</p>
            </div>

            <Link href="/"
                className="inline-flex items-center justify-center font-medium transition-colors bg-custom-red text-white hover:bg-custom-red-500 focus-visible:ring-custom-red h-12 w-45 rounded-lg px-4 py-2.5 text-sm">
                Voltar ao início
            </Link>


            <Image src="/illustrations/Ilustra404.svg" alt="Ilustração 404" className="w-80 h-auto" width={470} height={354} />
        </div>
    )
}