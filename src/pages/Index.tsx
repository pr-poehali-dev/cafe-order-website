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

const Index = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

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

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      toast({
        title: 'Корзина пуста',
        description: 'Добавьте блюда в корзину',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заказ оформлен!',
      description: `Сумма: ${getTotalPrice()} ₽. Способ получения: ${deliveryMethod === 'delivery' ? 'Доставка' : 'Самовывоз'}`,
    });
    
    setCart([]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/5331cd08-968a-44b6-86a5-9f4b44ea9022.png" 
              alt="Сойка Кафе" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="hover:text-primary transition-colors">Главная</button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-primary transition-colors">Меню</button>
            <button onClick={() => scrollToSection('delivery')} className="hover:text-primary transition-colors">Доставка</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">О нас</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Услуги</button>
            <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
          </div>

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
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b">
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
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold mb-3 block">Способ получения</Label>
                        <RadioGroup value={deliveryMethod} onValueChange={(value: any) => setDeliveryMethod(value)}>
                          <div className="flex items-center space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value="delivery" id="delivery" />
                            <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Icon name="Truck" size={18} />
                                <span>Доставка</span>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value="pickup" id="pickup" />
                            <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Icon name="Store" size={18} />
                                <span>Самовывоз</span>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Итого:</span>
                          <span>{getTotalPrice()} ₽</span>
                        </div>
                        <Button onClick={handleOrder} className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <section id="hero" className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/img/46649d33-5f1a-40d1-a8f7-14495a2bc97a.jpg" 
            alt="Restaurant interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white space-y-6 animate-fade-in px-4">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Премиальная кухня</h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">Изысканные блюда от шеф-повара с доставкой на дом</p>
          <Button size="lg" onClick={() => scrollToSection('menu')} className="text-lg px-8">
            Посмотреть меню
          </Button>
        </div>
      </section>

      <section id="menu" className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Наше меню</h2>
          <p className="text-xl text-muted-foreground">Авторские блюда из лучших ингредиентов</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{item.price} ₽</span>
                  <Button onClick={() => addToCart(item)}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="delivery" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Доставка и самовывоз</h2>
            <p className="text-xl text-muted-foreground">Удобные варианты получения заказа</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-3">Доставка</h3>
              <p className="text-muted-foreground mb-4">Доставим ваш заказ в течение 60 минут</p>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-primary" />
                  <span>Бесплатная доставка от 2000 ₽</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-primary" />
                  <span>Доставка по всему городу</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-primary" />
                  <span>Отслеживание курьера онлайн</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 text-center">
              <Icon name="Store" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-3">Самовывоз</h3>
              <p className="text-muted-foreground mb-4">Забирайте заказ из ресторана</p>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-primary" />
                  <span>Скидка 10% на самовывоз</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-primary" />
                  <span>Готовность заказа за 30 минут</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-primary" />
                  <span>Удобная парковка</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">О нас</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Premium Café — это уютное место, где каждое блюдо создается с любовью и вниманием к деталям. 
              Наш шеф-повар использует только свежие продукты высшего качества.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы сочетаем классические рецепты с современными кулинарными техниками, 
              создавая незабываемые вкусовые впечатления для наших гостей.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12+</div>
                <div className="text-sm text-muted-foreground">Лет работы</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Блюд в меню</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Довольных гостей</div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img 
              src="/img/46649d33-5f1a-40d1-a8f7-14495a2bc97a.jpg" 
              alt="About us" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">Мы предлагаем больше, чем просто еду</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Icon name="Utensils" size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Банкеты</h3>
              <p className="text-muted-foreground">Организация торжественных мероприятий любого масштаба</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Icon name="Users" size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Кейтеринг</h3>
              <p className="text-muted-foreground">Выездное обслуживание корпоративных и частных мероприятий</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Icon name="Gift" size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Подарочные сертификаты</h3>
              <p className="text-muted-foreground">Идеальный подарок для ценителей изысканной кухни</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
          <p className="text-xl text-muted-foreground">Мы всегда рады видеть вас</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <Icon name="MapPin" size={32} className="mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Адрес</h3>
            <p className="text-muted-foreground">ул. Примерная, д. 123<br/>Москва, 101000</p>
          </Card>

          <Card className="p-6 text-center">
            <Icon name="Phone" size={32} className="mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Телефон</h3>
            <p className="text-muted-foreground">+7 (495) 123-45-67<br/>Ежедневно 10:00 - 23:00</p>
          </Card>

          <Card className="p-6 text-center">
            <Icon name="Mail" size={32} className="mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">info@premiumcafe.ru<br/>Ответим в течение часа</p>
          </Card>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2024 Premium Café. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;