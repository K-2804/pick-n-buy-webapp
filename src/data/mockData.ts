
import { Product, ShopInfo } from "../contexts/CartContext";

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

export const generateProducts = (shopId: string, count: number = 20): Product[] => {
  const categories = ["Fruits", "Vegetables", "Dairy", "Bakery", "Beverages"];

  const productImages = {
    Fruits: [
      "https://hips.hearstapps.com/hmg-prod/images/apples-at-farmers-market-royalty-free-image-1627321463.jpg?crop=1xw:0.94466xh;center,top&resize=1200:*",
      "https://media.istockphoto.com/id/174262076/photo/strawberries.jpg?s=612x612&w=0&k=20&c=PWW0-LGwwd-a2a6O3sbEgSybseEnY4N8SauR0KSR5ls=",
      "https://c.ndtvimg.com/2023-05/3ph40r2_mango_625x300_02_May_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886",
      "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg",
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
    Fruits: ["Apples", "Strawberries", "Mangoes", "Bananas"],
    Vegetables: ["Carrots", "Broccoli", "Spinach"],
    Dairy: ["Milk", "Cheese", "Yogurt"],
    Bakery: ["Bread", "Muffins", "Croissants"],
    Beverages: ["Water", "Juice", "Soda"],
  };

  const products: Product[] = [];

  for (const category of categories) {
    const names = productNames[category as keyof typeof productNames];
    const images = productImages[category as keyof typeof productImages];

    names.forEach((name, idx) => {
      const price = 248 + Math.random() * 8;
      const isHotDeal = idx % 2 === 0;
      const discountedPrice = isHotDeal ? price * 0.8 : undefined;

      products.push({
        id: `${shopId}-${category}-${name}`,
        name,
        image: images[idx % images.length], 
        category,
        price: parseFloat(price.toFixed(2)),
        discountedPrice: discountedPrice ? parseFloat(discountedPrice.toFixed(2)) : undefined,
        isHotDeal,
        inStock: idx % 4 !== 0,
      });
    });
  }

  return products.slice(0, count);
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
