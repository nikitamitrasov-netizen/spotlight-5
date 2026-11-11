/* Spotlight 5 — content, part 3: Modules 8–10 + exam revision */
(function () {

  /* ============================== MODULE 8 ============================== */
  SPOTLIGHT.modules.push({
    title: "Special days", ru: "Особые дни", icon: "🎉", color: "#ff7d7d",
    badge: "8", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Festivals", ru: "Праздники",
            blocks: [
              { type: "words", title: "Праздники круглый год", items: [
                ["New Year", "Новый год"], ["Christmas", "Рождество"], ["Easter", "Пасха"],
                ["Halloween", "Хэллоуин"], ["Valentine's Day", "День святого Валентина"],
                ["Mother's Day", "День матери"], ["Father's Day", "День отца"],
                ["birthday", "день рождения"], ["Thanksgiving", "День благодарения"],
                ["Maslenitsa", "Масленица"], ["Victory Day", "День Победы"], ["Women's Day", "8 Марта"]
              ] },
              { type: "words", title: "Атрибуты праздника", items: [
                ["party", "вечеринка"], ["present", "подарок"], ["guest", "гость"],
                ["balloon", "воздушный шар"], ["candle", "свеча"], ["card", "открытка"],
                ["decoration", "украшение"], ["fireworks", "фейерверк"], ["costume", "костюм"],
                ["pumpkin", "тыква"], ["treat", "угощение"], ["tradition", "традиция"]
              ] },
              { type: "phrase", title: "Поздравляем", items: [
                ["Happy birthday!", "С днём рождения!"],
                ["Merry Christmas!", "С Рождеством!"],
                ["Happy New Year!", "С Новым годом!"],
                ["Best wishes!", "Всего наилучшего!"],
                ["Many happy returns of the day!", "Долгих лет и счастья!"]
              ] }
            ]
          },
          {
            title: "Food", ru: "Еда",
            blocks: [
              { type: "words", title: "Продукты", items: [
                ["bread", "хлеб"], ["butter", "масло"], ["cheese", "сыр"], ["milk", "молоко"],
                ["eggs", "яйца"], ["meat", "мясо"], ["chicken", "курица"], ["fish", "рыба"],
                ["rice", "рис"], ["pasta", "паста"], ["soup", "суп"], ["salad", "салат"],
                ["sandwich", "бутерброд"], ["pizza", "пицца"], ["pie", "пирог"], ["cake", "торт"],
                ["biscuits", "печенье"], ["sweets", "конфеты"], ["chocolate", "шоколад"],
                ["ice cream", "мороженое"], ["fruit", "фрукты"], ["vegetables", "овощи"],
                ["juice", "сок"], ["tea", "чай"], ["coffee", "кофе"], ["water", "вода"]
              ] },
              { type: "phrase", title: "За столом", items: [
                ["Would you like some tea?", "Хочешь чаю?"],
                ["Yes, please. / No, thank you.", "Да, пожалуйста. / Нет, спасибо."],
                ["Help yourself!", "Угощайся!"],
                ["It's delicious!", "Это очень вкусно!"],
                ["I'm full, thank you.", "Я сыт, спасибо."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Countable & uncountable", ru: "Исчисляемые и неисчисляемые",
            blocks: [
              { type: "rule", title: "Можно посчитать или нет", items: [
                { title: "Countable", text: "Можно посчитать: <b>an apple, two apples, three cakes</b>. Есть единственное и множественное число.", examples: [["one biscuit — two biscuits", "одно печенье — два печенья"], ["an egg — some eggs", "яйцо — яйца"]] },
                { title: "Uncountable", text: "Не считаем по одному: <b>milk, bread, cheese, water, juice, meat, rice</b>. Они не имеют множественного числа и не сочетаются с <b>a/an</b>.", examples: [["some milk", "немного молока"], ["a piece of cheese", "кусочек сыра"]] },
                { title: "Как считать неисчисляемое", text: "Через упаковку или часть: <b>a glass of water, a piece of cake, a loaf of bread</b>.", examples: [["a bottle of juice", "бутылка сока"], ["two slices of pizza", "два куска пиццы"]] }
              ] },
              { type: "tip", text: "Некоторые слова могут быть и исчисляемыми, и неисчисляемыми: <b>a chicken</b> — курица (птица), <b>chicken</b> — куриное мясо. <b>a coffee</b> — одна чашка кофе." }
            ]
          },
          {
            title: "some / any, much / many", ru: "Количественные слова",
            blocks: [
              { type: "rule", title: "some и any", items: [
                { title: "some — в утверждении", text: "<b>some</b> + множественное или неисчисляемое: <b>some apples, some milk</b>. Также в просьбах и предложениях.", examples: [["There are some biscuits on the table.", "На столе есть печенье."], ["Would you like some juice?", "Хочешь сока?"]] },
                { title: "any — в отрицании и вопросе", text: "<b>any</b> в отрицаниях и вопросах: <b>We haven't got any milk. Is there any cake?</b>", examples: [["I don't have any sweets.", "У меня нет конфет."], ["Are there any apples?", "Есть яблоки?"]] }
              ] },
              { type: "rule", title: "much, many, a lot of", items: [
                { title: "many + исчисляемые", text: "<b>How many apples?</b> <b>Many friends.</b>", examples: [["How many biscuits do you want?", "Сколько печенья ты хочешь?"]] },
                { title: "much + неисчисляемые", text: "<b>How much milk?</b> <b>Not much time.</b>", examples: [["How much juice is there?", "Сколько сока?"]] },
                { title: "a lot of — универсально", text: "<b>a lot of</b> подходит и к исчисляемым, и к неисчисляемым, чаще в утверждении.", examples: [["There are a lot of guests.", "Много гостей."], ["There is a lot of food.", "Много еды."]] }
              ] },
              { type: "table", title: "Шпаргалка", head: ["", "Исчисляемые", "Неисчисляемые"], rows: [
                ["Утверждение", "some / a lot of / many", "some / a lot of / much"],
                ["Отрицание", "any / not many", "any / not much"],
                ["Вопрос", "any / how many", "any / how much"]
              ] }
            ]
          },
          {
            title: "Containers", ru: "Упаковки и порции",
            blocks: [
              { type: "words", title: "Как подают еду", items: [
                ["a bottle of", "бутылка"], ["a glass of", "стакан"], ["a cup of", "чашка"],
                ["a piece of", "кусок"], ["a slice of", "ломтик"], ["a loaf of", "буханка"],
                ["a bar of", "плитка"], ["a packet of", "пачка"], ["a tin of", "жестяная банка"],
                ["a jar of", "стеклянная банка"], ["a carton of", "картонная упаковка"], ["a bowl of", "миска"]
              ] },
              { type: "phrase", title: "Примеры", items: [
                ["a bottle of water", "бутылка воды"],
                ["a glass of juice", "стакан сока"],
                ["a slice of cake", "кусок торта"],
                ["a bar of chocolate", "плитка шоколада"],
                ["a packet of biscuits", "пачка печенья"],
                ["a bowl of soup", "миска супа"]
              ] }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "Ordering food", ru: "Заказываем еду",
            blocks: [
              { type: "phrase", title: "В кафе", items: [
                ["Can I help you?", "Я могу вам помочь?"],
                ["I'd like a pizza, please.", "Я хотел бы пиццу, пожалуйста."],
                ["Can I have some juice?", "Можно мне сок?"],
                ["Anything else?", "Что-нибудь ещё?"],
                ["That's all, thanks.", "Это всё, спасибо."],
                ["How much is it?", "Сколько это стоит?"],
                ["Here you are.", "Вот, пожалуйста."],
                ["Enjoy your meal!", "Приятного аппетита!"]
              ] }
            ]
          },
          {
            title: "Invitations", ru: "Приглашения",
            blocks: [
              { type: "phrase", title: "Приглашаем и отвечаем", items: [
                ["Would you like to come to my party?", "Хочешь прийти на мою вечеринку?"],
                ["Yes, I'd love to.", "Да, с удовольствием."],
                ["Sorry, I can't.", "Извини, я не могу."],
                ["What time does it start?", "Во сколько начало?"],
                ["It starts at six.", "Начало в шесть."],
                ["See you there!", "Увидимся там!"]
              ] }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Maslenitsa & British festivals", ru: "Масленица и праздники Британии",
            blocks: [
              { type: "note", title: "Праздники и еда", text: [
                "Масленица — древний славянский праздник проводов зимы. Всю неделю пекут блины, ходят в гости, устраивают гуляния, а в конце сжигают чучело зимы. Блины символизируют солнце и тепло.",
                "В Британии отмечают Рождество 25 декабря и Boxing Day 26 декабря, Пасху, Хэллоуин 31 октября и Ночь костров 5 ноября. На Рождество едят индейку и рождественский пудинг, дарят подарки и украшают дом."
              ] },
              { type: "words", title: "Праздничные слова", items: [
                ["pancake", "блин"], ["effigy", "чучело"], ["farewell to winter", "проводы зимы"],
                ["turkey", "индейка"], ["Christmas pudding", "рождественский пудинг"],
                ["Boxing Day", "День подарков (26 декабря)"], ["Bonfire Night", "Ночь костров"],
                ["fireworks", "фейерверк"]
              ] },
              { type: "phrase", title: "Сравниваем", items: [
                ["In Russia, we eat pancakes at Maslenitsa.", "В России на Масленицу едят блины."],
                ["In Britain, people eat turkey at Christmas.", "В Британии на Рождество едят индейку."],
                ["Both holidays bring families together.", "Оба праздника собирают семьи вместе."]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== MODULE 9 ============================== */
  SPOTLIGHT.modules.push({
    title: "Modern living", ru: "Современная жизнь", icon: "🛍️", color: "#f7c948",
    badge: "9", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Shops & places", ru: "Магазины и места",
            blocks: [
              { type: "words", title: "Куда мы идём за покупками", items: [
                ["bakery", "пекарня"], ["butcher's", "мясная лавка"], ["chemist's", "аптека"],
                ["newsagent's", "газетный киоск"], ["greengrocer's", "овощной магазин"],
                ["supermarket", "супермаркет"], ["shopping centre", "торговый центр"],
                ["bookshop", "книжный магазин"], ["toy shop", "магазин игрушек"],
                ["clothes shop", "магазин одежды"], ["shoe shop", "обувной магазин"],
                ["sports shop", "спортивный магазин"], ["pet shop", "зоомагазин"],
                ["café", "кафе"], ["restaurant", "ресторан"], ["bank", "банк"],
                ["post office", "почта"], ["cinema", "кинотеатр"], ["library", "библиотека"]
              ] },
              { type: "phrase", title: "Где купить?", items: [
                ["Where can I buy bread? — At the bakery.", "Где купить хлеб? — В пекарне."],
                ["I need some medicine.", "Мне нужно лекарство."],
                ["Let's go to the shopping centre.", "Пойдём в торговый центр."],
                ["The toy shop is next to the café.", "Магазин игрушек рядом с кафе."]
              ] }
            ]
          },
          {
            title: "Shopping & money", ru: "Покупки и деньги",
            blocks: [
              { type: "words", title: "В магазине", items: [
                ["customer", "покупатель"], ["shop assistant", "продавец"], ["price", "цена"],
                ["size", "размер"], ["change", "сдача"], ["receipt", "чек"],
                ["sale", "распродажа"], ["discount", "скидка"], ["trolley", "тележка"],
                ["basket", "корзина"], ["queue", "очередь"], ["pocket money", "карманные деньги"]
              ] },
              { type: "words", title: "Деньги", items: [
                ["pound", "фунт"], ["pence", "пенс"], ["dollar", "доллар"], ["cent", "цент"],
                ["rouble", "рубль"], ["coin", "монета"], ["note", "банкнота"], ["bank card", "банковская карта"]
              ] },
              { type: "phrase", title: "Сколько стоит?", items: [
                ["How much does it cost?", "Сколько это стоит?"],
                ["It costs five pounds.", "Это стоит пять фунтов."],
                ["That's cheap / expensive.", "Это дёшево / дорого."],
                ["Can I pay by card?", "Можно оплатить картой?"],
                ["Here's your change.", "Вот ваша сдача."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Past Simple: was / were", ru: "Past Simple: was и were",
            blocks: [
              { type: "rule", title: "Было в прошлом", items: [
                { title: "was / were", text: "<b>I / he / she / it was</b>; <b>you / we / they were</b>. Это прошедшая форма глагола <b>to be</b>.", examples: [["I was at the shop yesterday.", "Вчера я был в магазине."], ["They were at home.", "Они были дома."]] },
                { title: "Отрицание и вопрос", text: "<b>wasn't / weren't</b>; <b>Was he…? Were they…?</b>", examples: [["She wasn't at school.", "Её не было в школе."], ["Were you at the cinema? — Yes, I was.", "Ты был в кино? — Да."]] },
                { title: "There was / there were", text: "<b>There was</b> — один предмет, <b>There were</b> — несколько.", examples: [["There was a big sale yesterday.", "Вчера была большая распродажа."], ["There were a lot of people.", "Было много людей."]] }
              ] }
            ]
          },
          {
            title: "Regular verbs", ru: "Правильные глаголы",
            blocks: [
              { type: "rule", title: "Как образовать Past Simple", items: [
                { title: "+ -ed", text: "К правильному глаголу добавляем <b>-ed</b>: <b>play → played</b>, <b>visit → visited</b>. У неправильных глаголов своя форма — её нужно запомнить.", examples: [["play → played", "играл"], ["visit → visited", "посетил"]] },
                { title: "Правописание", text: "Немая <b>-e</b>: + <b>-d</b> (<b>like → liked</b>). Согласная + <b>y</b> → <b>ied</b> (<b>study → studied</b>). Короткий слог удваивается (<b>stop → stopped</b>).", examples: [["live → lived", "жил"], ["carry → carried", "нёс"], ["plan → planned", "планировал"]] },
                { title: "Как читается -ed", text: "<b>/t/</b> после глухих (worked), <b>/d/</b> после звонких (played), <b>/ɪd/</b> после t/d (wanted).", examples: [["watched", "смотрел"], ["opened", "открыл"], ["needed", "нуждался"]] }
              ] }
            ]
          },
          {
            title: "Irregular verbs", ru: "Неправильные глаголы",
            blocks: [
              { type: "table", title: "20 самых нужных", head: ["Infinitive", "Past", "Перевод"], rows: [
                ["be", "was / were", "быть"], ["have", "had", "иметь"], ["do", "did", "делать"],
                ["go", "went", "идти"], ["see", "saw", "видеть"], ["eat", "ate", "есть"],
                ["buy", "bought", "покупать"], ["take", "took", "брать"], ["make", "made", "делать"],
                ["get", "got", "получать"], ["give", "gave", "давать"], ["come", "came", "приходить"],
                ["meet", "met", "встречать"], ["read", "read", "читать"], ["write", "wrote", "писать"],
                ["drink", "drank", "пить"], ["find", "found", "находить"], ["tell", "told", "рассказывать"],
                ["say", "said", "говорить"], ["swim", "swam", "плавать"]
              ] },
              { type: "tip", text: "<b>read</b> пишется одинаково в трёх формах, но произносится по-разному: <b>/riːd/ — /red/ — /red/</b>." }
            ]
          },
          {
            title: "Negatives & questions", ru: "Отрицание и вопрос",
            blocks: [
              { type: "rule", title: "did / didn't", items: [
                { title: "Отрицание", text: "<b>didn't + глагол в начальной форме</b>. Глагол больше не меняется!", examples: [["I didn't buy anything.", "Я ничего не купил."], ["She didn't go to the shop.", "Она не пошла в магазин."]] },
                { title: "Вопрос", text: "<b>Did you…?</b> + начальная форма. Краткие ответы: <b>Yes, I did. / No, I didn't.</b>", examples: [["Did you see the sale?", "Ты видел распродажу?"], ["Did they buy a present? — Yes, they did.", "Они купили подарок? — Да."]] },
                { title: "Специальный вопрос", text: "<b>What did you buy? Where did you go?</b>", examples: [["What did you buy yesterday?", "Что ты купил вчера?"], ["Where did she go?", "Куда она пошла?"]] }
              ] }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "In a shop", ru: "В магазине",
            blocks: [
              { type: "phrase", title: "Диалог с продавцом", items: [
                ["Can I help you?", "Я могу вам помочь?"],
                ["I'm looking for a present.", "Я ищу подарок."],
                ["How much is it?", "Сколько это стоит?"],
                ["It's ten pounds.", "Это десять фунтов."],
                ["Can I pay by card?", "Можно оплатить картой?"],
                ["Of course. Here's your receipt.", "Конечно. Вот ваш чек."],
                ["Thank you. Have a nice day!", "Спасибо. Хорошего дня!"]
              ] }
            ]
          },
          {
            title: "Talking about the past", ru: "Говорим о прошлом",
            blocks: [
              { type: "phrase", title: "Вчера и на прошлой неделе", items: [
                ["Where did you go yesterday?", "Куда ты ходил вчера?"],
                ["I went to the shopping centre.", "Я ходил в торговый центр."],
                ["What did you buy?", "Что ты купил?"],
                ["I bought a new T-shirt.", "Я купил новую футболку."],
                ["Did you like it?", "Тебе понравилось?"],
                ["Yes, it was great.", "Да, было здорово."],
                ["I didn't buy anything.", "Я ничего не купил."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Shopping in Russia and the UK", ru: "Покупки в России и Британии",
            blocks: [
              { type: "note", title: "Где и как покупают", text: [
                "В России популярны торговые центры, супермаркеты и рынки. На рынках можно торговаться, а в магазинах действуют скидки и карты лояльности. Расплачиваются рублями, всё чаще — картой или телефоном.",
                "В Британии деньги — фунты и пенсы. На главных улицах городов стоят большие магазины, а по выходным работают рынки. Harrods и Hamleys в Лондоне известны на весь мир, а Oxford Street — одна из самых оживлённых торговых улиц."
              ] },
              { type: "words", title: "Покупки по-британски", items: [
                ["pound", "фунт"], ["pence", "пенс"], ["queue", "очередь"],
                ["market", "рынок"], ["high street", "главная торговая улица"],
                ["shop assistant", "продавец"], ["receipt", "чек"], ["sale", "распродажа"]
              ] },
              { type: "phrase", title: "Сравниваем", items: [
                ["In Russia, we pay in roubles.", "В России мы платим рублями."],
                ["In Britain, people pay in pounds.", "В Британии люди платят фунтами."],
                ["In both countries, people love shopping centres.", "В обеих странах любят торговые центры."]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== MODULE 10 ============================== */
  SPOTLIGHT.modules.push({
    title: "Holidays", ru: "Каникулы", icon: "✈️", color: "#ff9f6e",
    badge: "10", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Transport", ru: "Транспорт",
            blocks: [
              { type: "words", title: "На чём путешествуем", items: [
                ["plane", "самолёт"], ["train", "поезд"], ["bus", "автобус"], ["coach", "междугородний автобус"],
                ["car", "машина"], ["taxi", "такси"], ["ship", "корабль"], ["boat", "лодка"],
                ["ferry", "паром"], ["bike", "велосипед"], ["motorbike", "мотоцикл"],
                ["underground", "метро"], ["tram", "трамвай"]
              ] },
              { type: "phrase", title: "Как добраться", items: [
                ["I go to school by bus.", "Я езжу в школу на автобусе."],
                ["We travelled by train.", "Мы путешествовали на поезде."],
                ["I went there on foot.", "Я ходил туда пешком."],
                ["How do you get to the airport?", "Как добраться до аэропорта?"]
              ] },
              { type: "tip", text: "С видами транспорта используем <b>by</b>: <b>by car, by plane, by train</b>. Пешком — <b>on foot</b>." }
            ]
          },
          {
            title: "Travel & places", ru: "Путешествие и места",
            blocks: [
              { type: "words", title: "В дороге", items: [
                ["airport", "аэропорт"], ["railway station", "железнодорожный вокзал"],
                ["ticket", "билет"], ["passport", "паспорт"], ["luggage", "багаж"],
                ["suitcase", "чемодан"], ["backpack", "рюкзак"], ["map", "карта"],
                ["guide", "гид / путеводитель"], ["hotel", "отель"], ["campsite", "кемпинг"],
                ["beach", "пляж"], ["sea", "море"], ["mountains", "горы"], ["lake", "озеро"],
                ["forest", "лес"], ["souvenir", "сувенир"], ["sightseeing", "осмотр достопримечательностей"]
              ] },
              { type: "words", title: "Чем заняться", items: [
                ["swim", "плавать"], ["sunbathe", "загорать"], ["build a sandcastle", "строить замок из песка"],
                ["go hiking", "ходить в поход"], ["go camping", "жить в палатках"],
                ["go sightseeing", "осматривать достопримечательности"], ["take photos", "фотографировать"],
                ["visit museums", "посещать музеи"], ["ride a bike", "кататься на велосипеде"],
                ["play volleyball", "играть в волейбол"], ["fish", "рыбачить"], ["sail", "ходить под парусом"]
              ] }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Past Simple review", ru: "Past Simple: повторение",
            blocks: [
              { type: "rule", title: "Три способа сказать о прошлом", items: [
                { title: "Правильные глаголы", text: "<b>V + -ed</b>: <b>visited, played, travelled</b>.", examples: [["We visited the museum.", "Мы посетили музей."], ["They played volleyball on the beach.", "Они играли в волейбол на пляже."]] },
                { title: "Неправильные глаголы", text: "Вторая форма: <b>go → went, see → saw, swim → swam</b>.", examples: [["I went to Sochi last summer.", "Прошлым летом я ездил в Сочи."], ["She saw a dolphin.", "Она видела дельфина."]] },
                { title: "Отрицание и вопрос", text: "<b>didn't + V</b>, <b>Did … + V?</b>", examples: [["We didn't go camping.", "Мы не ходили в поход."], ["Did you like the hotel? — Yes, I did.", "Тебе понравился отель? — Да."]] }
              ] },
              { type: "tip", text: "Маркеры прошлого: <b>yesterday, last week, last summer, two days ago, in 2024</b>." }
            ]
          },
          {
            title: "can / could", ru: "Просьбы: can и could",
            blocks: [
              { type: "rule", title: "Вежливые просьбы", items: [
                { title: "Can I…?", text: "Разрешение в неформальной ситуации: <b>Can I take a photo?</b>", examples: [["Can I have your ticket, please?", "Можно ваш билет?"], ["Can I open the window?", "Можно открыть окно?"]] },
                { title: "Could I / you…?", text: "<b>Could</b> — более вежливо: <b>Could you help me?</b> <b>Could I book a room?</b>", examples: [["Could you call a taxi, please?", "Не могли бы вы вызвать такси?"], ["Could I see the menu?", "Можно посмотреть меню?"]] },
                { title: "Ответы", text: "<b>Yes, of course. / Sure. / I'm afraid not.</b>", examples: [["Could you open the window? — Of course.", "Не могли бы вы открыть окно? — Конечно."]] }
              ] },
              { type: "tip", text: "<b>Could</b> — это также прошедшая форма <b>can</b>: <i>When I was five, I could swim.</i> Но в просьбах это отдельная вежливая конструкция." }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "Booking a hotel", ru: "Бронируем отель",
            blocks: [
              { type: "phrase", title: "Диалог на ресепшене", items: [
                ["I'd like to book a room.", "Я хотел бы забронировать номер."],
                ["Single or double?", "Одноместный или двухместный?"],
                ["A double room, please.", "Двухместный, пожалуйста."],
                ["How much is it per night?", "Сколько стоит за ночь?"],
                ["Is breakfast included?", "Завтрак включён?"],
                ["Yes, it is.", "Да."],
                ["When is check-in?", "Во сколько заезд?"],
                ["Check-in is at 2 p.m.", "Заезд в 14:00."]
              ] }
            ]
          },
          {
            title: "My holiday", ru: "Мои каникулы",
            blocks: [
              { type: "phrase", title: "Рассказ о поездке", items: [
                ["Where did you go?", "Куда ты ездил?"],
                ["I went to the sea with my family.", "Я ездил на море с семьёй."],
                ["We travelled by train.", "Мы ехали на поезде."],
                ["We stayed in a small hotel.", "Мы жили в маленьком отеле."],
                ["The weather was sunny and warm.", "Погода была солнечная и тёплая."],
                ["I swam, sunbathed and built sandcastles.", "Я плавал, загорал и строил замки из песка."],
                ["It was a great holiday.", "Это были отличные каникулы."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Holidays in Russia and the UK", ru: "Каникулы в России и Британии",
            blocks: [
              { type: "note", title: "Куда едут отдыхать", text: [
                "В России любят отдыхать на Чёрном море — в Сочи и Крыму, на Байкале, в Карелии и городах Золотого кольца. Многие проводят лето на даче, ходят в походы и путешествуют на поездах.",
                "В Британии популярны морские курорты Брайтон и Блэкпул, озёрный край Lake District и кемпинги. Британцы часто бронируют недорогие авиабилеты и ездят на выходные в Европу."
              ] },
              { type: "words", title: "Отдых", items: [
                ["seaside", "морское побережье"], ["resort", "курорт"], ["camping", "кемпинг"],
                ["caravan", "дом на колёсах"], ["hiking", "поход"], ["sightseeing", "достопримечательности"],
                ["package holiday", "тур с проживанием"], ["booking", "бронирование"]
              ] },
              { type: "phrase", title: "Сравниваем", items: [
                ["In Russia, many people go to the Black Sea.", "В России многие едут на Чёрное море."],
                ["In Britain, Brighton is a popular seaside resort.", "В Британии Брайтон — популярный морской курорт."],
                ["Both countries have beautiful lakes and mountains.", "В обеих странах есть красивые озёра и горы."]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== EXAM ============================== */
  SPOTLIGHT.modules.push({
    title: "Exam prep", ru: "Повторение и экзамен", icon: "🏆", color: "#e879f9",
    badge: "★", kind: "exam",
    branches: [
      {
        title: "Grammar map", ru: "Карта грамматики", icon: "🧩",
        leaves: [
          {
            title: "Tenses", ru: "Времена и конструкции",
            blocks: [
              { type: "table", title: "Всё главное за 5 класс", head: ["Конструкция", "Формула", "Когда", "Пример"], rows: [
                ["to be", "am / is / are", "кто есть кто", "I am a pupil."],
                ["Present Simple", "V / V-s", "обычно", "He plays football."],
                ["Present Continuous", "am/is/are + V-ing", "прямо сейчас", "She is reading."],
                ["Past Simple", "V2 / V-ed", "в прошлом", "We went to the park."],
                ["can", "can + V", "умение, просьба", "I can swim."],
                ["have got", "have/has got", "у меня есть", "She has got a cat."],
                ["there is / are", "there is/are + N", "что-то есть", "There are two chairs."]
              ] },
              { type: "rule", title: "Как выбрать время", items: [
                { title: "Смотрите на маркеры", text: "<b>every day, usually</b> → Present Simple. <b>now, at the moment, Look!</b> → Present Continuous. <b>yesterday, last week, ago</b> → Past Simple.", examples: [["I usually walk to school.", "Я обычно хожу в школу пешком."], ["I am walking to school now.", "Сейчас я иду в школу."], ["I walked to school yesterday.", "Вчера я шёл в школу."]] }
              ] }
            ]
          },
          {
            title: "Pronouns & prepositions", ru: "Местоимения и предлоги",
            blocks: [
              { type: "table", title: "Местоимения", head: ["Личное", "Притяжательное", "Объектное"], rows: [
                ["I", "my", "me"], ["you", "your", "you"], ["he", "his", "him"], ["she", "her", "her"],
                ["it", "its", "it"], ["we", "our", "us"], ["they", "their", "them"]
              ] },
              { type: "table", title: "Предлоги места и времени", head: ["Предлог", "Место", "Время"], rows: [
                ["in", "in the box", "in May, in winter, in the morning"],
                ["on", "on the table", "on Monday, on the 5th of May"],
                ["at", "at school, at home", "at 7 o'clock, at night, at the weekend"],
                ["under / behind / next to", "под / за / рядом", "—"],
                ["between / opposite", "между / напротив", "—"]
              ] },
              { type: "tip", text: "Артикли: <b>a/an</b> — любой предмет впервые, <b>the</b> — конкретный, уже известный. <i>I have a cat. The cat is black.</i>" }
            ]
          },
          {
            title: "Irregular verbs · 40", ru: "Неправильные глаголы",
            blocks: [
              { type: "table", title: "40 глаголов для экзамена", head: ["V1", "V2", "V3", "Перевод"], rows: [
                ["be", "was/were", "been", "быть"], ["have", "had", "had", "иметь"], ["do", "did", "done", "делать"],
                ["go", "went", "gone", "идти"], ["see", "saw", "seen", "видеть"], ["eat", "ate", "eaten", "есть"],
                ["drink", "drank", "drunk", "пить"], ["buy", "bought", "bought", "покупать"],
                ["bring", "brought", "brought", "приносить"], ["take", "took", "taken", "брать"],
                ["make", "made", "made", "делать"], ["get", "got", "got", "получать"],
                ["give", "gave", "given", "давать"], ["come", "came", "come", "приходить"],
                ["run", "ran", "run", "бежать"], ["swim", "swam", "swum", "плавать"],
                ["write", "wrote", "written", "писать"], ["read", "read", "read", "читать"],
                ["speak", "spoke", "spoken", "говорить"], ["tell", "told", "told", "рассказывать"],
                ["say", "said", "said", "говорить"], ["find", "found", "found", "находить"],
                ["meet", "met", "met", "встречать"], ["leave", "left", "left", "уходить"],
                ["sleep", "slept", "slept", "спать"], ["put", "put", "put", "класть"],
                ["cut", "cut", "cut", "резать"], ["ride", "rode", "ridden", "кататься"],
                ["fly", "flew", "flown", "летать"], ["sing", "sang", "sung", "петь"],
                ["draw", "drew", "drawn", "рисовать"], ["think", "thought", "thought", "думать"],
                ["teach", "taught", "taught", "учить"], ["catch", "caught", "caught", "ловить"],
                ["build", "built", "built", "строить"], ["lose", "lost", "lost", "терять"],
                ["win", "won", "won", "побеждать"], ["sit", "sat", "sat", "сидеть"],
                ["stand", "stood", "stood", "стоять"], ["wear", "wore", "worn", "носить"]
              ] },
              { type: "tip", text: "Учите глаголы тройками и сразу с переводом: <b>go — went — gone — идти</b>. Проверяйте себя, закрывая столбец." }
            ]
          }
        ]
      },
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Topics overview", ru: "Все темы кратко",
            blocks: [
              { type: "table", title: "Модуль → тема → ключевые слова", head: ["Модуль", "Тема", "Слова"], rows: [
                ["Starter", "Алфавит, числа, цвета", "alphabet, twenty, red, pencil"],
                ["1", "Школа", "school objects, subjects, to be"],
                ["2", "Это я", "countries, things, plurals, have got"],
                ["3", "Дом", "rooms, furniture, there is/are"],
                ["4", "Семья", "family, appearance, can, possessive"],
                ["5", "Животные", "animals, Present Simple"],
                ["6", "Распорядок", "daily routine, time, prepositions"],
                ["7", "Погода", "weather, clothes, Present Continuous"],
                ["8", "Праздники", "festivals, food, some/any"],
                ["9", "Покупки", "shops, money, Past Simple"],
                ["10", "Каникулы", "travel, transport, Past Simple"]
              ] },
              { type: "note", title: "Как повторять лексику", text: [
                "Разделите слова на темы и учите по 10–12 штук за подход. Сначала узнавание (слово → перевод), потом воспроизведение (перевод → слово), затем употребление в предложении.",
                "Полезно объединять слова в пары и противоположности: <b>big — small</b>, <b>hot — cold</b>, <b>buy — sell</b>. Так слова запоминаются сетью, а не списком."
              ] }
            ]
          }
        ]
      },
      {
        title: "Study tips", ru: "Как учиться", icon: "💡",
        leaves: [
          {
            title: "How to learn words", ru: "Как учить слова",
            blocks: [
              { type: "note", title: "Пять шагов", text: [
                "1. Произнесите слово вслух и послушайте его в карточках. 2. Запишите слово и перевод в тетрадь. 3. Придумайте с ним короткое предложение. 4. Повторите через день, через три дня и через неделю. 5. Используйте слово в речи или в письме."
              ] },
              { type: "note", title: "Что помогает", bullets: [
                "Учите слова тематическими блоками — так работает ассоциативная память.",
                "Проговаривайте вслух: слуховая и моторная память сильнее зрительной.",
                "Повторяйте перед сном и утром — это улучшает закрепление.",
                "Не учите больше 15 новых слов за один раз.",
                "Отмечайте изученные темы в карте — видимый прогресс мотивирует."
              ] }
            ]
          },
          {
            title: "How to do a test", ru: "Как выполнять тест",
            blocks: [
              { type: "note", title: "Стратегия", bullets: [
                "Сначала прочитайте всё задание и пример. Пример показывает формат ответа.",
                "Найдите маркеры времени: <b>now</b>, <b>usually</b>, <b>yesterday</b> — они подсказывают время глагола.",
                "Проверьте согласование: <b>he/she/it</b> → <b>-s</b> в Present Simple, <b>was</b> в Past Simple.",
                "В вопросах с <b>did</b> и <b>does</b> глагол стоит без окончания.",
                "Оставьте 2–3 минуты на проверку: артикли, предлоги, окончания."
              ] },
              { type: "tip", text: "Если не знаете слово — не оставляйте пропуск. Подумайте о контексте: часто ответ подсказывает само предложение." }
            ]
          }
        ]
      }
    ]
  });

})();
