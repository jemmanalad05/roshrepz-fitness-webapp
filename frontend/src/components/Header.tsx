import Logo from "../../assets/RoshRepzLogo.png";

function Header() {
    return (
        <header id="header" className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-sm">
            <div className="flex items-center gap-3">
                <img
                    src={Logo}
                    alt="RoshRepz Fitness logo"
                    className="h-12 w-12 object-contain"
                />
                <h1 className="text-2xl font-bold tracking-tight text-gray-200">
                    RoshRepz Fitness
                </h1>
            </div>
        </header>
    );
}

export default Header;