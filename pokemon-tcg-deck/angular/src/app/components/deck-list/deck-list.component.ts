// src/app/components/deck-list/deck-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/tcg-models';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];
  loading = false;
  error = '';

  constructor(
    private deckService: DeckService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks(): void {
    this.loading = true;
    this.deckService.getAllDecks().subscribe({
      next: (decks) => {
        this.decks = decks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load decks';
        this.loading = false;
        console.error(err);
      }
    });
  }

  editDeck(deck: Deck): void {
    this.deckService.setCurrentDeck(deck);
    this.router.navigate(['/builder', deck._id]);
  }

  deleteDeck(deck: Deck): void {
    if (confirm(`Are you sure you want to delete "${deck.name}"?`)) {
      this.deckService.deleteDeck(deck._id!).subscribe({
        next: () => {
          this.decks = this.decks.filter(d => d._id !== deck._id);
        },
        error: (err) => {
          this.error = 'Failed to delete deck';
          console.error(err);
        }
      });
    }
  }

  createNewDeck(): void {
    this.router.navigate(['/builder']);
  }

  getDeckStats(deck: Deck): { pokemon: number; trainers: number; energy: number } {
    const pokemon = deck.cards?.filter(dc => dc.card.supertype === 'Pokémon').reduce((sum, dc) => sum + dc.quantity, 0) || 0;
    const trainers = deck.cards?.filter(dc => dc.card.supertype === 'Trainer').reduce((sum, dc) => sum + dc.quantity, 0) || 0;
    const energy = deck.cards?.filter(dc => dc.card.supertype === 'Energy').reduce((sum, dc) => sum + dc.quantity, 0) || 0;
    
    return { pokemon, trainers, energy };
  }

  getFormatBadgeClass(format: string): string {
  switch (format) {
    case 'standard': return 'bg-success';
    case 'expanded': return 'bg-primary';
    case 'unlimited': return 'bg-secondary';
    default: return 'bg-secondary';
  }
}

getFormattedDate(date: Date | string | undefined): string {
  if (!date) return 'Unknown';
  const d = new Date(date);
  return d.toLocaleDateString();
}

trackByCardId(index: number, deckCard: any): string {
  return deckCard.card.id;
}

}