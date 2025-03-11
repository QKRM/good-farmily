// Central content repository for the wiki
export type ContentItem = {
  id: string
  category: string
  categorySlug: string
  title: string
  content: string
  slug: string
}

export const allContent: ContentItem[] = [
  // Chicken content
  {
    id: "chicken-1",
    category: "Chicken",
    categorySlug: "chicken",
    title: "What are the best breeds for egg production?",
    content:
      "Leghorns, Rhode Island Reds, and Sussex are among the best breeds for egg production. Leghorns can lay up to 300 white eggs per year, while Rhode Island Reds produce around 250-300 brown eggs annually. Sussex chickens are dual-purpose birds that lay approximately 250 eggs per year while also being suitable for meat production.",
    slug: "best-breeds-for-egg-production",
  },
  {
    id: "chicken-2",
    category: "Chicken",
    categorySlug: "chicken",
    title: "How much space do chickens need in a coop?",
    content:
      "As a general rule, provide at least 2-3 square feet of coop space per chicken and 8-10 square feet per bird in an outdoor run. Larger breeds may require more space. Adequate space helps prevent stress, pecking behavior, and disease spread while promoting better egg production and overall health.",
    slug: "space-requirements-for-chickens",
  },
  {
    id: "chicken-3",
    category: "Chicken",
    categorySlug: "chicken",
    title: "What should I feed my chickens for optimal health?",
    content:
      "Feed laying hens a quality commercial layer feed (16-18% protein) as their main diet. Supplement with calcium sources like oyster shells for egg production. Provide grit for digestion if they don't have access to natural sources. Offer kitchen scraps as treats (avoiding avocados, chocolate, and raw beans), and ensure constant access to fresh, clean water.",
    slug: "feeding-chickens-for-optimal-health",
  },
  {
    id: "chicken-4",
    category: "Chicken",
    categorySlug: "chicken",
    title: "How can I protect my chickens from predators?",
    content:
      "Secure your coop with predator-proof fencing buried at least 12 inches deep to prevent digging. Use hardware cloth (not chicken wire) with ¼-inch or smaller openings. Install automatic coop doors that close at dusk, use motion-activated lights, and consider livestock guardian animals. Regularly inspect for and repair any potential entry points in the coop structure.",
    slug: "protecting-chickens-from-predators",
  },

  // Cow content
  {
    id: "cow-1",
    category: "Cow",
    categorySlug: "cow",
    title: "What are the best breeds for milk production?",
    content:
      "Holstein cows are the highest milk producers, averaging 23,000 pounds of milk per year. Jersey cows produce milk with higher butterfat content (5-6%), making it ideal for butter and cheese. Guernsey, Brown Swiss, and Ayrshire are also excellent dairy breeds with different milk composition profiles suitable for various dairy products.",
    slug: "best-breeds-for-milk-production",
  },
  {
    id: "cow-2",
    category: "Cow",
    categorySlug: "cow",
    title: "How much land do cattle need?",
    content:
      "Cattle typically require 1.5-2 acres per cow-calf pair on good pasture. This varies based on soil fertility, rainfall, and forage quality. Rotational grazing can improve land efficiency by 25-30%. For feedlot operations, allow 125-150 square feet per animal for proper spacing, while dairy operations need approximately 80-100 square feet of loafing area per cow.",
    slug: "land-requirements-for-cattle",
  },
  {
    id: "cow-3",
    category: "Cow",
    categorySlug: "cow",
    title: "What should I feed my cattle for optimal health?",
    content:
      "Cattle diets should consist of 70-80% forage (grass, hay, silage) and 20-30% grain/concentrate for balanced nutrition. Provide free-choice mineral supplements containing salt, calcium, phosphorus, and trace minerals. Ensure access to clean, fresh water (30-50 gallons per day for mature cows). Adjust feed ratios based on production stage, with higher energy needs during lactation and finishing.",
    slug: "feeding-cattle-for-optimal-health",
  },
  {
    id: "cow-4",
    category: "Cow",
    categorySlug: "cow",
    title: "How do I recognize common health issues in cattle?",
    content:
      "Watch for reduced appetite, decreased milk production, lethargy, or isolation from the herd as general signs of illness. Respiratory issues present as coughing, nasal discharge, and labored breathing. Digestive problems include bloating, diarrhea, or constipation. Monitor for lameness, swollen joints, or abnormal hoof growth. Establish a relationship with a large animal veterinarian for regular health checks and prompt treatment.",
    slug: "recognizing-health-issues-in-cattle",
  },

  // Goat content
  {
    id: "goat-1",
    category: "Goat",
    categorySlug: "goat",
    title: "What are the best goat breeds for milk production?",
    content:
      "Alpine, Saanen, and Nubian goats are top dairy producers. Alpines yield 1-2 gallons daily with moderate butterfat (3.5%). Saanens produce the highest volume at 1-3 gallons per day with lower butterfat (2.5-3%). Nubians give 1-2 gallons with high butterfat content (4-5%), making their milk excellent for cheese and soap making. LaMancha and Toggenburg are also reliable dairy breeds.",
    slug: "best-goat-breeds-for-milk-production",
  },
  {
    id: "goat-2",
    category: "Goat",
    categorySlug: "goat",
    title: "How much space do goats need?",
    content:
      "Provide at least 10-15 square feet of shelter space per goat and 200-250 square feet of outdoor space per animal. Goats are climbers and browsers who need vertical space and varied terrain. Fencing should be at least 4-5 feet high and secure, as goats are excellent escape artists. Rotational grazing helps maintain pasture quality and reduces parasite loads.",
    slug: "space-requirements-for-goats",
  },
  {
    id: "goat-3",
    category: "Goat",
    categorySlug: "goat",
    title: "What should I feed my goats?",
    content:
      "Goats are browsers who prefer leaves, shrubs, and woody plants over grass. Provide quality hay (alfalfa for dairy goats, grass hay for others) as the foundation of their diet. Supplement with a commercial goat feed (16-18% protein) based on production needs. Offer free-choice minerals formulated specifically for goats (not sheep, as goats need copper). Ensure access to clean, fresh water at all times.",
    slug: "feeding-goats",
  },
  {
    id: "goat-4",
    category: "Goat",
    categorySlug: "goat",
    title: "How do I manage common health issues in goats?",
    content:
      "Implement a regular deworming program based on fecal testing rather than calendar treatments to prevent parasite resistance. Vaccinate annually for Clostridium perfringens types C and D and tetanus. Trim hooves every 6-8 weeks to prevent foot rot and lameness. Monitor for signs of illness including decreased appetite, lethargy, diarrhea, or unusual behavior. Maintain a relationship with a veterinarian experienced with goats.",
    slug: "managing-health-issues-in-goats",
  },

  // Pig content
  {
    id: "pig-1",
    category: "Pig",
    categorySlug: "pig",
    title: "What are the best pig breeds for small farms?",
    content:
      "Berkshire pigs are known for excellent meat quality and moderate size (500-600 lbs). Tamworth pigs are hardy, good foragers, and reach 500-600 lbs. Kunekune pigs are smaller (200-300 lbs), docile, and excellent grazers requiring less supplemental feed. American Guinea Hogs are small (150-300 lbs), heritage breed pigs perfect for homesteads. Duroc pigs grow quickly and have good meat quality but require more feed.",
    slug: "best-pig-breeds-for-small-farms",
  },
  {
    id: "pig-2",
    category: "Pig",
    categorySlug: "pig",
    title: "How much space do pigs need?",
    content:
      "Provide at least 50-100 square feet of outdoor space per pig for exercise and natural behaviors. Indoor shelter should offer 8-10 square feet per adult pig with dry bedding. For pasture-raised pigs, allocate 1/4 to 1/2 acre per pig with rotational grazing to maintain land quality. Fencing must be sturdy and secure, as pigs are strong and can root under standard fencing.",
    slug: "space-requirements-for-pigs",
  },
  {
    id: "pig-3",
    category: "Pig",
    categorySlug: "pig",
    title: "What should I feed my pigs?",
    content:
      "Feed a commercial pig feed (14-16% protein for growers, 12-14% for finishers) as the foundation of their diet. Supplement with vegetable scraps, excess dairy, and appropriate food waste. Avoid raw meat, moldy foods, and high-salt items. Pasture-raised pigs benefit from access to forage, which can reduce feed costs by 20-30%. Ensure constant access to clean, fresh water, as pigs drink 2-4 gallons daily.",
    slug: "feeding-pigs",
  },
  {
    id: "pig-4",
    category: "Pig",
    categorySlug: "pig",
    title: "How do I maintain healthy pigs?",
    content:
      "Provide a clean, dry living environment with adequate ventilation but no drafts. Implement a vaccination program based on local disease risks and veterinary recommendations. Monitor for signs of illness including decreased appetite, lethargy, coughing, or diarrhea. Maintain parasite control through regular deworming and clean housing. Offer wallows during hot weather for temperature regulation, but keep them clean to prevent disease.",
    slug: "maintaining-healthy-pigs",
  },
]

// Helper function to get content by ID
export function getContentById(id: string): ContentItem | undefined {
  return allContent.find((item) => item.id === id)
}

// Helper function to get content by slug
export function getContentBySlug(slug: string): ContentItem | undefined {
  return allContent.find((item) => item.slug === slug)
}

// Helper function to get content by category
export function getContentByCategory(category: string): ContentItem[] {
  return allContent.filter((item) => item.categorySlug === category)
}

