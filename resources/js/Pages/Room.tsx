"use client";

import RoomService from "@/services/room-service";
import { GetRoomResp, Room } from "@/entity/RoomResp";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import classNames from "react-day-picker/style.module.css";

export default function Room() {
    const [selected, setSelected] = useState<Date>();
    const defaultClassNames = getDefaultClassNames();
    const { roomId } = usePage().props
    const [room, setRoom] = useState<Room>();
    console.log(classNames);
    useEffect(() => {
        RoomService.getDetailRoom((roomId ?? "") as string).then((response: GetRoomResp) => {
            console.log("Room detail response:", typeof response.output.room.pricePerHour);

            setRoom(response.output.room);
        }).catch((error) => {
            console.error("Error fetching room details:", error);
        });
    }, [roomId]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* <!-- Left Column: Configuration --> */}
            <div className="lg:col-span-7 flex flex-col gap-8">
                {/* <!-- Page Heading --> */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Book Your Session</h1>
                    <p className="text-foreground/60 text-base font-normal">Configure your gaming experience details below.</p>
                </div>
                {/* <!-- Room Summary Card --> */}
                <Card className="p-3">
                    <CardBody>
                        <div className="flex flex-col gap-1">
                            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit mb-1">SELECTED ROOM</span>
                            <p className="text-lg font-bold leading-tight px-1">VIP Room 2</p>
                            <div className="flex items-center gap-4 px-0.5 border-foreground/5">
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
                        </div>
                        <p className="text-primary text-lg font-bold">$15<span className="text-foreground/60 text-sm font-normal">/hr</span></p>
                    </CardBody>
                </Card>
                <Card className="p-3">
                    <CardBody>
                        <h3 className="text-lg font-bold leading-tight tracking-[-0.015em]">Select Date</h3>
                        <DayPicker
                            animate
                            showOutsideDays
                            mode="single"
                            styles={{

                                root: {
                                    width: "100%",
                                },
                                months: {
                                    width: "100%",
                                    justifyContent: "center",
                                    gap: "1rem",
                                    maxWidth: "none",
                                },
                                month: {
                                    boxShadow: "none",
                                    borderWidth: "0px",
                                    width: "100%",
                                },
                                caption: {
                                    marginBottom: "1rem",
                                },
                                month_grid: {
                                    width: "100%",
                                    maxWidth: "none",
                                },
                                day: {
                                    margin: "auto",
                                },
                                day_button: {
                                    placeSelf: "center",
                                },
                                selected: {
                                    border: '2px solid var(--heroui-primary)',
                                },
                                today: {
                                    color: 'red',
                                }
                                
                            }}
                            selected={selected}
                            onSelect={setSelected}
                        // footer={
                        //     selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                        // }
                        />
                    </CardBody>
                </Card>
                {/* <!-- Time Selection --> */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold leading-tight tracking-[-0.015em]">Select Start Time</h3>
                    <div className="relative w-full overflow-hidden">
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                            <button className="flex-none px-5 py-2.5 rounded-full border border-primary bg-content1 text-sm font-medium hover:border-primary/50 transition-colors">12:00 PM</button>
                            <button className="flex-none px-5 py-2.5 rounded-full border border-primary bg-content1 text-sm font-medium hover:border-primary/50 transition-colors">12:30 PM</button>
                            <button className="flex-none px-5 py-2.5 rounded-full border border-primary bg-content1 text-sm font-medium hover:border-primary/50 transition-colors">1:00 PM</button>
                            <button className="flex-none px-5 py-2.5 rounded-full border border-primary bg-content1 text-sm font-medium hover:border-primary/50 transition-colors">1:30 PM</button>
                            <button className="flex-none px-5 py-2.5 rounded-full bg-primary text-foreground text-sm font-medium shadow-md shadow-primary/30">2:00 PM</button>
                            <button className="flex-none px-5 py-2.5 rounded-full border border-primary bg-content1 text-sm font-medium hover:border-primary/50 transition-colors">2:30 PM</button>
                            <button className="flex-none px-5 py-2.5 rounded-full border border-primary bg-content1 text-sm font-medium hover:border-primary/50 transition-colors">3:00 PM</button>
                            <button className="flex-none px-5 py-2.5 rounded-full border border-primary bg-content1 text-sm font-medium hover:border-primary/50 transition-colors">3:30 PM</button>
                        </div>
                        {/* <!-- Fade effect on right --> */}
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f6f7f8] dark:from-[#101922] to-transparent pointer-events-none"></div>
                    </div>
                </div>
                {/* <!-- Duration Selection --> */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold leading-tight tracking-[-0.015em]">Duration</h3>
                    <div className="flex w-full rounded-xl bg-content1 p-1 shadow-sm border border-primary">
                        <button className="flex-1 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-foreground/10 transition-colors">1h</button>
                        <button className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-primary text-foreground shadow-sm">2h</button>
                        <button className="flex-1 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-foreground/10 transition-colors">3h</button>
                        <button className="flex-1 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-foreground/10 transition-colors">Custom</button>
                    </div>
                </div>
            </div>

            {/* <!-- Booking Summary & Action --> */}
            {/* <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-primary dark:border-[#2a3441]">
                <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                <div className="flex flex-col gap-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[#617589] dark:text-[#94a3b8]">Date</span>
                        <span className="font-semibold">Dec 5, 2023</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[#617589] dark:text-[#94a3b8]">Time</span>
                        <span className="font-semibold">2:00 PM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[#617589] dark:text-[#94a3b8]">Rate</span>
                        <span className="font-semibold">$15.00 / hr</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[#617589] dark:text-[#94a3b8]">Duration</span>
                        <span className="font-semibold">2 Hours</span>
                    </div>
                    <div className="h-px bg-[#e5e7eb] dark:bg-[#2a3441] my-1"></div>
                    <div className="flex justify-between items-center text-base font-bold">
                        <span>Total</span>
                        <span className="text-primary text-xl">$30.00</span>
                    </div>
                </div>
                <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/25">
                    <span>Confirm Booking</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <p className="text-xs text-center text-[#617589] dark:text-[#94a3b8] mt-4">
                    By confirming, you agree to our <a className="underline hover:text-primary" href="#">Terms of Service</a>.
                </p>
            </div> */}
        </div>
    )
}