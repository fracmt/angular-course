import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ServersComponent } from "./servers/servers.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UsersComponent }],
  },
  {
    path: "servers",
    //canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ":id", component: ServersComponent },
      {
        path: ":id/edit",
        component: ServersComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  //{ path: "not-found", component: PageNotFoundComponent },
  { path: "not-found", component: ErrorPageComponent, data: { message: 'Page not found!'} },
  { path: "**", redirectTo: "/not-found" },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
