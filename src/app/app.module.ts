import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FestivalViewComponent } from "./festival-view/festival-view.component";

@NgModule({
  declarations: [AppComponent, FestivalViewComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HttpClientJsonpModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FestivalViewComponent]
})
export class AppModule {}
