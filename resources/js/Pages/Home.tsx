"use client";
import RoomService from "@/services/room-service";
import { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { GetRoomResp, GetRoomsResp, Room } from "@/entity/RoomResp";
import { Badge, Chip, Button } from "@heroui/react";


export default function Home() {
    const [isStatic, setIsStatic] = useState(false);
    const [roomList, setRoomList] = useState<Room[]>([]);

    useEffect(() => {
        setIsStatic(true)
    }, []);

    useEffect(() => {
        if (isStatic) {
            RoomService.getListRoom().then((response: GetRoomsResp) => {
                setRoomList(response.output.rooms)
            })
        }
    }, [isStatic]);

    const handleClick = useCallback((roomId: string) => {
        router.visit('/'+roomId);
    }, [router])


    const roomChips = useCallback((type: string) => {
        return (
            <>
                {type === 'reguler' && (<div className="absolute top-3 right-3 z-10 px-3 py-1 bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-600/50 flex items-center gap-1 shadow-lg">
                    <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Regular</span>
                </div>)}
                {type === 'vip' && (<div className="absolute top-3 right-3 z-10 px-3 py-1 bg-purple-600/30 backdrop-blur-md rounded-full border border-purple-500/50 flex items-center gap-1 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">VIP</span>
                </div>)}
                {type === 'vvip' && (<div className="absolute top-3 right-3 z-10 px-3 py-1 bg-orange-600/30 backdrop-blur-md rounded-full border border-orange-500/50 flex items-center gap-1 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                    <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">VVIP</span>
                </div>)}
            </>
        );
    }, []);
    const cardRoom = useMemo(() => {
        return (
            <>
                {roomList.map((room) => (
                    <Card className="p-0 shadow-lg">
                        <CardHeader className="p-0" >
                            <Swiper
                                className="w-full"
                                modules={[Navigation, Pagination, Autoplay, Scrollbar, EffectFade]}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                loop={room.files.length > 1}
                                slidesPerView={1}>
                                {room.files.length > 0 && room.files.map((file) => (
                                    <SwiperSlide>
                                        {roomChips(room.type)}

                                        <img
                                            alt={room.name + "-image-" + file.id}
                                            className="object-fill h-48 w-full"
                                            src={file.image}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </CardHeader>

                        <CardBody className="p-0">
                            <div className="flex flex-col flex-1 gap-2">
                                <div className="flex justify-between items-start p-2.5">
                                    <div>
                                        <h3 className="text-foreground text-lg font-bold leading-tight group-hover:text-primary transition-colors">{room.name}</h3>
                                        <div className="flex flex-row gap-2">
                                            {room.consoles.length > 0 && room.consoles.map((console) => (
                                                <>
                                                    <p className="text-primary text-sm font-semibold mt-1">{console.type}</p>
                                                    <Divider orientation="vertical" />
                                                </>
                                            ))}
                                        </div>

                                    </div>
                                    <div className="text-right">
                                        <p className="text-foreground font-bold text-lg">{room.pricePerHour}<span className="text-foreground/50 text-sm font-medium">/hr</span></p>
                                    </div>
                                </div>
                                <Divider className="m-0" />
                                <div className="flex items-center gap-4 p-2.5 border-foreground/5">
                                    <div className="flex items-center gap-1.5 text-foreground/40 text-xs font-medium">
                                        <span className="material-symbols-outlined text-[16px]">
                                            <svg className="size-4" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_201_12238)">
                                                    <path d="M6.3401 1.23098C5.96918 0.830516 5.45111 0.609985 4.87929 0.609985C4.30442 0.609985 3.78464 0.829182 3.41544 1.22717C3.04223 1.62954 2.86039 2.17638 2.90309 2.76688C2.98772 3.93186 3.87423 4.87956 4.87929 4.87956C5.88436 4.87956 6.76934 3.93205 6.8553 2.76726C6.89857 2.1821 6.71559 1.6364 6.3401 1.23098Z" fill="currentColor" />
                                                    <path d="M8.23393 9.14913H1.5246C1.43678 9.15028 1.34981 9.13183 1.27002 9.09513C1.19023 9.05843 1.11962 9.00441 1.06333 8.93699C0.939439 8.78889 0.8895 8.58666 0.926477 8.38214C1.08735 7.48972 1.5894 6.74007 2.37851 6.2138C3.07956 5.74663 3.96759 5.4895 4.87926 5.4895C5.79093 5.4895 6.67896 5.74682 7.38001 6.2138C8.16912 6.73988 8.67118 7.48953 8.83205 8.38195C8.86902 8.58647 8.81909 8.7887 8.69519 8.9368C8.63892 9.00425 8.56832 9.05831 8.48853 9.09504C8.40874 9.13178 8.32176 9.15025 8.23393 9.14913Z" fill="currentColor" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_201_12238">
                                                        <rect width="9.75902" height="9.75902" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </span>
                                        Max 4
                                    </div>
                                    <div className="flex items-center gap-1.5 text-foreground/40 text-xs font-medium">
                                        <svg fill="currentColor" className="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8,13 L9.5,13 C9.77614237,13 10,13.2238576 10,13.5 C10,13.7761424 9.77614237,14 9.5,14 L8,14 L8,15.5 C8,15.7761424 7.77614237,16 7.5,16 C7.22385763,16 7,15.7761424 7,15.5 L7,14 L5.5,14 C5.22385763,14 5,13.7761424 5,13.5 C5,13.2238576 5.22385763,13 5.5,13 L7,13 L7,11.5 C7,11.2238576 7.22385763,11 7.5,11 C7.77614237,11 8,11.2238576 8,11.5 L8,13 Z M10.6115614,8.9875078 C10.575689,8.99568276 10.5383486,9 10.5,9 C10.4616514,9 10.424311,8.99568276 10.3884386,8.9875078 L4.5,8.9875078 C3.67157288,8.9875078 3,9.65908068 3,10.4875078 L3,16.5 C3,17.3284271 3.67157288,18 4.5,18 L19.5069105,18 C20.3353377,18 21.0069105,17.3284271 21.0069105,16.5 L21.0069105,10.4875078 C21.0069105,9.65908068 20.3353377,8.9875078 19.5069105,8.9875078 L10.6115614,8.9875078 Z M10,7.9875078 L10,7 C10,5.8954305 10.8954305,5 12,5 C12.5522847,5 13,4.55228475 13,4 L13,3.5 C13,3.22385763 13.2238576,3 13.5,3 C13.7761424,3 14,3.22385763 14,3.5 L14,4 C14,5.1045695 13.1045695,6 12,6 C11.4477153,6 11,6.44771525 11,7 L11,7.9875078 L19.5069105,7.9875078 C20.8876224,7.9875078 22.0069105,9.10679593 22.0069105,10.4875078 L22.0069105,16.5 C22.0069105,17.8807119 20.8876224,19 19.5069105,19 L4.5,19 C3.11928813,19 2,17.8807119 2,16.5 L2,10.4875078 C2,9.10679593 3.11928813,7.9875078 4.5,7.9875078 L10,7.9875078 Z M13.5,11 L14.5,11 C14.7761424,11 15,11.2238576 15,11.5 L15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L13.5,13 C13.2238576,13 13,12.7761424 13,12.5 L13,11.5 C13,11.2238576 13.2238576,11 13.5,11 Z M16.5,11 L17.5,11 C17.7761424,11 18,11.2238576 18,11.5 L18,12.5 C18,12.7761424 17.7761424,13 17.5,13 L16.5,13 C16.2238576,13 16,12.7761424 16,12.5 L16,11.5 C16,11.2238576 16.2238576,11 16.5,11 Z M17.5,14 L18.5,14 C18.7761424,14 19,14.2238576 19,14.5 L19,15.5 C19,15.7761424 18.7761424,16 18.5,16 L17.5,16 C17.2238576,16 17,15.7761424 17,15.5 L17,14.5 C17,14.2238576 17.2238576,14 17.5,14 Z M14.5,14 L15.5,14 C15.7761424,14 16,14.2238576 16,14.5 L16,15.5 C16,15.7761424 15.7761424,16 15.5,16 L14.5,16 C14.2238576,16 14,15.7761424 14,15.5 L14,14.5 C14,14.2238576 14.2238576,14 14.5,14 Z" />
                                        </svg>
                                        4 Ctrls
                                    </div>
                                    <div className="flex items-center gap-1.5 text-foreground/40 text-xs font-medium">
                                        <svg
                                            className="size-5 text-foreground/40"
                                            viewBox="0 0 32 32"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M22,13H20v6h2a1,1,0,0,0,1-1V14A1,1,0,0,0,22,13Z" />
                                            <path d="M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM15,21H13V17H10v4H8V11h2v4h3V11h2Zm10-3a3,3,0,0,1-3,3H18V11h4a3,3,0,0,1,3,3Z" />
                                            <rect className="cls-1" style={{ fill: "none" }} />
                                        </svg>

                                        4K 120Hz
                                    </div>
                                </div>
                                <div className="px-2.5 pb-4 flex mt-auto">
                                    <button
                                        color="primary"
                                        className="mt-auto w-full bg-primary hover:bg-blue-600 text-background font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        type="button"
                                        onClick={() => { handleClick(room.id) }}>
                                        <span>Book Now</span>
                                        <span className="material-symbols-outlined text-[18px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>

                                        </span>
                                    </button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </>
        )
    }, [roomList]);

    const popularGames = useMemo(() => {
        return (
            <>
                <div className="mb-10 relative">
                    <div className="flex items-center justify-between px-1 mb-5">
                        <h2 className="text-foreground text-xl font-extrabold tracking-tight">Popular Games</h2>
                    </div>

                    <div className="flex justify-center items-center">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay, Scrollbar, EffectFade]}
                            spaceBetween={12}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            loop={true}
                            breakpoints={{
                                0: { slidesPerView: 1, effect: 'fade' },
                                768: { slidesPerView: 2, effect: 'slide' },
                                1024: { slidesPerView: 3, effect: 'slide' },
                                1280: { slidesPerView: 4, effect: 'slide' },
                            }}>
                            <SwiperSlide>
                                <div className="relative flex-none w-full h-[400px] rounded-[2rem] snap-center overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(19,127,236,0.3)] border border-foreground/5 bg-surface-dark z-0 hover:z-10">
                                    <img src={"https://lh3.googleusercontent.com/aida-public/AB6AXuCnQPylrecB6UQN_G4DUlSbtGWlHc5RL7GwVhrljKsI_ssEHnuz-tpjdtqe6fo7fwqjdHTHRFzueWewqK5c5hffcMoTj-uGrTpvUDNVnrsxc2vE2Dhd3kxbaB6H6II_K-aLJdzq5zVzZGVAi2i-gl9kN9AdZkALJK5AWyN9b0C2vWXlfHYvJwhqI-CKEcMLvSh3KzoAVI2X0EyKLXHLtYIxClrswpRjdhnbB0G0bVpIVXQwT8ezpUOLrbotsK3S3TsbSLvn6cnhpg"}
                                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 object-fill h-full w-full" alt="image-1" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 shadow-xl ring-1 ring-foreground/10 transition-colors group-hover:bg-foreground/15">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-500 text-foreground uppercase tracking-wider shadow-sm">Sports</span>
                                            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[12px] text-yellow-400">star</span>
                                                <span className="text-[10px] font-bold text-foreground">4.8</span>
                                            </div>
                                        </div>
                                        <h3 className="text-foreground font-bold text-xl leading-tight mb-1">EA Sports FC 24</h3>
                                        <p className="text-foreground/30 text-xs line-clamp-1">Experience the realistic football gameplay.</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="relative flex-none w-full h-[400px] rounded-[2rem] snap-center overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(19,127,236,0.3)] border border-foreground/5 bg-surface-dark z-0 hover:z-10">
                                    <img src={"https://lh3.googleusercontent.com/aida-public/AB6AXuADyA_idkPcG4mX1HxpgH1ROP5PJiLr9toZ1N_k_hKMMDfqd4V5WD3vt4wwhR5fJV0ekyDOeD7ZeVuZVifRp50o3OxtyvE_uSUt4jTt7pHbAYgtG0XN61NRyZnvkrFHR2QrsuKT3YWCfFGAtPJ3iHB53PJdo-Aup__b9il-qpOCDj92SOqp5H6woFpQ8HBOQVNvJY98pgu0_-z8OEhwlbV4BoJkWZO8yAog7cdochPH4JVkTG1QYzbcBFcs52NFozX-T3SA5TQYTw"}
                                        className="absolute inset-0 w-full transition-transform duration-700 group-hover:scale-110  object-fill h-full w-full" alt="image-1" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 shadow-xl ring-1 ring-foreground/10 transition-colors group-hover:bg-foreground/15">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-red-600 text-foreground uppercase tracking-wider shadow-sm">Action</span>
                                            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[12px] text-yellow-400">star</span>
                                                <span className="text-[10px] font-bold text-foreground">4.9</span>
                                            </div>
                                        </div>
                                        <h3 className="text-foreground font-bold text-xl leading-tight mb-1">God of War: Ragnarök</h3>
                                        <p className="text-foreground/30 text-xs line-clamp-1">Embark on a mythic journey for answers.</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="relative flex-none w-full h-[400px] rounded-[2rem] snap-center overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(19,127,236,0.3)] border border-foreground/5 bg-surface-dark z-0 hover:z-10">
                                    <img src={"https://lh3.googleusercontent.com/aida-public/AB6AXuAQJ1b9KaXu-gIZDYj1tZH4FhutUFFm021G6StPXpRG4ofcTLuBbjuvn8Dc71HTNuDOKd9vrOxeIMZ0bAjBtpNzQdTjq0ssRzsQenlBZfRKlzOAEvPWjtbgeWSHAZvj84DPUVlwCxIN_tbBzkdxYM1ooI4wpIy0b3T7ZEt6rO2ZxUAnCcE_X7GhhC6YLMfTcflOwM5mPrJsmHuKQxBhuYEJpRH7rT1d1PoHECn5d01D2aVs9k7XSfFd-cwBlgLca4N4_lq-gXmJwA"}
                                        className="absolute inset-0 w-full transition-transform duration-700 group-hover:scale-110  object-fill h-full w-full" alt="image-1" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 shadow-xl ring-1 ring-foreground/10 transition-colors group-hover:bg-foreground/15">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-red-500 text-foreground uppercase tracking-wider shadow-sm">Action</span>
                                            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[12px] text-yellow-400">star</span>
                                                <span className="text-[10px] font-bold text-foreground">4.8</span>
                                            </div>
                                        </div>
                                        <h3 className="text-foreground font-bold text-xl leading-tight mb-1">Spider-Man 2</h3>
                                        <p className="text-foreground/30 text-xs line-clamp-1">Two Spider-Men, one epic adventure.</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="relative flex-none w-full h-[400px] rounded-[2rem] snap-center overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(19,127,236,0.3)] border border-foreground/5 bg-surface-dark z-0 hover:z-10">
                                    <img src={"https://lh3.googleusercontent.com/aida-public/AB6AXuAH4ib7yB6ob3ZkwCAKcoAaEjsaNWjS4zkmgCduLDbPKIVfm2WysbyVldrrpcT0ASnyJPmwfsc6qFG9njBYgv5xOBS8dW3Ocvws2IFPy3ic3qjziqQ4RlxOIEOg7l5wn5OkNeKKvptwa0zuRItmVj19aNCpe0D3tknZtAUrfg9CrpcA7uEFUl7USmgjCnuiutme4OJOZKf7bVGweBVs_GGZlrCY9eM-Ao5M2JL2Xr1NKIRuk5V_Q_Eufo9NEmuO4rajGIiaxsbsFQ"}
                                        className="absolute inset-0 w-full transition-transform duration-700 group-hover:scale-110 object-fill h-full w-full" alt="image-1" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 shadow-xl ring-1 ring-foreground/10 transition-colors group-hover:bg-foreground/15">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-orange-500 text-foreground uppercase tracking-wider shadow-sm">Racing</span>
                                            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[12px] text-yellow-400">star</span>
                                                <span className="text-[10px] font-bold text-foreground">4.7</span>
                                            </div>
                                        </div>
                                        <h3 className="text-foreground font-bold text-xl leading-tight mb-1">Gran Turismo 7</h3>
                                        <p className="text-foreground/30 text-xs line-clamp-1">The real driving simulator is back.</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="relative flex-none w-full h-[400px] rounded-[2rem] snap-center overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(19,127,236,0.3)] border border-foreground/5 bg-surface-dark z-0 hover:z-10">
                                    <img src={"https://lh3.googleusercontent.com/aida-public/AB6AXuBiVMwuB-mnMhUU4vnITjiXk6_EWD_FZwTwuXOCBYraj8GOSqT41PxMskVRx8NDBaDrkHYIuNK3kQlR8nGlnSZhoYOFQ8-lavFGFZbJp9JAJYz8amc712HjFvhdIm68qhy1fz4Qy22lBxCDe1684pt7WBn4w5X-lV_ZvFMuy2a7UCaW8K8IcP40cIanlW-78mBro6o3kJbyoyDzxHt2QFPfc7vq1_4ji5ZpkdQJO0oOo0sWvIPckxRqx7dfS08Yugw7nUphD1GojQ"}
                                        className="absolute inset-0 w-full transition-transform duration-700 group-hover:scale-110 object-fill h-full w-full" alt="image-1" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 shadow-xl ring-1 ring-foreground/10 transition-colors group-hover:bg-foreground/15">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-orange-500 text-foreground uppercase tracking-wider shadow-sm">Racing</span>
                                            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[12px] text-yellow-400">star</span>
                                                <span className="text-[10px] font-bold text-foreground">4.7</span>
                                            </div>
                                        </div>
                                        <h3 className="text-foreground font-bold text-xl leading-tight mb-1">Gran Turismo 7</h3>
                                        <p className="text-foreground/30 text-xs line-clamp-1">The real driving simulator is back.</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="relative flex-none w-full h-[400px] rounded-[2rem] snap-center overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(19,127,236,0.3)] border border-foreground/5 bg-surface-dark z-0 hover:z-10">
                                    <img src={"https://lh3.googleusercontent.com/aida-public/AB6AXuBCKdCXuFZtkcWkMuqze2551eaoGbYx6wWMv0wgzEB3QffdVj5yyvrHrxtbYHuhXw-icMhZ9U_ftVE-cV-ASixLDRPjipbvS1WU4yKo7vs_jUmp2v6UuonjotWMNd-pBN04HS0Ws9vwcjcoyaPTMfT5AkGP0bbNzpbQBSrOpL4IYNO9nsREtLdmtPqQBwAr-2ZdYTBiiM2gDK_4V2rt9StvpJqFCZG-5__Bvuz4vgjJl8JFJKHz9mNTcDXdjiIr-tYzVb0wFoEHag"}
                                        className="absolute inset-0 w-full transition-transform duration-700 group-hover:scale-110 object-fill h-full w-full" alt="image-1" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 shadow-xl ring-1 ring-foreground/10 transition-colors group-hover:bg-foreground/15">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-orange-500 text-foreground uppercase tracking-wider shadow-sm">Racing</span>
                                            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[12px] text-yellow-400">star</span>
                                                <span className="text-[10px] font-bold text-foreground">4.7</span>
                                            </div>
                                        </div>
                                        <h3 className="text-foreground font-bold text-xl leading-tight mb-1">Gran Turismo 7</h3>
                                        <p className="text-foreground/30 text-xs line-clamp-1">The real driving simulator is back.</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </>
        )
    }, []);

    return (
        <>
            <div className="mb-8 space-y-2">
                <h1 className="text-foreground text-3xl md:text-4xl font-extrabold tracking-tight">Select Your Battle Station</h1>
                <p className="text-foreground/40 text-lg">Choose from our top-tier gaming rooms and start playing.</p>
            </div>
            <div className="sticky top-[50px] z-40 bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 mb-6 border-b border-foreground/5 md:static md:bg-transparent md:border-none md:p-0 md:m-0 !mb-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="relative w-full md:max-w-md group md:border md:border-foreground/10 md:rounded-lg">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/40 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input className="block w-full pl-18 pr-3 py-3 border-foreground/5 rounded-xl leading-5 bg- text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow sm:text-sm" placeholder="Search rooms, consoles, games..." type="text" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {cardRoom}
            </div>
            {popularGames}
        </>
    )
}
