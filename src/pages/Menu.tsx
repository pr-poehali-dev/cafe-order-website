import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Паста Карбонара',
      description: 'Классическая паста с беконом, яйцом и пармезаном',
      price: 890,
      category: 'Основные блюда',
      image: '/img/38c764e5-e67e-4cfe-a354-9699b80cf8e5.jpg'
    },
    {
      id: 2,
      name: 'Стейк Рибай',
      description: 'Сочный стейк из мраморной говядины с овощами гриль',
      price: 2490,
      category: 'Основные блюда',
      image: '/img/38c764e5-e67e-4cfe-a354-9699b80cf8e5.jpg'
    },
    {
      id: 3,
      name: 'Тирамису',
      description: 'Классический итальянский десерт с кофейным вкусом',
      price: 490,
      category: 'Десерты',
      image: '/img/d2f72f1e-0bc1-4781-93f7-401865aaa5c9.jpg'
    },
    {
      id: 4,
      name: 'Салат Цезарь',
      description: 'Свежий салат с курицей, пармезаном и соусом Цезарь',
      price: 690,
      category: 'Салаты',
      image: '/img/38c764e5-e67e-4cfe-a354-9699b80cf8e5.jpg'
    },
    {
      id: 5,
      name: 'Брускетта',
      description: 'Хрустящий хлеб с томатами, базиликом и моцареллой',
      price: 590,
      category: 'Закуски',
      image: '/img/38c764e5-e67e-4cfe-a354-9699b80cf8e5.jpg'
    },
    {
      id: 6,
      name: 'Панна-котта',
      description: 'Нежный десерт с ягодным соусом',
      price: 450,
      category: 'Десерты',
      image: '/img/d2f72f1e-0bc1-4781-93f7-401865aaa5c9.jpg'
    }
  ];

  const categories = ['Все', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = selectedCategory === 'Все' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    toast({
      title: 'Добавлено в корзину',
      description: item.name,
    });
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const deliveryFee = deliveryMethod === 'delivery' ? 200 : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/">
              <img 
                src="https://cdn.poehali.dev/files/5331cd08-968a-44b6-86a5-9f4b44ea9022.png" 
                alt="Сойка Кафе" 
                className="h-12 w-auto"
              />
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-foreground text-xl font-extrabold hover:text-primary transition-colors">Главная</a>
            <a href="/menu" className="text-primary text-xl font-extrabold">Меню</a>
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={16} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={16} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base font-semibold mb-3 block">Способ получения</Label>
                          <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as 'delivery' | 'pickup')}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="delivery" id="delivery" />
                              <Label htmlFor="delivery">Доставка (+200 ₽)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pickup" id="pickup" />
                              <Label htmlFor="pickup">Самовывоз</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Сумма заказа:</span>
                            <span>{getTotalPrice()} ₽</span>
                          </div>
                          {deliveryMethod === 'delivery' && (
                            <div className="flex justify-between">
                              <span>Доставка:</span>
                              <span>{deliveryFee} ₽</span>
                            </div>
                          )}
                          <Separator />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Итого:</span>
                            <span>{getTotalPrice() + deliveryFee} ₽</span>
                          </div>
                        </div>
                        
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Наше меню</h1>
          <p className="text-xl text-muted-foreground">Выберите и закажите ваши любимые блюда</p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                  <Button onClick={() => addToCart(item)}>
                    <Icon name="Plus" size={20} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;
