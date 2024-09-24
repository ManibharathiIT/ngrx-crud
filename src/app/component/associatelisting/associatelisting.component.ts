import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/Store/Model/Associate.model';
import { deleteassociate, getassociate, loadassociate, openpopup } from 'src/app/Store/Associate/Associate.Action';
import { getassociatelist } from 'src/app/Store/Associate/Associate.Selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { visitAll } from '@angular/compiler';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {
    Associatelist!:Associates[];
    datasource:any;
    @ViewChild(MatPaginator) paginator!:MatPaginator;
    @ViewChild(MatSort) sort!:MatSort;
    displayedColumns:String[]=["code","name","email","phone","action"];
    constructor(private dialog:MatDialog,private store:Store){

    }
    ngOnInit(): void {  
      this.store.dispatch(loadassociate());
      this.store.select(getassociatelist).subscribe(item=>{
        this.Associatelist=item;
        this.datasource=new MatTableDataSource<Associates>(this.Associatelist);
        this.datasource.paginator=this.paginator;
        this.datasource.sort=this.sort;
      })
    }

    FunctionAdd(){
      this.OpenPopup(2,'Create Associate');
      
    } 

    FunctionEdit(code:number){
      this.OpenPopup(code,'Update Associate');
      this.store.dispatch(getassociate({id:code}));
    }

    FunctionDelete(code:number){
      // this.OpenPopup(0,'D  elete Associate');
      if(confirm('do you want to remove ?')){
        this.store.dispatch(deleteassociate({code:code}));  
      }
    }

    OpenPopup(code:number,title:string){
      this.store.dispatch(openpopup()); 
      this.dialog.open(AddComponent,{
        width:'50%',
        enterAnimationDuration:'100ms',
        exitAnimationDuration:'100ms',
        data:{
          code:code,
          title:title
        }
      })
    }

}
