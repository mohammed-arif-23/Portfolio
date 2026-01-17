import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#201d1d] text-[#fbfbf2]">
            <h2 className="text-9xl font-bold font-cookie mb-4">404</h2>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link
                href="/"
                className="px-8 py-4 bg-[#fbfbf2] text-[#201d1d] rounded-full font-bold hover:bg-[#cfd2cd] transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
