function Footer() {
    return (
        <footer id="footer" className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-300 py-4 px-8 text-center">
            <p className="text-sm">
                © {new Date().getFullYear()} RoshRepz Fitness. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;