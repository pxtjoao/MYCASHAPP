import { useState } from 'react';
import { MenuDropdown } from './MenuDropdown';
import { Logo } from '../common/Logo';

export function HeaderMobile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="lg:hidden h-20 fixed top-0 left-0 right-0 bg-background-400 border-b border-secondary-50 px-6 flex items-center justify-between z-40 transition-transform duration-300">
                <Logo />

                {/* User Avatar - Trigger */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="relative w-10 h-10 rounded-full bg-neutral-300 overflow-hidden ring-2 ring-transparent active:scale-95 transition-all"
                >
                    <img
                        src="https://github.com/shadcn.png"
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </button>
            </header>

            <MenuDropdown
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </>
    );
}
