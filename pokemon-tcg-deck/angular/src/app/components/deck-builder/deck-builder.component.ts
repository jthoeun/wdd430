// src/app/components/deck-builder/deck-builder.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { Deck, Card, DeckCard } from '../../models/tcg-models';
import { Subscription } from 'rxjs';
import { CardSearchComponent } from '../card-search/card-search.component';

@Component({
  selector: 'app-deck-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, CardSearchComponent],
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.css']
})
export class DeckBuilderComponent implements OnInit, OnDestroy {
  currentDeck: Deck | null = null;
  showCardSearch = false;
  deckValidation: { valid: boolean; errors: string[] } = { valid: true, errors: [] };
  
  private subscription = new Subscription();

  constructor(
    private deckService: DeckService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.deckService.currentDeck$.subscribe(deck => {
        this.currentDeck = deck;
        if (deck) {
          this.validateDeck();
        }
      })
    );

    // Check if we're editing an existing deck
    const deckId = this.route.snapshot.paramMap.get('id');
    if (deckId) {
      this.loadDeck(deckId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadDeck(id: string): void {
    this.deckService.getDeck(id).subscribe({
      next: (deck) => {
        this.deckService.setCurrentDeck(deck);
      },
      error: (err) => {
        console.error('Failed to load deck:', err);
        alert('Failed to load deck');
      }
    });
  }

  createNewDeck(): void {
    const newDeck: Deck = {
      name: 'New Deck',
      description: '',
      format: 'standard',
      cards: []
    };
    this.deckService.setCurrentDeck(newDeck);
  }

  onCardSelected(card: Card): void {
    if (this.currentDeck) {
      const updatedDeck = this.deckService.addCardToDeck(this.currentDeck, card);
      this.deckService.setCurrentDeck(updatedDeck);
      this.validateDeck();
    }
  }

  addCard(deckCard: DeckCard): void {
    if (this.currentDeck) {
      const updatedDeck = this.deckService.addCardToDeck(this.currentDeck, deckCard.card, 1);
      this.deckService.setCurrentDeck(updatedDeck);
      this.validateDeck();
    }
  }

  removeCard(deckCard: DeckCard): void {
    if (this.currentDeck) {
      const updatedDeck = this.deckService.removeCardFromDeck(this.currentDeck, deckCard.card.id, 1);
      this.deckService.setCurrentDeck(updatedDeck);
      this.validateDeck();
    }
  }

  removeAllCopies(deckCard: DeckCard): void {
    if (this.currentDeck) {
      const updatedDeck = this.deckService.removeCardFromDeck(this.currentDeck, deckCard.card.id, deckCard.quantity);
      this.deckService.setCurrentDeck(updatedDeck);
      this.validateDeck();
    }
  }

  saveDeck(): void {
    if (!this.currentDeck) return;

    if (this.currentDeck._id) {
      this.deckService.updateDeck(this.currentDeck._id, this.currentDeck).subscribe({
        next: (savedDeck) => {
          this.deckService.setCurrentDeck(savedDeck);
          alert('Deck saved successfully!');
        },
        error: (err) => {
          console.error('Failed to save deck:', err);
          alert('Failed to save deck');
        }
      });
    } else {
      this.deckService.createDeck(this.currentDeck).subscribe({
        next: (savedDeck) => {
          this.deckService.setCurrentDeck(savedDeck);
          alert('Deck created successfully!');
          this.router.navigate(['/builder', savedDeck._id]);
        },
        error: (err) => {
          console.error('Failed to create deck:', err);
          alert('Failed to create deck');
        }
      });
    }
  }

  getTotalCards(): number {
    return this.currentDeck ? this.deckService.getTotalCards(this.currentDeck) : 0;
  }

  getPokemonCards(): DeckCard[] {
    return this.currentDeck ? this.deckService.getCardsByType(this.currentDeck, 'Pokémon') : [];
  }

  getTrainerCards(): DeckCard[] {
    return this.currentDeck ? this.deckService.getCardsByType(this.currentDeck, 'Trainer') : [];
  }

  getEnergyCards(): DeckCard[] {
    return this.currentDeck ? this.deckService.getCardsByType(this.currentDeck, 'Energy') : [];
  }

  private validateDeck(): void {
    if (this.currentDeck) {
      this.deckValidation = this.deckService.isDeckValid(this.currentDeck);
    }
  }
  // Helper methods for template calculations
getPokemonCardCount(): number {
  return this.getPokemonCards().reduce((sum, dc) => sum + dc.quantity, 0);
}

getTrainerCardCount(): number {
  return this.getTrainerCards().reduce((sum, dc) => sum + dc.quantity, 0);
}

getEnergyCardCount(): number {
  return this.getEnergyCards().reduce((sum, dc) => sum + dc.quantity, 0);
}

}