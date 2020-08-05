import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ComicListComponent } from "./comic-list.component";
import { ComicListRoutingModule } from "./comic-list.routing.module";
import { ComicDetailComponent } from "./comic-detail.component";
@NgModule({
  declarations: [ComicListComponent, ComicDetailComponent],
  imports: [CommonModule, SharedModule, ComicListRoutingModule],
})
export class ComicListModule {}
