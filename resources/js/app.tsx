import '../css/app.css';
import './bootstrap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from "@heroui/react";
import DefaultLayout from './layouts/default';
import { ReactNode } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
        resolve: async (name) => {
        const page: any = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        );

        // Default layout fallback
        page.default.layout =
            page.default.layout ||
            ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>);

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <HeroUIProvider>
                    <App {...props} />
            </HeroUIProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});