
import { Product, ShopInfo } from "../contexts/CartContext";

// Generate mock shop data
export const generateShops = (count: number = 5): ShopInfo[] => {
  const shopTypes = ["Grocery", "Supermarket", "Convenience Store", "Organic Market", "Fresh Produce"];
  const shopImages = [
    "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&q=80",
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `shop-${i + 1}`,
    name: `${["Fresh", "Green", "Market", "Super", "Local"][i % 5]} ${["Grocers", "Market", "Store", "Mart", "Shop"][i % 5]}`,
    image: shopImages[i % shopImages.length],
    rating: 3.5 + Math.random() * 1.5,
    type: shopTypes[i % shopTypes.length],
    selfPickupOnly: i % 3 === 0,
  }));
};

// Generate mock products
export const generateProducts = (shopId: string, count: number = 20): Product[] => {
  const categories = ["Fruits", "Vegetables", "Dairy", "Bakery", "Beverages"];
  const productImages = {
    Fruits: [
      "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80",
    ],
    Vegetables: [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80",
    ],
    Dairy: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&q=80",
    ],
    Bakery: [
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586444248892-4aa475bb1f95?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80",
    ],
    Beverages: [
      "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596803244536-eefc86dividedcf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571950006418-f226dc106482?auto=format&fit=crop&q=80",
    ],
  };

  const productNames = {
    Fruits: ["Apples", "Bananas", "Oranges", "Strawberries", "Grapes", "Mangoes", "Kiwi"],
    Vegetables: ["Carrots", "Broccoli", "Spinach", "Potatoes", "Tomatoes", "Cucumbers", "Onions"],
    Dairy: ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Ice Cream", "Cottage Cheese"],
    Bakery: ["Bread", "Muffins", "Croissants", "Bagels", "Donuts", "Cookies", "Cake"],
    Beverages: ["Water", "Juice", "Soda", "Coffee", "Tea", "Energy Drink", "Smoothie"],
  };

  return Array.from({ length: count }, (_, i) => {
    const category = categories[i % categories.length];
    const price = 2 + Math.random() * 8;
    const isHotDeal = i % 5 === 0;
    const discountedPrice = isHotDeal ? price * 0.8 : undefined;
    
    return {
      id: `${shopId}-product-${i + 1}`,
      name: `${productNames[category as keyof typeof productNames][i % 7]}`,
      price: parseFloat(price.toFixed(2)),
      discountedPrice: discountedPrice ? parseFloat(discountedPrice.toFixed(2)) : undefined,
      image: productImages[category as keyof typeof productImages][i % 3],
      category,
      isHotDeal,
      inStock: i % 7 !== 0,
    };
  });
};

// Mock shops for different PIN codes
const shopsByPincode: Record<string, ShopInfo[]> = {};

// Generate shops for some example PIN codes
const examplePincodes = ["10001", "90210", "60601", "75001", "20001"];
examplePincodes.forEach((pincode) => {
  shopsByPincode[pincode] = generateShops();
});

// Function to get shops by pincode - returns 5 shops for any pincode
export const getShopsByPincode = (pincode: string): ShopInfo[] => {
  // If we don't have pre-generated shops for this pincode, generate them now
  if (!shopsByPincode[pincode]) {
    shopsByPincode[pincode] = generateShops();
  }
  return shopsByPincode[pincode];
};

// Function to get shop by ID
export const getShopById = (shopId: string): ShopInfo | undefined => {
  for (const shops of Object.values(shopsByPincode)) {
    const shop = shops.find((s) => s.id === shopId);
    if (shop) return shop;
  }
  return undefined;
};

// Cache for products by shop ID
const productsByShopId: Record<string, Product[]> = {};

// Function to get products by shop ID
export const getProductsByShopId = (shopId: string): Product[] => {
  if (!productsByShopId[shopId]) {
    productsByShopId[shopId] = generateProducts(shopId);
  }
  return productsByShopId[shopId];
};

// Function to get products by category for a specific shop
export const getProductsByCategory = (shopId: string): Record<string, Product[]> => {
  const products = getProductsByShopId(shopId);
  return products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
};

// Payment methods
export const paymentMethods = [
  { id: "gpay", name: "Google Pay" },
  { id: "card", name: "Credit/Debit Card" },
  { id: "netbanking", name: "Net Banking" },
  { id: "cod", name: "Cash on Delivery" },
];
