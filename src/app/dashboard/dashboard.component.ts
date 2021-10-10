import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../service/dashboard.service';
import {SelectionModel} from '@angular/cdk/collections';
// import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource : any;

  // Sorting
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined
  
  constructor(public dashboardService : DashboardService ) { }

  selection = new SelectionModel<PeriodicElement>(true, []);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dashboardService.getdashboard());
    this.dataSource.sort = this.sort
  }

  // Search
  filterValue:any;
  applyFilter(event: any) {
    this.filterValue = event.target.value.trim()
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  // Checkbox
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row :any) => this.selection.select(row));
  }

  // signout
  // signOut(){
  //   this.toast.success("Logout Succesfully")
  // }

  // logSelection(): void {
  //   this.selection.selected.forEach(s => console.log(s.name));
  // }

}
