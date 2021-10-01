export interface BaseItem{
    name:String;
    price: number;
    description: string;
    image: String
}

export interface Item extends BaseItem{
    id:number;
}