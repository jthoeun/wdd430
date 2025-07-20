const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');

// Helper function to clean card data
function cleanCardData(cards) {
  if (!cards || !Array.isArray(cards)) {
    return cards;
  }
  
  cards.forEach(deckCard => {
    if (deckCard.card) {
      // Handle weaknesses
      if (deckCard.card.weaknesses) {
        if (typeof deckCard.card.weaknesses === 'string') {
          try {
            deckCard.card.weaknesses = JSON.parse(deckCard.card.weaknesses);
          } catch (e) {
            console.warn('Failed to parse weaknesses, setting to empty array');
            deckCard.card.weaknesses = [];
          }
        }
        // Ensure it's an array
        if (!Array.isArray(deckCard.card.weaknesses)) {
          deckCard.card.weaknesses = [];
        }
      }
      
      // Handle resistances
      if (deckCard.card.resistances) {
        if (typeof deckCard.card.resistances === 'string') {
          try {
            deckCard.card.resistances = JSON.parse(deckCard.card.resistances);
          } catch (e) {
            console.warn('Failed to parse resistances, setting to empty array');
            deckCard.card.resistances = [];
          }
        }
        // Ensure it's an array
        if (!Array.isArray(deckCard.card.resistances)) {
          deckCard.card.resistances = [];
        }
      }
      
      // Handle other array fields that might be strings
      const arrayFields = ['subtypes', 'types', 'evolvesTo', 'rules', 'retreatCost', 'nationalPokedexNumbers'];
      arrayFields.forEach(field => {
        if (deckCard.card[field] && typeof deckCard.card[field] === 'string') {
          try {
            deckCard.card[field] = JSON.parse(deckCard.card[field]);
          } catch (e) {
            console.warn(`Failed to parse ${field}, setting to empty array`);
            deckCard.card[field] = [];
          }
        }
        if (deckCard.card[field] && !Array.isArray(deckCard.card[field])) {
          deckCard.card[field] = [];
        }
      });
      
      // Handle attacks array
      if (deckCard.card.attacks && typeof deckCard.card.attacks === 'string') {
        try {
          deckCard.card.attacks = JSON.parse(deckCard.card.attacks);
        } catch (e) {
          console.warn('Failed to parse attacks, setting to empty array');
          deckCard.card.attacks = [];
        }
      }
      if (deckCard.card.attacks && !Array.isArray(deckCard.card.attacks)) {
        deckCard.card.attacks = [];
      }
    }
  });
  
  return cards;
}

// GET all decks
router.get('/', async (req, res) => {
  try {
    // FIXED: Include 'cards' field so frontend can calculate Pokemon/Trainer/Energy breakdown
    const decks = await Deck.find()
      .select('name description format totalCards isValid cards createdAt updatedAt')
      .sort({ updatedAt: -1 });
    
    console.log(`📋 Retrieved ${decks.length} decks`);
    res.json(decks);
  } catch (error) {
    console.error('❌ Error fetching decks:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET single deck by ID
router.get('/:id', async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    
    console.log(`📋 Retrieved deck: ${deck.name}`);
    res.json(deck);
  } catch (error) {
    console.error('❌ Error fetching deck:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST create new deck
router.post('/', async (req, res) => {
  try {
    const { name, description, format, cards } = req.body;
    
    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Deck name is required' });
    }
    
    if (!format || !['standard', 'expanded', 'unlimited'].includes(format)) {
      return res.status(400).json({ error: 'Valid format is required' });
    }

    // Clean card data before creating deck
    const cleanedCards = cleanCardData(cards || []);

    const deck = new Deck({
      name: name.trim(),
      description: description || '',
      format,
      cards: cleanedCards
    });

    const savedDeck = await deck.save();
    console.log(`✅ Created deck: ${savedDeck.name} (${savedDeck.totalCards} cards)`);
    res.status(201).json(savedDeck);
  } catch (error) {
    console.error('❌ Error creating deck:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    
    if (error.name === 'ValidationError') {
      // Provide more detailed validation error information
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message,
        value: error.errors[key].value
      }));
      
      res.status(400).json({ 
        error: 'Deck validation failed', 
        details: error.message,
        validationErrors 
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// PUT update deck
router.put('/:id', async (req, res) => {
  try {
    const { name, description, format, cards } = req.body;
    
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    // Update fields
    if (name !== undefined) deck.name = name.trim();
    if (description !== undefined) deck.description = description;
    if (format !== undefined) deck.format = format;
    if (cards !== undefined) {
      // Clean card data before updating
      const cleanedCards = cleanCardData(cards);
      deck.cards = cleanedCards;
    }

    const savedDeck = await deck.save();
    console.log(`✅ Updated deck: ${savedDeck.name} (${savedDeck.totalCards} cards)`);
    res.json(savedDeck);
  } catch (error) {
    console.error('❌ Error updating deck:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    
    if (error.name === 'ValidationError') {
      // Provide more detailed validation error information
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message,
        value: error.errors[key].value
      }));
      
      res.status(400).json({ 
        error: 'Deck validation failed', 
        details: error.message,
        validationErrors 
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// DELETE deck
router.delete('/:id', async (req, res) => {
  try {
    const deck = await Deck.findByIdAndDelete(req.params.id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    
    console.log(`🗑️  Deleted deck: ${deck.name}`);
    res.json({ message: 'Deck deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting deck:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET deck statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const stats = deck.getStats();
    const validation = deck.validateDeck();

    res.json({
      ...stats,
      validation
    });
  } catch (error) {
    console.error('❌ Error getting deck stats:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;