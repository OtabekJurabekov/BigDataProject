// Advanced analytical queries focusing on naming conventions, spelling patterns, and textual characteristics

export const queries = {
  // 1. Country name length analysis
  countryNameLength: `
    SELECT 
      country AS Name,
      LENGTH(country) AS NameLength
    FROM customers
    GROUP BY country
    ORDER BY NameLength DESC
  `,

  // 2. Customer name length distribution
  customerNameLength: `
    SELECT 
      customerName,
      LENGTH(customerName) AS NameLength,
      country
    FROM customers
    ORDER BY NameLength DESC
    LIMIT 50
  `,

  // 3. Product name length and word count
  productNameAnalysis: `
    SELECT 
      productName,
      LENGTH(productName) AS NameLength,
      (LENGTH(productName) - LENGTH(REPLACE(productName, ' ', '')) + 1) AS WordCount,
      productLine
    FROM products
    ORDER BY NameLength DESC
    LIMIT 50
  `,

  // 4. Employee name patterns (first + last name length)
  employeeNamePatterns: `
    SELECT 
      CONCAT(firstName, ' ', lastName) AS FullName,
      LENGTH(firstName) AS FirstNameLength,
      LENGTH(lastName) AS LastNameLength,
      LENGTH(CONCAT(firstName, lastName)) AS TotalLength,
      jobTitle
    FROM employees
    ORDER BY TotalLength DESC
  `,

  // 5. City name length analysis
  cityNameLength: `
    SELECT 
      city AS CityName,
      LENGTH(city) AS NameLength,
      country,
      COUNT(*) AS OfficeCount
    FROM offices
    GROUP BY city, country
    ORDER BY NameLength DESC
  `,

  // 6. Product name starting characters frequency
  productNameStartChars: `
    SELECT 
      LEFT(productName, 1) AS StartChar,
      COUNT(*) AS Frequency
    FROM products
    GROUP BY StartChar
    ORDER BY Frequency DESC
  `,

  // 7. Customer name ending patterns
  customerNameEndings: `
    SELECT 
      RIGHT(customerName, 3) AS Ending,
      COUNT(*) AS Frequency
    FROM customers
    GROUP BY Ending
    HAVING Frequency > 1
    ORDER BY Frequency DESC
    LIMIT 20
  `,

  // 8. Product line name characteristics
  productLineAnalysis: `
    SELECT 
      productLine,
      LENGTH(productLine) AS NameLength,
      COUNT(*) AS ProductCount,
      AVG(LENGTH(productName)) AS AvgProductNameLength
    FROM products
    GROUP BY productLine
    ORDER BY NameLength DESC
  `,

  // 9. Email domain analysis
  emailDomainAnalysis: `
    SELECT 
      SUBSTRING_INDEX(email, '@', -1) AS Domain,
      COUNT(*) AS EmployeeCount
    FROM employees
    GROUP BY Domain
    ORDER BY EmployeeCount DESC
  `,

  // 10. Customer contact name patterns
  contactNamePatterns: `
    SELECT 
      contactFirstName,
      contactLastName,
      LENGTH(contactFirstName) AS FirstNameLength,
      LENGTH(contactLastName) AS LastNameLength,
      country
    FROM customers
    ORDER BY (LENGTH(contactFirstName) + LENGTH(contactLastName)) DESC
    LIMIT 50
  `,

  // 11. Product name containing specific patterns
  productNamePatterns: `
    SELECT 
      productName,
      productLine,
      CASE 
        WHEN productName LIKE '%Classic%' THEN 'Contains Classic'
        WHEN productName LIKE '%Vintage%' THEN 'Contains Vintage'
        WHEN productName LIKE '%Collectible%' THEN 'Contains Collectible'
        ELSE 'Other'
      END AS PatternCategory
    FROM products
    ORDER BY productName
  `,

  // 12. Office address line length
  addressLengthAnalysis: `
    SELECT 
      city,
      country,
      LENGTH(addressLine1) AS AddressLength,
      CASE 
        WHEN addressLine2 IS NOT NULL THEN LENGTH(addressLine2)
        ELSE 0
      END AS AddressLine2Length
    FROM offices
    ORDER BY AddressLength DESC
  `,

  // 13. Job title length analysis
  jobTitleAnalysis: `
    SELECT 
      jobTitle,
      LENGTH(jobTitle) AS TitleLength,
      COUNT(*) AS EmployeeCount
    FROM employees
    GROUP BY jobTitle
    ORDER BY TitleLength DESC
  `,

  // 14. Customer name word count
  customerNameWordCount: `
    SELECT 
      customerName,
      (LENGTH(customerName) - LENGTH(REPLACE(customerName, ' ', '')) + 1) AS WordCount,
      country
    FROM customers
    ORDER BY WordCount DESC, customerName
    LIMIT 50
  `,

  // 15. Product vendor name length
  vendorNameAnalysis: `
    SELECT 
      productVendor,
      LENGTH(productVendor) AS VendorNameLength,
      COUNT(*) AS ProductCount
    FROM products
    GROUP BY productVendor
    ORDER BY VendorNameLength DESC
  `,

  // NEW ADVANCED QUERIES

  // 16. Character frequency in product names
  productNameCharFrequency: `
    SELECT 
      productLine,
      SUM(LENGTH(productName) - LENGTH(REPLACE(LOWER(productName), 'a', ''))) AS CharA,
      SUM(LENGTH(productName) - LENGTH(REPLACE(LOWER(productName), 'e', ''))) AS CharE,
      SUM(LENGTH(productName) - LENGTH(REPLACE(LOWER(productName), 'i', ''))) AS CharI,
      SUM(LENGTH(productName) - LENGTH(REPLACE(LOWER(productName), 'o', ''))) AS CharO,
      SUM(LENGTH(productName) - LENGTH(REPLACE(LOWER(productName), 'u', ''))) AS CharU
    FROM products
    GROUP BY productLine
  `,

  // 17. Customer name complexity score
  customerNameComplexity: `
    SELECT 
      customerName,
      LENGTH(customerName) AS Length,
      (LENGTH(customerName) - LENGTH(REPLACE(customerName, ' ', '')) + 1) AS WordCount,
      (LENGTH(customerName) - LENGTH(REPLACE(customerName, UPPER(SUBSTRING(customerName, 1, 1)), ''))) AS CapitalCount,
      (LENGTH(customerName) + (LENGTH(customerName) - LENGTH(REPLACE(customerName, ' ', '')) + 1) * 2) AS ComplexityScore,
      country
    FROM customers
    ORDER BY ComplexityScore DESC
    LIMIT 50
  `,

  // 18. Product name similarity patterns
  productNameSimilarity: `
    SELECT 
      productLine,
      COUNT(*) AS TotalProducts,
      COUNT(DISTINCT LEFT(productName, 5)) AS UniquePrefixes,
      COUNT(*) / COUNT(DISTINCT LEFT(productName, 5)) AS SimilarityRatio
    FROM products
    GROUP BY productLine
    ORDER BY SimilarityRatio DESC
  `,

  // 19. Employee name diversity by office
  employeeNameDiversity: `
    SELECT 
      o.city,
      o.country,
      COUNT(DISTINCT e.firstName) AS UniqueFirstNames,
      COUNT(DISTINCT e.lastName) AS UniqueLastNames,
      COUNT(*) AS TotalEmployees,
      COUNT(DISTINCT e.firstName) / COUNT(*) AS FirstNameDiversity,
      COUNT(DISTINCT e.lastName) / COUNT(*) AS LastNameDiversity
    FROM employees e
    JOIN offices o ON e.officeCode = o.officeCode
    GROUP BY o.city, o.country
    ORDER BY FirstNameDiversity DESC
  `,

  // 20. Customer name capitalization patterns
  customerNameCapitalization: `
    SELECT 
      CASE 
        WHEN customerName = UPPER(customerName) THEN 'ALL_CAPS'
        WHEN customerName = LOWER(customerName) THEN 'all_lower'
        WHEN customerName = CONCAT(UPPER(LEFT(customerName, 1)), LOWER(SUBSTRING(customerName, 2))) THEN 'Title_Case'
        ELSE 'Mixed_Case'
      END AS CapitalizationPattern,
      COUNT(*) AS Frequency
    FROM customers
    GROUP BY CapitalizationPattern
    ORDER BY Frequency DESC
  `,

  // 21. Product name special characters
  productNameSpecialChars: `
    SELECT 
      productLine,
      COUNT(*) AS TotalProducts,
      SUM(CASE WHEN productName LIKE '%&%' THEN 1 ELSE 0 END) AS HasAmpersand,
      SUM(CASE WHEN productName LIKE '%-%' THEN 1 ELSE 0 END) AS HasHyphen,
      SUM(CASE WHEN productName LIKE '%''%' THEN 1 ELSE 0 END) AS HasApostrophe,
      SUM(CASE WHEN productName LIKE '%.%' THEN 1 ELSE 0 END) AS HasPeriod,
      SUM(CASE WHEN productName REGEXP '[0-9]' THEN 1 ELSE 0 END) AS HasNumbers
    FROM products
    GROUP BY productLine
  `,

  // 22. Customer contact name length correlation
  contactNameCorrelation: `
    SELECT 
      country,
      AVG(LENGTH(contactFirstName)) AS AvgFirstNameLength,
      AVG(LENGTH(contactLastName)) AS AvgLastNameLength,
      AVG(LENGTH(contactFirstName) + LENGTH(contactLastName)) AS AvgTotalLength,
      COUNT(*) AS CustomerCount
    FROM customers
    GROUP BY country
    HAVING CustomerCount > 1
    ORDER BY AvgTotalLength DESC
  `,

  // 23. Product name readability score
  productNameReadability: `
    SELECT 
      productName,
      LENGTH(productName) AS Length,
      (LENGTH(productName) - LENGTH(REPLACE(productName, ' ', '')) + 1) AS WordCount,
      (LENGTH(productName) - LENGTH(REPLACE(UPPER(productName), LOWER(productName), ''))) AS CapitalLetters,
      CASE 
        WHEN LENGTH(productName) <= 20 AND (LENGTH(productName) - LENGTH(REPLACE(productName, ' ', '')) + 1) <= 3 THEN 'High'
        WHEN LENGTH(productName) <= 30 AND (LENGTH(productName) - LENGTH(REPLACE(productName, ' ', '')) + 1) <= 4 THEN 'Medium'
        ELSE 'Low'
      END AS ReadabilityScore,
      productLine
    FROM products
    ORDER BY ReadabilityScore, Length
    LIMIT 50
  `,

  // 24. Employee email pattern analysis
  employeeEmailPatterns: `
    SELECT 
      SUBSTRING_INDEX(email, '@', 1) AS EmailPrefix,
      LENGTH(SUBSTRING_INDEX(email, '@', 1)) AS PrefixLength,
      COUNT(*) AS Frequency,
      GROUP_CONCAT(DISTINCT jobTitle) AS JobTitles
    FROM employees
    GROUP BY EmailPrefix, PrefixLength
    ORDER BY Frequency DESC
    LIMIT 20
  `,

  // 25. Customer name geographic patterns
  customerNameGeographic: `
    SELECT 
      country,
      COUNT(*) AS TotalCustomers,
      AVG(LENGTH(customerName)) AS AvgNameLength,
      MIN(LENGTH(customerName)) AS MinNameLength,
      MAX(LENGTH(customerName)) AS MaxNameLength,
      STDDEV(LENGTH(customerName)) AS NameLengthStdDev
    FROM customers
    GROUP BY country
    HAVING TotalCustomers > 1
    ORDER BY AvgNameLength DESC
  `,

  // 26. Product name year patterns
  productNameYearPatterns: `
    SELECT 
      CASE 
        WHEN productName LIKE '%19%' AND productName REGEXP '[0-9]{4}' THEN 
          CONCAT('19', SUBSTRING(productName, LOCATE('19', productName) + 2, 2))
        WHEN productName LIKE '%20%' AND productName REGEXP '[0-9]{4}' THEN 
          CONCAT('20', SUBSTRING(productName, LOCATE('20', productName) + 2, 2))
        ELSE 'No Year'
      END AS YearFound,
      COUNT(*) AS Frequency,
      productLine
    FROM products
    GROUP BY YearFound, productLine
    HAVING YearFound != 'No Year' AND YearFound IS NOT NULL
    ORDER BY Frequency DESC
  `,

  // 27. Customer name abbreviation patterns
  customerNameAbbreviations: `
    SELECT 
      CASE 
        WHEN customerName LIKE '%Inc%' OR customerName LIKE '%Inc.%' THEN 'Inc'
        WHEN customerName LIKE '%Ltd%' OR customerName LIKE '%Ltd.%' THEN 'Ltd'
        WHEN customerName LIKE '%Co%' OR customerName LIKE '%Co.%' THEN 'Co'
        WHEN customerName LIKE '%Corp%' OR customerName LIKE '%Corp.%' THEN 'Corp'
        ELSE 'None'
      END AS AbbreviationType,
      COUNT(*) AS Frequency
    FROM customers
    GROUP BY AbbreviationType
    ORDER BY Frequency DESC
  `,

  // 28. Product name descriptive words
  productNameDescriptiveWords: `
    SELECT 
      'Classic' AS Word,
      COUNT(*) AS Frequency
    FROM products WHERE productName LIKE '%Classic%'
    UNION ALL
    SELECT 'Vintage', COUNT(*) FROM products WHERE productName LIKE '%Vintage%'
    UNION ALL
    SELECT 'Collectible', COUNT(*) FROM products WHERE productName LIKE '%Collectible%'
    UNION ALL
    SELECT 'Limited', COUNT(*) FROM products WHERE productName LIKE '%Limited%'
    UNION ALL
    SELECT 'Special', COUNT(*) FROM products WHERE productName LIKE '%Special%'
    UNION ALL
    SELECT 'Premium', COUNT(*) FROM products WHERE productName LIKE '%Premium%'
    ORDER BY Frequency DESC
  `,

  // 29. Employee name length by job title
  employeeNameByTitle: `
    SELECT 
      jobTitle,
      AVG(LENGTH(firstName)) AS AvgFirstNameLength,
      AVG(LENGTH(lastName)) AS AvgLastNameLength,
      AVG(LENGTH(CONCAT(firstName, lastName))) AS AvgFullNameLength,
      COUNT(*) AS EmployeeCount
    FROM employees
    GROUP BY jobTitle
    ORDER BY AvgFullNameLength DESC
  `,

  // 30. Customer name uniqueness score
  customerNameUniqueness: `
    SELECT 
      country,
      COUNT(DISTINCT customerName) AS UniqueNames,
      COUNT(*) AS TotalCustomers,
      COUNT(DISTINCT customerName) / COUNT(*) AS UniquenessRatio
    FROM customers
    GROUP BY country
    HAVING TotalCustomers > 1
    ORDER BY UniquenessRatio DESC
  `,
};
