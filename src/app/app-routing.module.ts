import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./shared/guards/authentication.guard";
import { PublicHomeComponent } from "./public-pages/public-home.component";
import { LoginComponent } from "./public-pages/login/login.component";
import { ProtectedHomeComponent } from "./protected-pages/protected-home.component";

const routes: Routes = [
  {
    path: "",
    component: ProtectedHomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "comics",
        loadChildren: () =>
          import("./protected-pages/comic-list/comic-list.module").then(
            (m) => m.ComicListModule
          ),
      },
    ],
  },
  {
    path: "public",
    component: PublicHomeComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "login", component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
