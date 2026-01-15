// Metadata for each query including descriptions and insights

export const queryMetadata: Record<string, {
  description: string
  insights: string[]
}> = {
  countryNameLength: {
    description: "Analyzes the length distribution of country names across all customer records. This helps identify geographic naming patterns and understand how country names vary in character length.",
    insights: [
      "Longer country names often indicate compound or descriptive country names",
      "Shorter names are typically more common and easier to remember",
      "Name length can correlate with geographic regions"
    ]
  },
  customerNameLength: {
    description: "Examines customer name lengths to identify naming conventions. Longer names may indicate formal business names, while shorter ones might be abbreviations or simpler company names.",
    insights: [
      "Business names tend to be longer than individual customer names",
      "Name length varies significantly across different countries",
      "Longer names often contain descriptive words or multiple components"
    ]
  },
  productNameAnalysis: {
    description: "Comprehensive analysis of product names including total length and word count. This reveals how products are named and whether they follow consistent naming patterns.",
    insights: [
      "Product names with more words tend to be more descriptive",
      "Word count correlates with product complexity or category",
      "Shorter names are often easier to remember and market"
    ]
  },
  employeeNamePatterns: {
    description: "Analyzes employee name structures by examining first name, last name, and total name lengths. This helps understand naming diversity and patterns within the organization.",
    insights: [
      "Name length diversity indicates a multicultural workforce",
      "Longer names may indicate different cultural naming conventions",
      "Total name length affects database storage and display considerations"
    ]
  },
  productNameStartChars: {
    description: "Identifies the most common starting characters in product names. This reveals naming trends and can help predict naming patterns for new products.",
    insights: [
      "Certain starting characters are more popular than others",
      "Starting characters may correlate with product categories",
      "This pattern can inform naming conventions for new products"
    ]
  },
  customerNameEndings: {
    description: "Examines common ending patterns in customer names, such as 'Inc', 'Ltd', or 'Co'. This helps identify business type indicators and naming conventions.",
    insights: [
      "Common endings indicate business type (Inc, Ltd, Co, etc.)",
      "Ending patterns vary by country and business structure",
      "These patterns help categorize customer types automatically"
    ]
  },
  productLineAnalysis: {
    description: "Analyzes product line characteristics including name length and average product name length within each line. This reveals how product lines are structured and named.",
    insights: [
      "Product lines with longer names may be more descriptive",
      "Average product name length varies significantly by product line",
      "Consistent naming within product lines improves brand recognition"
    ]
  },
  emailDomainAnalysis: {
    description: "Examines email domain patterns across employees. This helps understand organizational email structure and identify potential security or organizational patterns.",
    insights: [
      "Single domain indicates centralized email management",
      "Domain patterns can reveal organizational structure",
      "Email conventions affect communication and branding"
    ]
  },
  contactNamePatterns: {
    description: "Analyzes contact person names (first and last) to understand naming diversity and patterns. This helps identify cultural naming conventions and contact management patterns.",
    insights: [
      "Contact name lengths vary by geographic region",
      "Longer names may indicate formal business relationships",
      "Name patterns help in contact database management"
    ]
  },
  productNamePatterns: {
    description: "Categorizes products based on descriptive keywords like 'Classic', 'Vintage', or 'Collectible'. This reveals marketing language patterns and product positioning strategies.",
    insights: [
      "Certain descriptive words are used more frequently",
      "Word choice affects product perception and marketing",
      "Patterns reveal brand positioning strategies"
    ]
  },
  addressLengthAnalysis: {
    description: "Examines office address lengths to understand address complexity and formatting patterns. This helps in address validation and formatting systems.",
    insights: [
      "Address length varies by country and address format",
      "Longer addresses may include more detailed location information",
      "Address complexity affects shipping and logistics systems"
    ]
  },
  jobTitleAnalysis: {
    description: "Analyzes job title lengths and frequency to understand organizational hierarchy and role naming conventions. This reveals how roles are described and structured.",
    insights: [
      "Longer job titles often indicate more specific or senior roles",
      "Title length patterns reveal organizational structure",
      "Consistent title naming improves HR and organizational clarity"
    ]
  },
  customerNameWordCount: {
    description: "Counts the number of words in customer names to identify naming complexity. Multi-word names often indicate formal business entities or descriptive company names.",
    insights: [
      "Word count indicates naming formality and structure",
      "More words often mean more descriptive or formal names",
      "Word count patterns vary by business type and country"
    ]
  },
  vendorNameAnalysis: {
    description: "Examines vendor name lengths and product counts to understand vendor diversity and naming patterns. This helps in vendor management and categorization.",
    insights: [
      "Vendor name length varies significantly",
      "Longer vendor names may indicate established companies",
      "Vendor diversity affects supply chain management"
    ]
  },
  productNameCharFrequency: {
    description: "Analyzes vowel frequency (a, e, i, o, u) in product names by product line. This reveals linguistic patterns and can help understand naming aesthetics.",
    insights: [
      "Vowel distribution affects name pronunciation and memorability",
      "Different product lines may have different linguistic patterns",
      "Character frequency reveals naming style preferences"
    ]
  },
  customerNameComplexity: {
    description: "Calculates a complexity score based on name length, word count, and capitalization. Higher scores indicate more complex naming structures that may require special handling.",
    insights: [
      "Complexity scores help identify names needing special formatting",
      "Higher complexity may indicate formal business entities",
      "Complexity affects database indexing and search functionality"
    ]
  },
  productNameSimilarity: {
    description: "Measures naming similarity within product lines by comparing unique prefixes. Lower similarity ratios indicate more diverse naming, while higher ratios suggest consistent patterns.",
    insights: [
      "Similarity ratios reveal naming consistency within product lines",
      "Consistent naming improves brand recognition",
      "Diverse naming may indicate broader product ranges"
    ]
  },
  employeeNameDiversity: {
    description: "Analyzes name diversity by office location, measuring unique first and last names relative to total employees. Higher diversity indicates more multicultural teams.",
    insights: [
      "Name diversity reflects workplace multiculturalism",
      "Higher diversity may indicate global or diverse hiring",
      "Diversity metrics help understand organizational culture"
    ]
  },
  customerNameCapitalization: {
    description: "Categorizes customer names by capitalization patterns (ALL_CAPS, all_lower, Title_Case, Mixed_Case). This reveals data quality and naming convention consistency.",
    insights: [
      "Capitalization patterns reveal data entry consistency",
      "Mixed patterns may indicate data quality issues",
      "Consistent capitalization improves data processing"
    ]
  },
  productNameSpecialChars: {
    description: "Identifies special characters (&, -, ', ., numbers) in product names by product line. This reveals naming conventions and formatting patterns.",
    insights: [
      "Special characters affect search and filtering capabilities",
      "Character usage varies by product line",
      "Special characters may indicate specific naming conventions"
    ]
  },
  contactNameCorrelation: {
    description: "Analyzes the correlation between first and last name lengths by country. This reveals cultural naming patterns and contact name structures.",
    insights: [
      "Name length correlations vary by geographic region",
      "Cultural patterns affect contact name structures",
      "Understanding patterns helps in contact management"
    ]
  },
  productNameReadability: {
    description: "Calculates readability scores based on name length and word count. Higher readability indicates names that are easier to read and remember, which can improve marketing effectiveness.",
    insights: [
      "Readable names improve customer recognition and recall",
      "Shorter names with fewer words are generally more readable",
      "Readability affects marketing and branding effectiveness"
    ]
  },
  employeeEmailPatterns: {
    description: "Analyzes email prefix patterns (the part before @) to understand email naming conventions. This reveals organizational email policies and naming structures.",
    insights: [
      "Email prefixes reveal naming conventions (first.last, firstlast, etc.)",
      "Consistent patterns indicate formal email policies",
      "Prefix length affects email address complexity"
    ]
  },
  customerNameGeographic: {
    description: "Examines customer name length statistics by country, including averages, min, max, and standard deviation. This reveals geographic naming patterns and data distribution.",
    insights: [
      "Name length statistics vary significantly by country",
      "Standard deviation reveals naming consistency within countries",
      "Geographic patterns help in international business strategies"
    ]
  },
  productNameYearPatterns: {
    description: "Identifies year patterns (4-digit years) in product names. This reveals how products reference years, which is common for vintage or model year products.",
    insights: [
      "Year references indicate vintage or model year products",
      "Year patterns help categorize products by era",
      "Year usage varies by product line"
    ]
  },
  customerNameAbbreviations: {
    description: "Identifies common business abbreviations (Inc, Ltd, Co, Corp) in customer names. This helps categorize business types and understand naming conventions.",
    insights: [
      "Abbreviations reveal business legal structures",
      "Abbreviation usage varies by country and business type",
      "Patterns help in automatic business type classification"
    ]
  },
  productNameDescriptiveWords: {
    description: "Counts frequency of descriptive marketing words (Classic, Vintage, Collectible, Limited, Special, Premium) in product names. This reveals marketing language and positioning strategies.",
    insights: [
      "Descriptive words affect product perception and pricing",
      "Word frequency reveals marketing strategies",
      "Certain words are more popular than others"
    ]
  },
  employeeNameByTitle: {
    description: "Analyzes average name lengths by job title to understand if name length correlates with position level. This reveals organizational patterns and naming diversity by role.",
    insights: [
      "Name length patterns may vary by organizational level",
      "Different roles may attract different naming conventions",
      "Understanding patterns helps in organizational analysis"
    ]
  },
  customerNameUniqueness: {
    description: "Calculates uniqueness ratios (unique names / total customers) by country. Higher ratios indicate more unique naming, while lower ratios suggest common naming patterns.",
    insights: [
      "Uniqueness ratios reveal naming diversity by region",
      "Higher uniqueness may indicate more diverse customer base",
      "Lower uniqueness suggests common naming conventions"
    ]
  },
}
