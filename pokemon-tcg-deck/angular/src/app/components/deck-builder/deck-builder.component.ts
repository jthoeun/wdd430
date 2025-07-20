import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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

  // Use inject() function instead of constructor injection
  private deckService = inject(DeckService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.subscription.add(
      this.deckService.currentDeck$.subscribe((deck: Deck | null) => {
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
      next: (deck: Deck) => {
        this.deckService.setCurrentDeck(deck);
      },
      error: (err: any) => {
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
        next: (savedDeck: Deck) => {
          this.deckService.setCurrentDeck(savedDeck);
          alert('Deck saved successfully!');
        },
        error: (err: any) => {
          console.error('Failed to save deck:', err);
          alert('Failed to save deck');
        }
      });
    } else {
      this.deckService.createDeck(this.currentDeck).subscribe({
        next: (savedDeck: Deck) => {
          this.deckService.setCurrentDeck(savedDeck);
          alert('Deck created successfully!');
          this.router.navigate(['/builder', savedDeck._id]);
        },
        error: (err: any) => {
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

  getPokemonCardCount(): number {
    return this.getPokemonCards().reduce((sum, dc) => sum + dc.quantity, 0);
  }

  getTrainerCardCount(): number {
    return this.getTrainerCards().reduce((sum, dc) => sum + dc.quantity, 0);
  }

  getEnergyCardCount(): number {
    return this.getEnergyCards().reduce((sum, dc) => sum + dc.quantity, 0);
  }

  private validateDeck(): void {
    if (this.currentDeck) {
      this.deckValidation = this.isDeckValid(this.currentDeck);
    }
  }

  // Local deck validation method
  private isDeckValid(deck: Deck): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const totalCards = this.deckService.getTotalCards(deck);
    
    // Standard deck size is 60 cards
    if (totalCards !== 60) {
      errors.push(`Deck must have exactly 60 cards (currently has ${totalCards})`);
    }
    
    // Check card limits
    deck.cards.forEach(deckCard => {
      const maxAllowed = this.getMaxAllowed(deckCard.card);
      if (deckCard.quantity > maxAllowed) {
        errors.push(`Too many copies of ${deckCard.card.name} (max ${maxAllowed})`);
      }
    });

    // Check ACE SPEC rule (max 1 total)
    const aceSpecCards = deck.cards.filter(dc => 
      dc.card.subtypes && dc.card.subtypes.includes('ACE SPEC')
    );
    if (aceSpecCards.length > 1) {
      errors.push('Deck can only contain 1 ACE SPEC card');
    }

    // Check Radiant rule (max 1 total)
    const radiantCards = deck.cards.filter(dc => 
      dc.card.subtypes && dc.card.subtypes.includes('Radiant')
    );
    if (radiantCards.length > 1) {
      errors.push('Deck can only contain 1 Radiant Pokémon');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Helper method to get max allowed copies
  private getMaxAllowed(card: Card): number {
    // ACE SPEC and Radiant cards are limited to 1
    if (card.subtypes && (card.subtypes.includes('ACE SPEC') || card.subtypes.includes('Radiant'))) {
      return 1;
    }
    // Basic energy cards can have unlimited copies
    if (card.supertype === 'Energy' && card.subtypes && card.subtypes.includes('Basic')) {
      return 99;
    }
    // All other cards limited to 4 copies
    return 4;
  }
}