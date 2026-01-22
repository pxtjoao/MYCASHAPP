import {
    LayoutDashboard,
    Wallet,
    ArrowLeftRight,
    Target,
    User,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Logo } from '../common/Logo';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Carteira', path: '/cards', icon: Wallet },
        { name: 'Transações', path: '/transactions', icon: ArrowLeftRight },
        { name: 'Objetivos', path: '/goals', icon: Target },
        { name: 'Perfil', path: '/profile', icon: User },
    ];

    return (
        <aside
            className={twMerge(
                "hidden lg:flex flex-col h-screen fixed left-0 top-0 bg-background-400 border-r border-secondary-50 transition-all duration-300 z-50",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header / Logo */}
            <div className="h-20 flex items-center px-6">
                <div className={clsx(
                    "transition-all duration-300",
                    isCollapsed ? "opacity-100 w-full flex justify-center" : "w-full"
                )}>
                    <Logo variant={isCollapsed ? 'small' : 'default'} />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative group"
                        >
                            <div className={clsx(
                                "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-secondary-900 text-surface-500"
                                    : "text-neutral-500 hover:bg-white hover:text-secondary-900"
                            )}>
                                <item.icon
                                    size={24}
                                    className={clsx(
                                        "shrink-0",
                                        isActive ? "text-primary-500" : "text-current"
                                    )}
                                />
                                <span className={clsx(
                                    "font-medium whitespace-nowrap transition-all duration-300 overflow-hidden",
                                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                                )}>
                                    {item.name}
                                </span>
                            </div>

                            {/* Tooltip for Collapsed State */}
                            {isCollapsed && (
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-secondary-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Profile */}
            <div className="p-4 border-t border-secondary-50">
                <div className={clsx(
                    "flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white cursor-pointer",
                    isCollapsed ? "justify-center" : ""
                )}>
                    <div className="w-10 h-10 rounded-full bg-neutral-300 shrink-0 overflow-hidden">
                        <img src="https://github.com/shadcn.png" alt="User" />
                    </div>

                    <div className={clsx(
                        "flex flex-col overflow-hidden transition-all duration-300",
                        isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}>
                        <span className="font-semibold text-sm text-secondary-900 truncate">João Silva</span>
                        <span className="text-xs text-neutral-500 truncate">joao@mycash.app</span>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-24 w-6 h-6 bg-white border border-secondary-50 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-50"
            >
                {isCollapsed ? (
                    <ChevronRight size={14} className="text-secondary-900" />
                ) : (
                    <ChevronLeft size={14} className="text-secondary-900" />
                )}
            </button>
        </aside>
    );
}
