import {
  Component,
  Inject,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FoodService } from '../Models/food.Service';
import { Food } from '../Models/food';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { TokenStorageService } from '../_services/token-storage.service';
import { DialogComponent } from '../board-admin/dialog/dialog.component';
import { AdminDialogComponent } from '../board-admin/admin-dialog-update/admin-dialog.component';
@Injectable()
@Component({
  selector: 'app-board-food',
  templateUrl: './board-food.component.html',
  styleUrls: ['./board-food.component.css'],
})
export class BoardFoodComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | any;

  food!: Food[] | any;
  searchTerm!: string;
  action!: string;
  public selectedFile: any;
  content!: string;
  ifLogedAsAdmin = false;
  isLoggedIn = false;
  username?: string;
  private roles: string[] = [];
  showAdminBoard = false;
  tags = ['Ingredients', 'SuperFoods', 'Fruits', 'Recipes'];
  constructor(
    private foodService: FoodService,
    private activedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    public dialog: MatDialog,
    public adminDialog: MatDialog
  ) {}
  dataSource: MatTableDataSource<Food> = new MatTableDataSource<Food>();

  loadData() {
    this.foodService
      .getFood()
      .subscribe((response) => this.handleSuccessfulResponse(response));
    this.activedRoute.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action = params['action'];
    });
  }

  handleSuccessfulResponse(response: Food[]) {
    this.food = response;
  }
  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.foodService.getFood().subscribe((data) => {
      this.food = data;
      this.dataSource.paginator = this.paginator;
    });
    this.loadData();

    this.ifLogedAsAdmin = !!this.tokenStorageService.getToken();
    if (this.ifLogedAsAdmin) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.ifLogedAsAdmin = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400',
      height: '600',
    });
  }
  editFood(f: Food) {
    this.adminDialog.open(AdminDialogComponent, {
      width: '400',
      height: '600',
      data: {
        id: f.id,
        imageUrl: f.imageUrl,
        text: f.text,
        title: f.title,
        tag: f.tag,
      },
    });
  }
  showDataByTag(tag: string) {
    this.foodService.getFoodsByTag(tag).subscribe((data) => {
      this.food = data;
      this.dataSource.paginator = this.paginator;
    });
  }
}
