type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return <main className="flex items-center justify-center h-full">{children}</main>;
};

export default Layout;
