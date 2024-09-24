export interface Associates{
    id:any,
    name:string,
    email:string,
    phone:string
}

export interface AssociateModel{
    list:Associates[],
    associateobj:Associates,
    errormessage:string
}