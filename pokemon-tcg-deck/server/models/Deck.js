const mongoose = require('mongoose');

const deckCardSchema = new mongoose.Schema({
  card: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    supertype: { 
      type: String, 
      required: true,
      enum: ['Pokémon', 'Trainer', 'Energy']
    },
    subtypes: [String],
    level: String,
    hp: String,
    types: [String],
    evolvesFrom: String,
    evolvesTo: [String],
    rules: [String],
    attacks: [{
      name: String,
      cost: [String],
      convertedEnergyCost: Number,
      damage: String,
      text: String
    }],
    weaknesses: [{
      type: String,
      value: String
    }],
    resistances: [{
      type: String,
      value: String
    }],
    retreatCost: [String],
    convertedRetreatCost: Number,
    set: {
      id: String,
      name: String,
      series: String,
      printedTotal: Number,
      total: Number,
      legalities: {
        unlimited: String,
        standard: String,
        expanded: String
      },
      ptcgoCode: String,
      releaseDate: String,
      updatedAt: String,
      images: {
        symbol: String,
        logo: String
      }
    },
    number: String,
    artist: String,
    rarity: String,
    flavorText: String,
    nationalPokedexNumbers: [Number],
    legalities: {
      unlimited: String,
      standard: String,
      expanded: String
    },
    images: {
      small: { type: String, required: true },
      large: { type: String, required: true }
    },
    tcgplayer: {
      url: String,
      updatedAt: String,
      prices: mongoose.Schema.Types.Mixed
    },
    cardmarket: {
      url: String,
      updatedAt: String,
      prices: mongoose.Schema.Types.Mixed
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  }
});

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500,
    default: ''
  },
  format: {
    type: String,
    required: true,
    enum: ['standard', 'expanded', 'unlimited'],
    default: 'standard'
  },
  cards: [deckCardSchema],
  totalCards: {
    type: Number,
    default: 0
  },
  isValid: {
    type: Boolean,
    default: false
  },
  validationErrors: [String]
}, {
  timestamps: true
});

// Pre-save middleware to calculate deck statistics
deckSchema.pre('save', function(next) {
  this.totalCards = this.cards.reduce((total, deckCard) => total + deckCard.quantity, 0);
  
  // Validate deck
  const validation = this.validateDeck();
  this.isValid = validation.valid;
  this.validationErrors = validation.errors;
  
  next();
});

// Instance method to validate deck
deckSchema.methods.validateDeck = function() {
  const errors = [];
  
  // Check total card count (should be 60 for standard play)
  if (this.totalCards !== 60) {
    errors.push(`Deck must have exactly 60 cards (currently has ${this.totalCards})`);
  }
  
  // Check card limits
  this.cards.forEach(deckCard => {
    const maxAllowed = this.getMaxAllowed(deckCard.card);
    
    if (deckCard.quantity > maxAllowed) {
      errors.push(`Too many copies of ${deckCard.card.name} (max ${maxAllowed})`);
    }
  });
  
  // Check ACE SPEC rule (max 1 total)
  const aceSpecCards = this.cards.filter(dc => 
    dc.card.subtypes && dc.card.subtypes.includes('ACE SPEC')
  );
  if (aceSpecCards.length > 1) {
    errors.push('Deck can only contain 1 ACE SPEC card');
  }
  
  // Check Radiant rule (max 1 total)
  const radiantCards = this.cards.filter(dc => 
    dc.card.subtypes && dc.card.subtypes.includes('Radiant')
  );
  if (radiantCards.length > 1) {
    errors.push('Deck can only contain 1 Radiant Pokémon');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Helper method to get max allowed copies
deckSchema.methods.getMaxAllowed = function(card) {
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
};

// Instance method to get cards by type
deckSchema.methods.getCardsByType = function(supertype) {
  return this.cards.filter(deckCard => deckCard.card.supertype === supertype);
};

// Instance method to get deck statistics
deckSchema.methods.getStats = function() {
  const pokemon = this.getCardsByType('Pokémon');
  const trainers = this.getCardsByType('Trainer');
  const energy = this.getCardsByType('Energy');
  
  return {
    totalCards: this.totalCards,
    pokemon: {
      count: pokemon.reduce((sum, dc) => sum + dc.quantity, 0),
      unique: pokemon.length
    },
    trainers: {
      count: trainers.reduce((sum, dc) => sum + dc.quantity, 0),
      unique: trainers.length
    },
    energy: {
      count: energy.reduce((sum, dc) => sum + dc.quantity, 0),
      unique: energy.length
    }
  };
};

module.exports = mongoose.model('Deck', deckSchema);