import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { environment } from "src/environments/environment";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { RESPONSES } from "src/app/shared/utils/constant";

@Component({
  selector: "app-comic-detail",
  templateUrl: "./comic-detail.component.html",
  styleUrls: ["./comic-detail.component.scss"],
})
export class ComicDetailComponent implements OnInit {
  url: string;
  isLoading = false;
  comicDetail: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((data: any) => {
      if (data && data.url) {
        this.url = data.url;
      }
      if (this.url) {
        this.fetchComicDetail();
      }
    });
  }

  fetchComicDetail() {
    this.isLoading = true;
    this.userService.fetchComicDetail(this.url).subscribe(
      (fetchedComic) => {
        this.comicDetail = fetchedComic.results;
        console.log(this.comicDetail);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.snackbar.show(error, RESPONSES.FAILED);
      }
    );
  }
}
