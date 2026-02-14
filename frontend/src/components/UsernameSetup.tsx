export function UsernameSetup() {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <input 
                type="text" 
                className="border-3 border-black rounded-lg p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:to-black focus:border-black transition duration-200 bg-amber-50 text-black" 
                placeholder="Add username" 
            />
        </div>
    );
}