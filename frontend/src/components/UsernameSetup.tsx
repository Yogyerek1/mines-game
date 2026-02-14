export function UsernameSetup() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="scale-100 md:scale-125 lg:scale-150 flex flex-col items-center gap-4">
                <span className="font-bold text-amber-100 text-4xl">
                    Set Username...
                </span>
                <div className="flex items-center justify-center p-4 border border-emerald-700 rounded-lg bg-[#333333]">
                    <div className="flex items-center space-x-2 w-full max-w-md">
                        <input 
                            type="text"
                            className="flex-1 border-3 border-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200 bg-amber-100 text-black placeholder-gray-600"
                            placeholder="Add username"
                        />
                        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 whitespace-nowrap">
                            Set
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}