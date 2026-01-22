import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    X,
    LogOut,
    LayoutDashboard,
    Wallet,
    ArrowLeftRight,
    Target,
    User
} from 'lucide-react';
import { clsx } from 'clsx';

interface MenuDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Carteira', path: '/cards', icon: Wallet },
        { name: 'Transações', path: '/transactions', icon: ArrowLeftRight },
        { name: 'Objetivos', path: '/goals', icon: Target },
        { name: 'Perfil', path: '/profile', icon: User },
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-200"
                aria-hidden="true"
            />

            {/* Dropdown Menu */}
            <div
                ref={dropdownRef}
                className="fixed top-0 left-0 right-0 z-50 bg-background-400 rounded-b-3xl shadow-2xl animate-in slide-in-from-top duration-300"
            >
                {/* Header inside Dropdown to align with trigger */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-secondary-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-secondary-900 font-bold">
                            my
                        </div>
                        <span className="font-bold text-xl text-secondary-900">mycash+</span>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-secondary-50 text-secondary-900"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    {/* Navigation Items */}
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={clsx(
                                        "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                                        isActive
                                            ? "bg-secondary-900 text-surface-500"
                                            : "text-neutral-500 hover:bg-white hover:text-secondary-900"
                                    )}
                                >
                                    <item.icon
                                        size={24}
                                        className={clsx(
                                            "shrink-0",
                                            isActive ? "text-primary-500" : "text-current"
                                        )}
                                    />
                                    <span className="font-medium text-lg">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="h-px bg-secondary-50 w-full" />

                    {/* Logout Button */}
                    <button
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full"
                        onClick={() => {
                            // Implement logout logic here
                            onClose();
                        }}
                    >
                        <LogOut size={24} />
                        <span className="font-medium text-lg">Sair</span>
                    </button>
                </div>
            </div>
        </>
    );
}
