export function UsernameSetup() {
    return (
        <div className="items-center justify-center p-4 w-100 h-20 border border-emerald-700 rounded-lg bg-[#333333] scale-100 md:scale-125 lg:scale-150">
            <div className="flex items-center space-x-1 w-full max-w-md">
                <input 
                    type="text" 
                    className="flex-1 border-3 border-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200 bg-amber-100 text-black" 
                    placeholder="Add username" 
                />
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200">
                    Set
                </button>
            </div>
        </div>
    );
}