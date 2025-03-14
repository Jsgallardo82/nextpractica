
export const ContactList = ({setActiveUser}) => {
    return(
        <nav className="display: flex flex-col">
            <h2>Lista de chats</h2>
            <div id="contact-card" onClick={()=> setActiveUser("Luis")}>
                <h3>Luis</h3>
                <p>+57 3103546053</p>
            </div>
            <div id="contact-card" onClick={()=> setActiveUser("sebas")}>
                <h3>sebas</h3>
                <p>+57 3104566953</p>
            </div>
            <div id="contact-card" onClick={()=> setActiveUser("ale")}>
                <h3>ale</h3>
                <p>+57 3117846021</p>
            </div>
            <div id="contact-card" onClick={()=> setActiveUser("gabriel")}>
                <h3>gabriel</h3>
                <p>+57 3144567053</p>
            </div>
            
        </nav>
        
    )
}