import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FoodService } from '../Models/food.Service';
import { Food } from '../Models/food';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
})
export class BoardUserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | any;

  food!: Food[];
  searchTerm!: string;
  action!: string;
  public selectedFile: any;
  content!: string;

  constructor(
    private foodService: FoodService,
    private activedRoute: ActivatedRoute,
    private userService: UserService
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
  }
}
