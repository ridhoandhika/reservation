import { GetRoomResp, GetRoomsResp } from '@/entity/RoomResp'
import BaseService from './base-service'

interface RoomServiceInterface {
  getListRoom(): Promise<GetRoomsResp>
  getDetailRoom(id: string): Promise<GetRoomResp>
}

class RoomService extends BaseService implements RoomServiceInterface {
  constructor() {
    super('/rooms')
  }

  getListRoom(): Promise<GetRoomsResp> {
    return this.get<GetRoomsResp>()
  }

  getDetailRoom(id: string): Promise<GetRoomResp> {
    return this.getById<GetRoomResp>(id)
  }
}

export default new RoomService()
