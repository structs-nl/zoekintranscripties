import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './views/search/search.component';
import { DocumentComponent } from './views/document/document.component';
import { ScanComponent } from './views/scan/scan.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { AboutComponent } from './views/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
  {
    path: 'zoeken',
    component: SearchComponent,
  },
  {
    path: 'zoeken',
    component: DocumentComponent,
    children: [
      {
        path: 'scan',
        component: ScanComponent,
      },
      {
        path: 'document',
        component: InventoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
