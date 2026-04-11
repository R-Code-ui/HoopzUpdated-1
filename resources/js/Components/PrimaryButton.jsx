export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center border-2 border-black bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-150 hover:bg-white hover:text-black focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
