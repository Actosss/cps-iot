import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from 'src/app/Models/food';
import { BoardAdminComponent } from '../board-admin.component';
import { DialogService } from '../dialog/dialog.service';
const API_URL = 'http://localhost:8080/api/images/delete/food/';
@Injectable()
@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css'],
})
export class AdminDialogComponent implements OnInit {
  @Output() foodAddedEvent = new EventEmitter();
  selectedFile: any;
  imgURL: any;
  foodsRecieved: Array<Food> | any;
  formData: File | any;
  status: string | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      imageUrl: string;
      text: string;
      title: string;
      tag: string;
    },
    public dialogRef: MatDialogRef<BoardAdminComponent>,
    private http: HttpClient,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}
  //Change Files
  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  updateFood() {
    if (this.selectedFile != null) {
      const imageFile = new FormData();
      imageFile.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;
      console.log(imageFile);

      this.dialogService.addUploadData(imageFile).subscribe((response) => {
        this.dialogService.addFood(this.data).subscribe((data) => {
          this.foodAddedEvent.emit();
          this.dialogRef.close(AdminDialogComponent);
        });
        console.log('Image uploaded successfully');
      });
    } else {
      this.dialogService.addFood(this.data).subscribe((data) => {
        this.foodAddedEvent.emit();
        this.dialogRef.close(AdminDialogComponent);
      });
      console.log('Image uploaded successfully');
    }
  }
  deleteFood() {
    const id = this.data.id;
    console.log(this.data);
    this.http
      .delete(API_URL + id)
      .subscribe(() => (this.status = 'Delete successful'));
    this.dialogRef.close(BoardAdminComponent);
  }
}
