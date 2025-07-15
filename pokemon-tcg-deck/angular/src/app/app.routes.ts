import { Routes } from '@angular/router';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckBuilderComponent } from './components/deck-builder/deck-builder.component';

export const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'decks', component: DeckListComponent },
  { path: 'builder', component: DeckBuilderComponent },
  { path: 'builder/:id', component: DeckBuilderComponent }
];