import Link from "next/link"

export const Header = () => {
    return(
        <div className="bg-blue-400 display: flex justify-around items-center border-2 rounded-2xl m-2">
            <h2 className="text-white text-2xl underline"
                    style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                    }}>Mensajes FCA</h2>
            <ul className="display: flex justify-around gap-3">
                <Link className="text-white text-2xl"
                    style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                    }}  href="/">Chats </Link>
                {/* <Link  >perfil</Link> */}
                {/* <a href="@/app/components/loading">carga</a> */}
            </ul>
        </div>
        
    )
}