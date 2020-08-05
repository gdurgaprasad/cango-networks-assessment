import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ComicListComponent } from "./comic-list.component";
import { ComicDetailComponent } from "./comic-detail.component";

const routes: Routes = [
  {
    path: "",
    component: ComicListComponent,
    pathMatch: "full",
  },
  {
    path: "view-comic",
    component: ComicDetailComponent,
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicListRoutingModule {}
