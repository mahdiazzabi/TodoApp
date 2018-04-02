import { Component } from '@angular/core';

import { SharedListPage } from '../shared-list/shared-list';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SharedListPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
