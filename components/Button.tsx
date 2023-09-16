interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}
const Button = ({ className, children, ...props }: ButtonProps) => {
	return (
		<button
			className={`transition duration-500  font-bold py-3 px-7 rounded-xl ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
