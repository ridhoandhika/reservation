import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const popularGames = [
    {
        id: 1,
        title: "EA Sports FC 24",
        category: "Sports",
        rating: 4.8,
        description: "Experience the realistic football gameplay.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnQPylrecB6UQN_G4DUlSbtGWlHc5RL7GwVhrljKsI_ssEHnuz-tpjdtqe6fo7fwqjdHTHRFzueWewqK5c5hffcMoTj-uGrTpvUDNVnrsxc2vE2Dhd3kxbaB6H6II_K-aLJdzq5zVzZGVAi2i-gl9kN9AdZkALJK5AWyN9b0C2vWXlfHYvJwhqI-CKEcMLvSh3KzoAVI2X0EyKLXHLtYIxClrswpRjdhnbB0G0bVpIVXQwT8ezpUOLrbotsK3S3TsbSLvn6cnhpg",
        color: "bg-blue-500"
    },
    {
        id: 2,
        title: "God of War: Ragnarök",
        category: "Action",
        rating: 4.9,
        description: "Embark on a mythic journey for answers.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADyA_idkPcG4mX1HxpgH1ROP5PJiLr9toZ1N_k_hKMMDfqd4V5WD3vt4wwhR5fJV0ekyDOeD7ZeVuZVifRp50o3OxtyvE_uSUt4jTt7pHbAYgtG0XN61NRyZnvkrFHR2QrsuKT3YWCfFGAtPJ3iHB53PJdo-Aup__b9il-qpOCDj92SOqp5H6woFpQ8HBOQVNvJY98pgu0_-z8OEhwlbV4BoJkWZO8yAog7cdochPH4JVkTG1QYzbcBFcs52NFozX-T3SA5TQYTw",
        color: "bg-red-600"
    },
    {
        id: 3,
        title: "Spider-Man 2",
        category: "Action",
        rating: 4.8,
        description: "Two Spider-Men, one epic adventure.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQJ1b9KaXu-gIZDYj1tZH4FhutUFFm021G6StPXpRG4ofcTLuBbjuvn8Dc71HTNuDOKd9vrOxeIMZ0bAjBtpNzQdTjq0ssRzsQenlBZfRKlzOAEvPWjtbgeWSHAZvj84DPUVlwCxIN_tbBzkdxYM1ooI4wpIy0b3T7ZEt6rO2ZxUAnCcE_X7GhhC6YLMfTcflOwM5mPrJsmHuKQxBhuYEJpRH7rT1d1PoHECn5d01D2aVs9k7XSfFd-cwBlgLca4N4_lq-gXmJwA",
        color: "bg-red-500"
    },
    {
        id: 4,
        title: "Gran Turismo 7",
        category: "Racing",
        rating: 4.7,
        description: "The real driving simulator is back.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH4ib7yB6ob3ZkwCAKcoAaEjsaNWjS4zkmgCduLDbPKIVfm2WysbyVldrrpcT0ASnyJPmwfsc6qFG9njBYgv5xOBS8dW3Ocvws2IFPy3ic3qjziqQ4RlxOIEOg7l5wn5OkNeKKvptwa0zuRItmVj19aNCpe0D3tknZtAUrfg9CrpcA7uEFUl7USmgjCnuiutme4OJOZKf7bVGweBVs_GGZlrCY9eM-Ao5M2JL2Xr1NKIRuk5V_Q_Eufo9NEmuO4rajGIiaxsbsFQ",
        color: "bg-orange-500"
    },
    {
        id: 5,
        title: "Elden Ring",
        category: "RPG",
        rating: 4.9,
        description: "Rise, Tarnished, and be guided by grace.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiVMwuB-mnMhUU4vnITjiXk6_EWD_FZwTwuXOCBYraj8GOSqT41PxMskVRx8NDBaDrkHYIuNK3kQlR8nGlnSZhoYOFQ8-lavFGFZbJp9JAJYz8amc712HjFvhdIm68qhy1fz4Qy22lBxCDe1684pt7WBn4w5X-lV_ZvFMuy2a7UCaW8K8IcP40cIanlW-78mBro6o3kJbyoyDzxHt2QFPfc7vq1_4ji5ZpkdQJO0oOo0sWvIPckxRqx7dfS08Yugw7nUphD1GojQ",
        color: "bg-amber-700"
    },
    {
        id: 6,
        title: "The Last of Us Part II",
        category: "Action",
        rating: 4.9,
        description: "A complex and emotional story of revenge.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCKdCXuFZtkcWkMuqze2551eaoGbYx6wWMv0wgzEB3QffdVj5yyvrHrxtbYHuhXw-icMhZ9U_ftVE-cV-ASixLDRPjipbvS1WU4yKo7vs_jUmp2v6UuonjotWMNd-pBN04HS0Ws9vwcjcoyaPTMfT5AkGP0bbNzpbQBSrOpL4IYNO9nsREtLdmtPqQBwAr-2ZdYTBiiM2gDK_4V2rt9StvpJqFCZG-5__Bvuz4vgjJl8JFJKHz9mNTcDXdjiIr-tYzVb0wFoEHag",
        color: "bg-stone-800"
    }
];

export default function GameSlider() {
    return (
        <div className="w-full py-4 relative group/slider">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: -20,
                    depth: 150,
                    modifier: 2,
                    slideShadows: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-custom-pagination',
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className="game-swiper !pb-16 !px-4"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        centeredSlides: true,
                    },
                    640: {
                        slidesPerView: 'auto',
                        centeredSlides: true,
                    }
                }}
            >
                {popularGames.map((game) => (
                    <SwiperSlide key={game.id} className="!w-[280px] sm:!w-[320px] !h-[420px] sm:!h-[460px]">
                        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden group transition-all duration-500 border border-white/10 bg-surface-dark shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: `url("${game.imageUrl}")` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                            {/* Glow effect on hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-primary to-transparent animate-pulse`}></div>

                            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-[1.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/5 transition-all duration-500 group-hover:bg-white/10 group-hover:translate-y-[-5px]">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black ${game.color} text-white uppercase tracking-widest shadow-lg`}>
                                        {game.category}
                                    </span>
                                    <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
                                        <span className="material-symbols-outlined text-[14px] text-yellow-400 fill-current">star</span>
                                        <span className="text-[11px] font-black text-white">{game.rating}</span>
                                    </div>
                                </div>
                                <h3 className="text-white font-black text-2xl leading-tight mb-1.5 tracking-tight group-hover:text-primary transition-colors">{game.title}</h3>
                                <p className="text-gray-400 text-xs line-clamp-2 font-medium leading-relaxed">{game.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-surface-dark/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-primary hover:border-primary hover:scale-110 -ml-6 md:ml-0 shadow-2xl">
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-surface-dark/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-primary hover:border-primary hover:scale-110 -mr-6 md:mr-0 shadow-2xl">
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            {/* Custom Pagination */}
            <div className="swiper-custom-pagination flex justify-center gap-3 mt-6"></div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .swiper-custom-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: rgba(255,255,255,0.1);
                    opacity: 1;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border-radius: 4px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .swiper-custom-pagination .swiper-pagination-bullet-active {
                    width: 32px;
                    background: #137fec;
                    box-shadow: 0 0 20px rgba(19, 127, 236, 0.6);
                    border-color: rgba(255,255,255,0.2);
                }
                .game-swiper {
                    overflow: visible !important;
                }
            `}} />
        </div>
    );
}
