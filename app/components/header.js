import Link from "next/link"

export const Header = () => {
    return(
        <div className="bg-blue-400 flex flex-wrap justify-around items-center border-2 rounded-2xl m-2">
        {/* // flex flex-wrap justify-between items-center p-4 border-2 rounded-2xl m-2 */}
            <h2 className="text-white text-xl md:text-2xl underline"
                    style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                    }}>Mensajes FCA</h2>
            <ul className="flex flex-wrap justify-around gap-4">
                <Link className="text-white text-lg md:text-xl hover:translate-y-[-2px] transition-all duration-300"
                    style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 3)'
                    }}  href="/">Chats </Link>
                {/* <Link  >perfil</Link> */}
                {/* <a href="@/app/components/loading">carga</a> */}
            </ul>
        </div>
        
    )
}