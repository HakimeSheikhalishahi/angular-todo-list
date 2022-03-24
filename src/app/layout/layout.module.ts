import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const DECLERATION = [MainFooterComponent, FooterComponent, MainLayoutComponent, ToolbarComponent];
@NgModule({
  declarations: [DECLERATION],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [DECLERATION]
})
export class LayoutModule { }
