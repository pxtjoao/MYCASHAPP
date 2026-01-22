import { useState } from 'react';
import { MenuDropdown } from './MenuDropdown';

export function HeaderMobile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="lg:hidden h-20 fixed top-0 left-0 right-0 bg-background-400 border-b border-secondary-50 px-6 flex items-center justify-between z-40 transition-transform duration-300">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-secondary-900 font-bold">
                        my
                    </div>
                    <span className="font-bold text-xl text-secondary-900">mycash+</span>
                </div>

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
