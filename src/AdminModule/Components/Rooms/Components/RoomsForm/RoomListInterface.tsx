export interface ICreateRoom{
    roomNumber:string,
    discount:string,
    price:string,
    capacity:string,
    images:FileList
    facilities:string[]
}
export interface IRooms {
    rooms: ICreateRoom[];
   
  }