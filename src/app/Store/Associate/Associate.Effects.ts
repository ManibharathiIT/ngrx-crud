import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import { addassociate, addassociatesuccess, deleteassociate, deleteassociatesuccess, getassociate, getassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess, updateassociate, updateassociatesuccess } from "./Associate.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";

@Injectable()
export class AssociateEffects{
    constructor(private action$:Actions,private service:AssociateService){

    }

    _loadassociate=createEffect(()=>
        this.action$.pipe(
            ofType(loadassociate),
            exhaustMap(()=>{
                return this.service.GetAll().pipe(
                    map((data)=>{
                        return loadassociatesuccess({list:data})
                    }),
                    catchError((_error)=>of(loadassociatefail({errormessage:_error.message})))
                )
            })
        )
    )   

    _addassociate=createEffect(()=>
        this.action$.pipe(
            ofType(addassociate),
            switchMap((action)=>{
                return this.service.Create(action.inputdata).pipe(
                    switchMap(()=>{
                        return of(addassociatesuccess({inputdata:action.inputdata}),
                        showalert({message:'Created Succesfully',resulttype:'pass'}))
                    }),
                    catchError((_error)=>of(showalert({message:'failed to create associate',resulttype:'fail'})))
                )
            })
        )
    )

    _updateassociate=createEffect(()=>
        this.action$.pipe(
            ofType(updateassociate),
            switchMap((action)=>{
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data)=>{
                        return of(updateassociatesuccess({inputdata:action.inputdata}),
                        showalert({message:'Update Succesfully',resulttype:'pass'}))
                    }),
                    catchError((_error)=>of(showalert({message:'failed to update associate',resulttype:'fail'})))
                )
            })
        )
    )

    _deleteassociate=createEffect(()=>
        this.action$.pipe(
            ofType(deleteassociate),
            switchMap((action)=>{
                 return this.service.Delete(action.code)
                .pipe(
                    switchMap(()=>{
                        return of(deleteassociatesuccess({code:action.code}),
                        showalert({message:'Deleted Succesfully',resulttype:'pass'}))
                    }),
                    catchError((_error)=>of(showalert({message:'failed to delete associate',resulttype:'fail'})))
                )
            })
        )
    )


    _getassociate=createEffect(()=>
        this.action$.pipe(
            ofType(getassociate),
            exhaustMap((action)=>{
                return this.service.Getbycode(action.id).pipe(
                    map((data)=>{
                        return getassociatesuccess({obj:data})
                    }),
                    catchError((_error)=>of(showalert({message:'failed to Fatch data',resulttype:'fail'})))
                )
            })
        )
    )

}
