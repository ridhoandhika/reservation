"use client";

import RoomService from "@/services/room-service";
import { GetRoomResp, Room } from "@/entity/RoomResp";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Room() {
    const { roomId } = usePage().props
    const [room, setRoom] = useState<Room>();

    useEffect(() => {
        RoomService.getDetailRoom((roomId ?? "") as string).then((response: GetRoomResp) => {
            console.log("Room detail response:", typeof response.output.room.pricePerHour);

            setRoom(response.output.room);
        }).catch((error) => {
            console.error("Error fetching room details:", error);
        });
    }, [roomId]);

    return (
        <div className="text-foreground">
            <h1 className="text-3xl font-bold">{room?.name}</h1>
            <p className="text-lg">{room?.pricePerHour.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} /hr</p>
        </div>
    )
}