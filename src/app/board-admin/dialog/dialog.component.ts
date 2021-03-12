import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardFoodComponent } from '../../board-food/board-food.component';
import { DialogService } from './dialog.service';
import { Food } from '../../Models/food';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Output() foodAddedEvent = new EventEmitter();

  public food: Food = {
    id: '',
    imageUrl: '',
    text: '',
    title: '',
    tag: '',
  };

  private selectedFile: any;
  imgURL: any;
  foodsRecieved: Array<Food> | any;
  formData: File | any;

  constructor(
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<BoardFoodComponent>
  ) {}

  ngOnInit() {}
  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  saveFood() {
    const imageFile = new FormData();
    imageFile.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;
    console.log(imageFile);
    this.dialogService.addUploadData(imageFile).subscribe((response) => {
      this.dialogService.addFood(this.food).subscribe((food) => {
        this.foodAddedEvent.emit();
        this.dialogRef.close(DialogComponent);
      });
      console.log('Image uploaded successfully');
    });
  }
}
