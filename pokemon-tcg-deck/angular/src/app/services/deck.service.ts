// src/app/services/deck.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Deck, DeckCard, Card } from '../models/tcg-models';
import { MOCK_DECKS } from '../components/deck-list/MOCK-DECKS';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = 'http://localhost:3000/api/decks';
  private currentDeckSubject = new BehaviorSubject<Deck | null>(null);
  public currentDeck$ = this.currentDeckSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllDecks(): Observable<Deck[]> {
    // TODO: Uncomment when backend is ready
    // return this.http.get<Deck[]>(this.apiUrl);
    
    // MOCK DATA - Remove when backend is ready
    return of(MOCK_DECKS);
  }

  getDeck(id: string): Observable<Deck> {
    // TODO: Uncomment when backend is ready
    // return this.http.get<Deck>(`${this.apiUrl}/${id}`);
    
    // MOCK DATA - Remove when backend is ready
    return new Observable(observer => {
      const deck = MOCK_DECKS.find(d => d._id === id);
      if (deck) {
        observer.next(deck);
      } else {
        observer.error('Deck not found');
      }
      observer.complete();
    });
  }

  createDeck(deck: Deck): Observable<Deck> {
    // TODO: Uncomment when backend is ready
    // return this.http.post<Deck>(this.apiUrl, deck);
    
    // MOCK DATA - Remove when backend is ready
    const newDeck = { 
      ...deck, 
      _id: `deck-${Date.now()}`,
      totalCards: this.getTotalCards(deck),
      isValid: this.isDeckValid(deck).valid,
      validationErrors: this.isDeckValid(deck).errors,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    MOCK_DECKS.push(newDeck);
    return of(newDeck);
  }

  updateDeck(id: string, deck: Deck): Observable<Deck> {
    // TODO: Uncomment when backend is ready
    // return this.http.put<Deck>(`${this.apiUrl}/${id}`, deck);
    
    // MOCK DATA - Remove when backend is ready
    const index = MOCK_DECKS.findIndex(d => d._id === id);
    if (index !== -1) {
      const updatedDeck = { 
        ...deck, 
        _id: id,
        totalCards: this.getTotalCards(deck),
        isValid: this.isDeckValid(deck).valid,
        validationErrors: this.isDeckValid(deck).errors,
        updatedAt: new Date() 
      };
      MOCK_DECKS[index] = updatedDeck;
      return of(updatedDeck);
    }
    return new Observable(observer => {
      observer.error('Deck not found');
    });
  }

  deleteDeck(id: string): Observable<any> {
    // TODO: Uncomment when backend is ready
    // return this.http.delete(`${this.apiUrl}/${id}`);
    
    // MOCK DATA - Remove when backend is ready
    const index = MOCK_DECKS.findIndex(d => d._id === id);
    if (index !== -1) {
      MOCK_DECKS.splice(index, 1);
      return of({ message: 'Deck deleted successfully' });
    }
    return new Observable(observer => {
      observer.error('Deck not found');
    });
  }

  setCurrentDeck(deck: Deck | null): void {
    this.currentDeckSubject.next(deck);
  }

  getCurrentDeck(): Deck | null {
    return this.currentDeckSubject.value;
  }

  addCardToDeck(deck: Deck, card: Card, quantity: number = 1): Deck {
    const existingCard = deck.cards.find(dc => dc.card.id === card.id);
    
    if (existingCard) {
      existingCard.quantity = Math.min(existingCard.quantity + quantity, this.getMaxAllowed(card));
    } else {
      deck.cards.push({
        card,
        quantity: Math.min(quantity, this.getMaxAllowed(card))
      });
    }
    
    return { ...deck };
  }

  removeCardFromDeck(deck: Deck, cardId: string, quantity: number = 1): Deck {
    const cardIndex = deck.cards.findIndex(dc => dc.card.id === cardId);
    
    if (cardIndex !== -1) {
      deck.cards[cardIndex].quantity -= quantity;
      if (deck.cards[cardIndex].quantity <= 0) {
        deck.cards.splice(cardIndex, 1);
      }
    }
    
    return { ...deck };
  }

  getTotalCards(deck: Deck): number {
    return deck.cards.reduce((total, deckCard) => total + deckCard.quantity, 0);
  }

  getCardsByType(deck: Deck, supertype: string): DeckCard[] {
    return deck.cards.filter(dc => dc.card.supertype === supertype);
  }

  private getMaxAllowed(card: Card): number {
    // ACE SPEC and Radiant cards are limited to 1
    if (card.subtypes && (card.subtypes.includes('ACE SPEC') || card.subtypes.includes('Radiant'))) {
      return 1;
    }
    // Basic energy cards can have unlimited copies
    if (card.supertype === 'Energy' && card.subtypes && card.subtypes.includes('Basic')) {
      return 99; // Effectively unlimited
    }
    // All other cards limited to 4 copies
    return 4;
  }

  isDeckValid(deck: Deck): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const totalCards = this.getTotalCards(deck);
    
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


  /**
   * Get mock decks for testing
   */
  getMockDecks(): Deck[] {
    return MOCK_DECKS;
  }
}