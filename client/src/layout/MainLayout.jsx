const MainLayout =({children}) =>{
    return(
         <div className="flex h-screen bg-gray-100" >
            <aside className="w-64 bg-gray-900 text-white p-4">
                Sidebar
            </aside>
            <main className="flex-1 p-6" >
                {children}
            </main>

        </div>
    )
}

export default MainLayout