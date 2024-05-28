import Link from 'next/link';
import React, { useEffect } from 'react';

interface SidebarProps {
    isOpen: boolean; // Flag indicating whether the sidebar is open
    toggleSidebar: () => void; // Function to toggle the sidebar's visibility
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const sidebarRef =  React.createRef<HTMLDivElement>();;

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            //     toggleSidebar();
            // }

            if (sidebarRef.current) {
                const element = sidebarRef.current as HTMLElement; // Assert as HTMLElement
                if (!element.contains(event.target)) {
                  toggleSidebar();
                }
              }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleSidebar]);
    return (
        <div
            ref={sidebarRef}
            className={`fixed z-10 top-0 right-0 h-full w-[17rem] bg-white shadow-xl transition-transform transform ${isOpen ? '-translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="p-4 mb-2">
                <h5 className="text-xl font-semibold text-blue-gray-900 m-4 ml-0">Menu</h5>
            </div>
            <nav className="p-2 text-base font-normal text-blue-gray-700">
                <div className="flex flex-col gap-1">
                    <Link href={"./work"}  className="p-3 hover:bg-blue-gray-50" role="button" onClick={toggleSidebar}>
                    Work
                    </Link>

                    <div className="p-3 hover:bg-blue-gray-50" role="button" onClick={toggleSidebar}>
                    Services
                    </div>
                    <div className="p-3 hover:bg-blue-gray-50" role="button" onClick={toggleSidebar}>
                    Clients
                    </div>
                    <div className="p-3 hover:bg-blue-gray-50" role="button" onClick={toggleSidebar}>
                    About
                    </div>
                    <div className="p-3 hover:bg-blue-gray-50" role="button" onClick={toggleSidebar}>
                    Knowledge
                    </div>
                    
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
