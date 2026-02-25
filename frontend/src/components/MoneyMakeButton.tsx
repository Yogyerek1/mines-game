type MoneyMakeProps = {
    onClick: () => void;
};

export function MoneyMakeButton({ onClick }: MoneyMakeProps) {
    return (
        <div className="flex justify-center pb-40">
            <button
                className="bg-[rgba(139,92,246,1)] border-0 rounded-full text-xl font-bold w-40 h-14 hover:scale-95 transition duration-100"
                onClick={onClick}
            >
                FREE MONEY
            </button>
        </div>
    )
}