import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { HeaderMobile } from './HeaderMobile';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';

export function MainLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background-400 flex relative flex-col lg:flex-row">
            {/* Desktop Sidebar */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Mobile Header */}
            <HeaderMobile />

            <main
                className={clsx(
                    "flex-1 min-h-screen transition-all duration-300 w-full pt-20 lg:pt-0",
                    isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
                )}
            >
                <div className="w-full h-full p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
