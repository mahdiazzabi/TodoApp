import { Component } from '@angular/core';

import { SharedListPage } from '../shared-list/shared-list';
import { HomePage } from '../home/home';
import { ProfileUserPage } from '../profile-user/profile-user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SharedListPage;
  tab3Root = ProfileUserPage;

  constructor() {

  }
}
