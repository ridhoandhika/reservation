import { ApiResponse } from "@/types/api-response";

export interface GetRoomsResp extends ApiResponse<RoomsResponse> { }
export interface GetRoomResp extends ApiResponse<RoomResponse> { }

export interface RoomsResponse {
    attributes: {
        total: number;
        perPage: number;
        currentPage: number;
    };
    rooms: Room[];
}

export interface RoomResponse {
    room: Room;
}

export interface Room {
    id: string;
    name: string;
    type: string;
    consoles: {
        id: number;
        type: string;
    }[];
    playstationType: string;
    pricePerHour: number;
    files: {
        id: number;
        image: string;
    }[];
}