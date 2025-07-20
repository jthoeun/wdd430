// scripts/mock-deck.js
const mongoose = require('mongoose');
const Deck = require('../models/Deck');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pokemon_tcg_db';


const championshipDeck = {
  name: "Gardevoir ex (2025 NAIC Champion)",
  description: "First place deck from 2025 North America International Championships.",
  format: "standard",
  cards: [
    // Pokemon - Just a few cards to test
    {
      card: {
        id: "svi-84",
        name: "Ralts",
        supertype: "Pokémon",
        subtypes: ["Basic"],
        hp: "60",
        types: ["Psychic"],
        set: {
          id: "svi",
          name: "Scarlet & Violet",
          series: "Scarlet & Violet",
          printedTotal: 198,
          total: 258,
          legalities: { standard: "legal", expanded: "legal" },
          releaseDate: "2023/03/31",
          updatedAt: "2023/03/31T00:00:00Z",
          images: { symbol: "", logo: "" }
        },
        number: "84",
        artist: "Yoriko Namba",
        rarity: "Common",
        legalities: { standard: "legal", expanded: "legal" },
        images: {
          small: "https://images.pokemontcg.io/svi/84.png",
          large: "https://images.pokemontcg.io/svi/84_hires.png"
        }
      },
      quantity: 3
    },
    {
      card: {
        id: "svi-86",
        name: "Gardevoir ex",
        supertype: "Pokémon",
        subtypes: ["Stage 2", "ex"],
        hp: "230",
        types: ["Psychic"],
        set: {
          id: "svi",
          name: "Scarlet & Violet",
          series: "Scarlet & Violet",
          printedTotal: 198,
          total: 258,
          legalities: { standard: "legal", expanded: "legal" },
          releaseDate: "2023/03/31",
          updatedAt: "2023/03/31T00:00:00Z",
          images: { symbol: "", logo: "" }
        },
        number: "86",
        artist: "5ban Graphics",
        rarity: "Double Rare",
        legalities: { standard: "legal", expanded: "legal" },
        images: {
          small: "https://images.pokemontcg.io/svi/86.png",
          large: "https://images.pokemontcg.io/svi/86_hires.png"
        }
      },
      quantity: 2
    },
    // Trainer
    {
      card: {
        id: "jtg-155",
        name: "Professor's Research",
        supertype: "Trainer",
        subtypes: ["Supporter"],
        set: {
          id: "jtg",
          name: "Jungle",
          series: "Classic",
          printedTotal: 64,
          total: 64,
          legalities: { standard: "legal", expanded: "legal" },
          releaseDate: "2024/06/16",
          updatedAt: "2024/06/16T00:00:00Z",
          images: { symbol: "", logo: "" }
        },
        number: "155",
        artist: "Yuu Nishida",
        rarity: "Uncommon",
        legalities: { standard: "legal", expanded: "legal" },
        images: {
          small: "https://images.pokemontcg.io/jtg/155.png",
          large: "https://images.pokemontcg.io/jtg/155_hires.png"
        }
      },
      quantity: 4
    },
    // Energy
    {
      card: {
        id: "sve-13",
        name: "Psychic Energy",
        supertype: "Energy",
        subtypes: ["Basic"],
        set: {
          id: "sve",
          name: "Scarlet & Violet Energies",
          series: "Scarlet & Violet",
          printedTotal: 16,
          total: 16,
          legalities: { standard: "legal", expanded: "legal" },
          releaseDate: "2023/03/31",
          updatedAt: "2023/03/31T00:00:00Z",
          images: { symbol: "", logo: "" }
        },
        number: "13",
        artist: "5ban Graphics",
        rarity: "Common",
        legalities: { standard: "legal", expanded: "legal" },
        images: {
          small: "https://images.pokemontcg.io/sve/13.png",
          large: "https://images.pokemontcg.io/sve/13_hires.png"
        }
      },
      quantity: 51  // Make it 60 total for testing
    }
  ]
};

// Test with a simple valid deck
const testDecks = [
  championshipDeck,
  {
    name: "Empty Test Deck",
    description: "For testing",
    format: "standard",
    cards: []
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    console.log(`🔌 Connecting to: ${mongoURI}`);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing decks...');
    const deleteResult = await Deck.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing decks`);

    // Insert test decks
    console.log('📦 Inserting test decks...');
    
    for (const deckData of testDecks) {
      try {
        console.log(`   📋 Creating deck: ${deckData.name}`);
        const deck = new Deck(deckData);
        const savedDeck = await deck.save();
        console.log(`   ✅ Saved: ${savedDeck.name} (${savedDeck.totalCards} cards, Valid: ${savedDeck.isValid})`);
        
        // Show validation errors if any
        if (!savedDeck.isValid && savedDeck.validationErrors.length > 0) {
          console.log(`   ⚠️  Validation warnings:`, savedDeck.validationErrors);
        }
      } catch (err) {
        console.error(`   ❌ Failed to save ${deckData.name}:`, err.message);
        // Continue with next deck
      }
    }

    // Count final decks
    const finalCount = await Deck.countDocuments();
    console.log(`\n📊 Final deck count: ${finalCount}`);

    console.log('\n🎉 Database seeding completed!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    throw error;
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Seeding failed:', error.message);
      process.exit(1);
    });
}

module.exports = { seedDatabase };