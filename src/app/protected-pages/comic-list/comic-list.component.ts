import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { UserService } from "src/app/shared/services/user.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import {
  RESPONSES,
  SNACKBAR_MESSAGES,
  PAGES,
} from "src/app/shared/utils/constant";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";

@Component({
  selector: "app-comic-list",
  templateUrl: "./comic-list.component.html",
  styleUrls: ["./comic-list.component.scss"],
})
export class ComicListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ["name", "real_name", "deck", "action"];
  dataSource: MatTableDataSource<any>;
  isLoading = false;

  totalPostsCount = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 1;

  comics: any[] = [];

  constructor(
    private userService: UserService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchAllComics();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllComics() {
    this.isLoading = true;
    this.userService.fetchAllComics().subscribe(
      (fetchedComics) => {
        this.dataSource.data = fetchedComics.results;
        console.log(this.dataSource.data);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.snackbar.show(error, RESPONSES.FAILED);
      }
    );
  }

  onPageChanged(event: PageEvent): void {
    this.isLoading = true;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
  }

  viewComicDetail(characterName: string) {
    // this.router.navigate([PAGES.VIEW_COMIC],{ name: characterName })
  }
}
