

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background text-foreground font-display min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background backdrop-blur-md">
                <div className="px-6 lg:px-10 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-foreground">
                        <div className="size-8 text-primary">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-foreground text-xl font-bold tracking-tight">PS Zone</h2>
                    </div>
                </div>
            </header>
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <footer className="mt-auto w-full bg-background border-t border-foreground/5 py-8 md:py-12">
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <svg className="size-6 text-blue-500" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.87977 0.609985C3.19615 0.609985 1.83008 1.83958 1.83008 3.35471C1.83008 5.79446 4.87977 9.14913 4.87977 9.14913C4.87977 9.14913 7.92947 5.79446 7.92947 3.35471C7.92947 1.83958 6.56339 0.609985 4.87977 0.609985ZM4.87977 4.87956C4.6385 4.87956 4.40265 4.80801 4.20204 4.67397C4.00144 4.53993 3.84508 4.34941 3.75275 4.12651C3.66042 3.9036 3.63626 3.65833 3.68333 3.42169C3.7304 3.18506 3.84659 2.9677 4.01719 2.7971C4.18779 2.62649 4.40515 2.51031 4.64179 2.46324C4.87842 2.41617 5.1237 2.44033 5.3466 2.53266C5.5695 2.62499 5.76002 2.78134 5.89406 2.98195C6.0281 3.18256 6.09965 3.41841 6.09965 3.65968C6.0993 3.9831 5.97066 4.29318 5.74197 4.52187C5.51327 4.75057 5.2032 4.8792 4.87977 4.87956Z" fill="currentColor" />
                                </svg>

                                Our Location
                            </h2>
                            <p className="text-foreground/50 text-sm md:text-base max-w-md">
                                123 Gamer's Paradise Blvd, Suite 404<br />
                                Pixel District, CA 90210
                            </p>
                        </div>

                        <div className="relative w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
                            <iframe allowFullScreen className="w-full h-full grayscale-[50%]  contrast-[1.1] opacity-80 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3966.532731153228!2d106.84032907607889!3d-6.193214660677752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTEnMzUuNiJTIDEwNsKwNTAnMzQuNSJF!5e0!3m2!1sid!2sid!4v1769263179088!5m2!1sid!2sid" style={{ border: 0 }}>
                            </iframe>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-foreground/50 text-sm">
                            <p>© 2024 PS Zone. All rights reserved.</p>
                            <div className="flex gap-6">
                                <a className="hover:text-primary transition-colors" href="#">Privacy</a>
                                <a className="hover:text-primary transition-colors" href="#">Terms</a>
                                <a className="hover:text-primary transition-colors" href="#">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}