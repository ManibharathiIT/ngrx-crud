import { group } from '@angular/animations';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addassociate, updateassociate } from 'src/app/Store/Associate/Associate.Action';
import { Associates } from 'src/app/Store/Model/Associate.model';
import { getassociate } from 'src/app/Store/Associate/Associate.Selectors';
import { count } from 'rxjs';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  title = "Create Associate"
  isedit = false;
  

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {

  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.store.select(getassociate).subscribe(res => {
      this.associateform.setValue({
        id: res.id, name: res.name, email: res.email, phone: res.phone
      })
    })
  }
  ClosePopup() {
    this.ref.close();
  }

  associateform = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required)
  })

  SaveAssociate() {
    if (this.associateform.valid) {
      const obj: Associates = {
        id: this.associateform.value.id,
        name: this.associateform.value.name as string,
        email: this.associateform.value.email as string,
        phone: this.associateform.value.phone as string,
      }
      console.log( count);
      if(obj.id==0){
      this.store.dispatch(addassociate({ inputdata: obj }))
      }else{
        this.store.dispatch(updateassociate({inputdata:  obj}))
      }
        this.ClosePopup();
    }
  }
}
