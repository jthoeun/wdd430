const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');

// GET all decks
router.get('/', async (req, res) => {
  try {
    const decks = await Deck.find()
      .select('name description format totalCards isValid createdAt updatedAt')
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

    const deck = new Deck({
      name: name.trim(),
      description: description || '',
      format,
      cards: cards || []
    });

    const savedDeck = await deck.save();
    console.log(`✅ Created deck: ${savedDeck.name} (${savedDeck.totalCards} cards)`);
    res.status(201).json(savedDeck);
  } catch (error) {
    console.error('❌ Error creating deck:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
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
    if (cards !== undefined) deck.cards = cards;

    const savedDeck = await deck.save();
    console.log(`✅ Updated deck: ${savedDeck.name} (${savedDeck.totalCards} cards)`);
    res.json(savedDeck);
  } catch (error) {
    console.error('❌ Error updating deck:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
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