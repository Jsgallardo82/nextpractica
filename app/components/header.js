import Link from "next/link"

export const Header = () => {
    return(
        <div className="bg-amber-500 display: flex justify-around">
            <h2 className="text-3xl font-bold underline text-blue-800">Mensajes FCA</h2>
            <ul className="display: flex justify-around gap-3">
                <Link href="/">Chats </Link>
                {/* <Link  >perfil</Link> */}
                {/* <a href="@/app/components/loading">carga</a> */}
            </ul>
        </div>
        
    )
}