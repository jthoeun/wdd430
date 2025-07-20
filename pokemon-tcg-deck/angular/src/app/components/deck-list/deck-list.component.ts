import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
    this.error = '';
    
    this.deckService.getAllDecks().subscribe({
      next: (decks) => {
        this.decks = decks;
        this.loading = false;
        console.log('✅ Loaded decks from backend:', decks.length);
      },
      error: (err) => {
        this.error = 'Failed to load decks from backend. Make sure the backend server is running on port 3000.';
        this.loading = false;
        console.error('❌ Backend connection error:', err);
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
          console.log('✅ Deck deleted');
        },
        error: (err) => {
          this.error = 'Failed to delete deck';
          console.error('❌ Delete error:', err);
        }
      });
    }
  }

  createNewDeck(): void {
    this.router.navigate(['/builder']);
  }

  // Helper methods for template
  getDeckStats(deck: Deck): { pokemon: number; trainers: number; energy: number } {
    if (!deck.cards) {
      return { pokemon: 0, trainers: 0, energy: 0 };
    }
    
    const pokemon = deck.cards.filter(dc => dc.card.supertype === 'Pokémon').reduce((sum, dc) => sum + dc.quantity, 0);
    const trainers = deck.cards.filter(dc => dc.card.supertype === 'Trainer').reduce((sum, dc) => sum + dc.quantity, 0);
    const energy = deck.cards.filter(dc => dc.card.supertype === 'Energy').reduce((sum, dc) => sum + dc.quantity, 0);
    
    return { pokemon, trainers, energy };
  }

  getTotalCards(deck: Deck): number {
    return deck.totalCards || 0;
  }

  isDeckValid(deck: Deck): boolean {
    return deck.isValid ?? true;
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