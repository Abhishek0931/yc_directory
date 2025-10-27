import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { Toaster } from '@/components/ui/sonner';

export default function Layout ({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <main className = "font-work-sans">
            <Suspense fallback={<div>Loading Navbar...</div>}>
                <Navbar />
            </Suspense>
            <Suspense fallback={<div>Loding...</div>}>
            {children}
            </Suspense>
            {/* Global toaster for sonner to show toast notifications */}
            <Toaster />
        </main>
    )
}