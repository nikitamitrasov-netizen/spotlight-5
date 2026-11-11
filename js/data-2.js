/* Spotlight 5 — content, part 2: Modules 4–7 */
(function () {

  /* ============================== MODULE 4 ============================== */
  SPOTLIGHT.modules.push({
    title: "My family", ru: "Моя семья", icon: "👨‍👩‍👧", color: "#4fd1a5",
    badge: "4", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Family members", ru: "Члены семьи",
            blocks: [
              { type: "words", title: "Семейное дерево", items: [
                ["mother / mum", "мама"], ["father / dad", "папа"], ["parents", "родители"],
                ["sister", "сестра"], ["brother", "брат"], ["grandmother / grandma", "бабушка"],
                ["grandfather / grandpa", "дедушка"], ["grandparents", "бабушка и дедушка"],
                ["aunt", "тётя"], ["uncle", "дядя"], ["cousin", "двоюродный брат / сестра"],
                ["son", "сын"], ["daughter", "дочь"], ["wife", "жена"], ["husband", "муж"],
                ["child / children", "ребёнок / дети"], ["nephew", "племянник"], ["niece", "племянница"]
              ] },
              { type: "tip", text: "Слово <b>parents</b> — «родители», а <b>relatives</b> — «родственники» (более широко: тёти, дяди, cousins). <b>My parents are…</b>, но <b>my family is…</b>." }
            ]
          },
          {
            title: "Appearance", ru: "Внешность",
            blocks: [
              { type: "words", title: "Как выглядит человек", items: [
                ["tall", "высокий"], ["short", "низкий"], ["slim", "стройный"], ["plump", "полный"],
                ["young", "молодой"], ["old", "пожилой"], ["middle-aged", "средних лет"],
                ["beautiful", "красивая"], ["handsome", "красивый (о мужчине)"], ["pretty", "милая"],
                ["cute", "милый"], ["curly hair", "кудрявые волосы"], ["straight hair", "прямые волосы"],
                ["wavy hair", "волнистые волосы"], ["fair hair", "светлые волосы"], ["dark hair", "тёмные волосы"],
                ["blue eyes", "голубые глаза"], ["brown eyes", "карие глаза"], ["glasses", "очки"],
                ["beard", "борода"], ["moustache", "усы"]
              ] },
              { type: "phrase", title: "Описываем внешность", items: [
                ["He is tall and slim.", "Он высокий и стройный."],
                ["She has got long curly hair.", "У неё длинные кудрявые волосы."],
                ["He wears glasses.", "Он носит очки."],
                ["My mum is beautiful.", "Моя мама красивая."],
                ["They look young.", "Они выглядят молодо."]
              ] }
            ]
          },
          {
            title: "Character", ru: "Характер",
            blocks: [
              { type: "words", title: "Черты характера", items: [
                ["kind", "добрый"], ["friendly", "дружелюбный"], ["clever", "умный"],
                ["funny", "смешной"], ["brave", "смелый"], ["shy", "застенчивый"],
                ["naughty", "непослушный"], ["caring", "заботливый"], ["honest", "честный"],
                ["lazy", "ленивый"], ["hard-working", "трудолюбивый"], ["polite", "вежливый"],
                ["quiet", "тихий"], ["talkative", "разговорчивый"], ["athletic", "спортивный"],
                ["creative", "творческий"]
              ] },
              { type: "phrase", title: "Говорим о характере", items: [
                ["My sister is very kind.", "Моя сестра очень добрая."],
                ["He is a bit shy.", "Он немного застенчивый."],
                ["She is always ready to help.", "Она всегда готова помочь."],
                ["We are very different.", "Мы очень разные."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Possessive case", ru: "Притяжательный падеж",
            blocks: [
              { type: "rule", title: "Чей? Кому принадлежит?", items: [
                { title: "Один человек → 's", text: "К существительному добавляем <b>'s</b>: <b>my mum's bag</b> — сумка моей мамы.", examples: [["This is Tom's bike.", "Это велосипед Тома."], ["My sister's room is big.", "Комната моей сестры большая."]] },
                { title: "Множественное число → '", text: "Если слово уже заканчивается на <b>-s</b>, добавляем только апостроф: <b>the boys' room</b>.", examples: [["the students' books", "книги студентов"], ["my parents' car", "машина моих родителей"]] },
                { title: "Особые случаи", text: "Если множественное число без <b>-s</b>, снова <b>'s</b>: <b>the children's room</b>. С именами: <b>James's car</b> или <b>James' car</b>.", examples: [["the children's toys", "игрушки детей"], ["James's book", "книга Джеймса"]] }
              ] },
              { type: "tip", text: "Не путайте: <b>my mum's bag</b> — сумка мамы, <b>my mum is…</b> — моя мама (глагол). На письме апостроф решает всё." }
            ]
          },
          {
            title: "can / can't", ru: "Модальный глагол can",
            blocks: [
              { type: "rule", title: "Умею, могу", items: [
                { title: "Утверждение", text: "<b>can + глагол</b> без <b>to</b>. Форма <b>can</b> одинакова для всех: <b>I can swim. She can swim.</b>", examples: [["I can cook.", "Я умею готовить."], ["He can play the guitar.", "Он умеет играть на гитаре."]] },
                { title: "Отрицание", text: "<b>cannot / can't</b>.", examples: [["I can't swim very well.", "Я не очень хорошо плаваю."], ["She can't come today.", "Она не может прийти сегодня."]] },
                { title: "Вопрос и ответ", text: "<b>Can you…?</b> — <b>Yes, I can. / No, I can't.</b>", examples: [["Can you help me?", "Можешь мне помочь?"], ["Can he ride a bike? — Yes, he can.", "Он умеет кататься на велосипеде? — Да."]] }
              ] },
              { type: "tip", text: "<b>Can</b> также используется для просьбы: <i>Can you open the window, please?</i> — вежливая просьба." }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "About my family", ru: "Рассказ о семье",
            blocks: [
              { type: "phrase", title: "Моя семья", items: [
                ["I've got a big family.", "У меня большая семья."],
                ["There are five of us.", "Нас пятеро."],
                ["My mum is a doctor.", "Моя мама врач."],
                ["My dad works in an office.", "Мой папа работает в офисе."],
                ["My grandparents live in the country.", "Мои бабушка и дедушка живут в деревне."],
                ["I have got a younger sister.", "У меня есть младшая сестра."],
                ["We often spend time together.", "Мы часто проводим время вместе."],
                ["My family is very friendly.", "Моя семья очень дружная."]
              ] },
              { type: "phrase", title: "Описываем человека", items: [
                ["Who is this? — This is my cousin.", "Кто это? — Это мой двоюродный брат."],
                ["He is tall and has got dark hair.", "Он высокий, у него тёмные волосы."],
                ["She is kind and funny.", "Она добрая и смешная."],
                ["He can cook very well.", "Он очень хорошо готовит."],
                ["They are my best friends.", "Они мои лучшие друзья."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Family traditions", ru: "Семейные традиции",
            blocks: [
              { type: "note", title: "Семья в России и Британии", text: [
                "В России семьи часто большие: бабушки и дедушки помогают растить внуков, а лето многие проводят на даче. Новый год, 8 Марта и день рождения — поводы собраться за большим столом.",
                "В Британии популярен воскресный обед (Sunday roast), когда вся семья собирается вместе. На Рождество и Boxing Day принято дарить подарки и навещать родственников, а традиция afternoon tea — чай с бутербродами и сладостями — до сих пор живёт в семьях."
              ] },
              { type: "words", title: "Слова о традициях", items: [
                ["tradition", "традиция"], ["celebrate", "праздновать"], ["gather", "собираться"],
                ["relatives", "родственники"], ["Sunday roast", "воскресный обед"],
                ["afternoon tea", "послеобеденный чай"], ["gift", "подарок"], ["memory", "воспоминание"]
              ] },
              { type: "phrase", title: "Рассказываем о традиции", items: [
                ["We celebrate New Year together.", "Мы вместе празднуем Новый год."],
                ["Every Sunday we have dinner together.", "Каждое воскресенье мы ужинаем вместе."],
                ["My grandmother tells us family stories.", "Бабушка рассказывает нам семейные истории."]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== MODULE 5 ============================== */
  SPOTLIGHT.modules.push({
    title: "World animals", ru: "Животные мира", icon: "🐾", color: "#5ad2e8",
    badge: "5", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Animals", ru: "Животные",
            blocks: [
              { type: "words", title: "Дикие и домашние", items: [
                ["lion", "лев"], ["tiger", "тигр"], ["elephant", "слон"], ["monkey", "обезьяна"],
                ["giraffe", "жираф"], ["zebra", "зебра"], ["bear", "медведь"], ["wolf", "волк"],
                ["fox", "лиса"], ["rabbit", "кролик"], ["horse", "лошадь"], ["cow", "корова"],
                ["sheep", "овца"], ["goat", "коза"], ["pig", "свинья"], ["dog", "собака"],
                ["cat", "кошка"], ["parrot", "попугай"], ["snake", "змея"], ["crocodile", "крокодил"],
                ["kangaroo", "кенгуру"], ["panda", "панда"], ["dolphin", "дельфин"], ["penguin", "пингвин"]
              ] },
              { type: "tip", text: "Названия животных часто образуют пары: <b>lion — lioness</b>, <b>tiger — tigress</b>. Детёнышей называют <b>cub</b>, <b>puppy</b>, <b>kitten</b>." }
            ]
          },
          {
            title: "Body parts & habitats", ru: "Части тела и среда обитания",
            blocks: [
              { type: "words", title: "Части тела", items: [
                ["paw", "лапа"], ["tail", "хвост"], ["trunk", "хобот"], ["mane", "грива"],
                ["wing", "крыло"], ["feather", "перо"], ["fur", "шерсть"], ["horn", "рог"],
                ["fin", "плавник"], ["beak", "клюв"], ["claw", "коготь"], ["whisker", "ус"]
              ] },
              { type: "words", title: "Где живут", items: [
                ["forest", "лес"], ["jungle", "джунгли"], ["savanna", "саванна"], ["desert", "пустыня"],
                ["ocean", "океан"], ["sea", "море"], ["river", "река"], ["lake", "озеро"],
                ["mountain", "горы"], ["Arctic", "Арктика"], ["grassland", "степь"]
              ] },
              { type: "phrase", title: "Среда обитания", items: [
                ["It lives in the forest.", "Оно живёт в лесу."],
                ["It lives in the ocean.", "Оно живёт в океане."],
                ["It lives in the Arctic.", "Оно живёт в Арктике."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Present Simple (+)", ru: "Present Simple: утверждение",
            blocks: [
              { type: "rule", title: "Что делает обычно", items: [
                { title: "I / you / we / they + V", text: "После этих местоимений глагол стоит в начальной форме: <b>I play, they live</b>.", examples: [["Lions live in Africa.", "Львы живут в Африке."], ["We like animals.", "Мы любим животных."]] },
                { title: "he / she / it + V-s", text: "В 3-м лице единственного числа добавляем <b>-s</b>: <b>He plays. She eats.</b>", examples: [["The tiger eats meat.", "Тигр ест мясо."], ["A penguin swims well.", "Пингвин хорошо плавает."]] }
              ] },
              { type: "rule", title: "Правописание -s", items: [
                { title: "Правила", text: "Обычно <b>-s</b>; после <b>-ch, -sh, -s, -x, -o</b> — <b>-es</b>; согласная + <b>y</b> → <b>-ies</b>.", examples: [["watch → watches", "смотрит"], ["go → goes", "идёт"], ["study → studies", "учится"]] }
              ] },
              { type: "tip", text: "Слова-маркеры Present Simple: <b>usually, often, every day, on Sundays, sometimes</b>." }
            ]
          },
          {
            title: "Present Simple (−, ?)", ru: "Present Simple: отрицание и вопрос",
            blocks: [
              { type: "rule", title: "Отрицание", items: [
                { title: "don't / doesn't", text: "<b>I / you / we / they don't + V</b>. <b>He / she / it doesn't + V</b> (без -s!).", examples: [["I don't like snakes.", "Я не люблю змей."], ["She doesn't eat meat.", "Она не ест мясо."]] }
              ] },
              { type: "rule", title: "Вопрос", items: [
                { title: "Do / Does", text: "<b>Do you…?</b> <b>Does he…?</b> После <b>does</b> глагол без <b>-s</b>.", examples: [["Do you like animals?", "Ты любишь животных?"], ["Does the panda eat meat?", "Панда ест мясо?"]] },
                { title: "Краткие ответы", text: "<b>Yes, I do. / No, I don't. Yes, she does. / No, she doesn't.</b>", examples: [["Do they live in the forest? — Yes, they do.", "Они живут в лесу? — Да."]] }
              ] },
              { type: "table", title: "Схема", head: ["", "Утверждение", "Отрицание", "Вопрос"], rows: [
                ["I / you / we / they", "play", "don't play", "Do … play?"],
                ["he / she / it", "plays", "doesn't play", "Does … play?"]
              ] }
            ]
          },
          {
            title: "Adverbs of frequency", ru: "Наречия частоты",
            blocks: [
              { type: "words", title: "Как часто?", items: [
                ["always", "всегда"], ["usually", "обычно"], ["often", "часто"],
                ["sometimes", "иногда"], ["seldom", "редко"], ["never", "никогда"]
              ] },
              { type: "rule", title: "Куда ставить наречие", items: [
                { title: "Перед смысловым глаголом", text: "<b>I always get up at 7.</b> <b>She often visits the zoo.</b>", examples: [["He usually plays football.", "Он обычно играет в футбол."]] },
                { title: "После to be", text: "<b>I am never late.</b> <b>They are always happy.</b>", examples: [["The monkeys are always funny.", "Обезьяны всегда смешные."]] }
              ] }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "Describing animals", ru: "Описываем животное",
            blocks: [
              { type: "phrase", title: "План рассказа", items: [
                ["This is a tiger.", "Это тигр."],
                ["It lives in the jungle.", "Он живёт в джунглях."],
                ["It eats meat.", "Он ест мясо."],
                ["It can run very fast.", "Он умеет очень быстро бегать."],
                ["It has got sharp claws.", "У него острые когти."],
                ["It is big and strong.", "Он большой и сильный."],
                ["It is a dangerous animal.", "Это опасное животное."],
                ["I like tigers because they are beautiful.", "Мне нравятся тигры, потому что они красивые."]
              ] },
              { type: "phrase", title: "В зоопарке", items: [
                ["What's this? — It's a panda.", "Что это? — Это панда."],
                ["Where does it live?", "Где он живёт?"],
                ["How long does it live?", "Сколько он живёт?"],
                ["Is it dangerous?", "Он опасный?"],
                ["Can I feed it?", "Можно его покормить?"]
              ] }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Animals of Russia", ru: "Животные России",
            blocks: [
              { type: "note", title: "Красная книга", text: [
                "В России живут бурый медведь, амурский тигр, северный олень, морж и белый медведь. Многие из них занесены в Красную книгу — список редких и исчезающих видов.",
                "Амурский тигр — один из самых редких хищников планеты. Благодаря заповедникам и программам охраны его численность удалось увеличить. Символом российского леса остаётся бурый медведь, а символом Арктики — белый медведь."
              ] },
              { type: "words", title: "Животные России", items: [
                ["brown bear", "бурый медведь"], ["Amur tiger", "амурский тигр"], ["polar bear", "белый медведь"],
                ["reindeer", "северный олень"], ["walrus", "морж"], ["seal", "тюлень"],
                ["eagle", "орёл"], ["Red Book", "Красная книга"]
              ] },
              { type: "phrase", title: "Говорим об охране", items: [
                ["The Amur tiger is in the Red Book.", "Амурский тигр занесён в Красную книгу."],
                ["We must protect animals.", "Мы должны защищать животных."],
                ["National parks help rare animals.", "Национальные парки помогают редким животным."]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== MODULE 6 ============================== */
  SPOTLIGHT.modules.push({
    title: "Round the clock", ru: "Круглые сутки", icon: "⏰", color: "#b58bff",
    badge: "6", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Daily routine", ru: "Распорядок дня",
            blocks: [
              { type: "words", title: "Что мы делаем каждый день", items: [
                ["get up", "вставать"], ["wake up", "просыпаться"], ["have a shower", "принимать душ"],
                ["brush teeth", "чистить зубы"], ["get dressed", "одеваться"], ["have breakfast", "завтракать"],
                ["go to school", "идти в школу"], ["have lessons", "учиться на уроках"], ["have lunch", "обедать"],
                ["do homework", "делать домашнюю работу"], ["walk the dog", "гулять с собакой"],
                ["play sports", "заниматься спортом"], ["watch TV", "смотреть телевизор"],
                ["read a book", "читать книгу"], ["have dinner", "ужинать"], ["go to bed", "ложиться спать"],
                ["sleep", "спать"]
              ] },
              { type: "phrase", title: "Мой день", items: [
                ["I get up at seven o'clock.", "Я встаю в семь часов."],
                ["Then I have breakfast.", "Потом я завтракаю."],
                ["After school I do my homework.", "После школы я делаю домашнюю работу."],
                ["In the evening I watch TV.", "Вечером я смотрю телевизор."],
                ["I go to bed at ten.", "Я ложусь спать в десять."]
              ] }
            ]
          },
          {
            title: "Telling the time", ru: "Который час?",
            blocks: [
              { type: "phrase", title: "Спрашиваем время", items: [
                ["What time is it?", "Который час?"],
                ["What's the time?", "Сколько времени?"],
                ["It's seven o'clock.", "Сейчас семь часов."],
                ["It's half past seven.", "Половина восьмого (7:30)."],
                ["It's quarter past seven.", "Четверть восьмого (7:15)."],
                ["It's quarter to eight.", "Без четверти восемь (7:45)."],
                ["It's ten past seven.", "Десять минут восьмого (7:10)."],
                ["It's twenty to eight.", "Без двадцати восемь (7:40)."]
              ] },
              { type: "rule", title: "Две системы", items: [
                { title: "Классическая", text: "До половины говорим <b>past</b> (после), после половины — <b>to</b> (до). <b>half past</b> — 30 минут, <b>quarter</b> — 15.", examples: [["6:30 — half past six", "половина седьмого"], ["8:45 — quarter to nine", "без четверти девять"]] },
                { title: "Цифровая", text: "Можно просто называть часы и минуты: <b>seven fifteen, eight forty-five</b>. <b>a.m.</b> — до полудня, <b>p.m.</b> — после.", examples: [["7:15 — seven fifteen", "7:15"], ["18:40 — six forty p.m.", "18:40"]] }
              ] }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Present Simple: he/she/it", ru: "Present Simple: 3-е лицо",
            blocks: [
              { type: "rule", title: "Окончание -s", items: [
                { title: "Когда добавляем", text: "Если подлежащее <b>he, she, it</b> или одно лицо/животное, глагол получает <b>-s</b>.", examples: [["He gets up at seven.", "Он встаёт в семь."], ["She watches TV in the evening.", "Она смотрит телевизор вечером."]] },
                { title: "Правописание", text: "После <b>-ch, -sh, -s, -x, -o</b> — <b>-es</b>; согласная + <b>y</b> → <b>-ies</b>.", examples: [["brush → brushes", "чистит"], ["go → goes", "идёт"], ["study → studies", "учится"]] },
                { title: "Отрицание и вопрос", text: "<b>doesn't + V</b>, <b>Does … + V?</b> Окончание <b>-s</b> переходит к <b>does</b>.", examples: [["He doesn't get up early.", "Он не встаёт рано."], ["Does she walk the dog? — Yes, she does.", "Она гуляет с собакой? — Да."]] }
              ] }
            ]
          },
          {
            title: "Prepositions of time", ru: "Предлоги времени",
            blocks: [
              { type: "rule", title: "at, in, on", items: [
                { title: "at — точное время", text: "<b>at 7 o'clock, at noon, at midnight, at night, at the weekend</b>.", examples: [["I get up at six thirty.", "Я встаю в 6:30."], ["We don't go to school at the weekend.", "На выходных мы не ходим в школу."]] },
                { title: "in — часть дня, месяц, сезон, год", text: "<b>in the morning, in the afternoon, in the evening, in May, in winter, in 2026</b>.", examples: [["I do my homework in the evening.", "Я делаю домашнюю работу вечером."], ["My birthday is in July.", "Мой день рождения в июле."]] },
                { title: "on — день и дата", text: "<b>on Monday, on my birthday, on the 5th of May</b>.", examples: [["We have English on Tuesday.", "У нас английский во вторник."], ["See you on Friday!", "Увидимся в пятницу!"]] }
              ] },
              { type: "tip", text: "Запомните исключения: <b>at night</b>, <b>at noon</b>, <b>at midnight</b>, но <b>in the morning</b>. <b>at the weekend</b> — британский вариант, <b>on the weekend</b> — американский." }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "My day & how often", ru: "Мой день и как часто",
            blocks: [
              { type: "phrase", title: "Рассказ по порядку", items: [
                ["I get up at seven o'clock.", "Я встаю в семь."],
                ["First, I have a shower and get dressed.", "Сначала я принимаю душ и одеваюсь."],
                ["Then I have breakfast.", "Затем я завтракаю."],
                ["After that I go to school.", "После этого я иду в школу."],
                ["In the afternoon I do my homework.", "Днём я делаю домашнюю работу."],
                ["Finally, I go to bed at ten.", "Наконец, я ложусь спать в десять."]
              ] },
              { type: "phrase", title: "How often…?", items: [
                ["How often do you play sports?", "Как часто ты занимаешься спортом?"],
                ["I play sports three times a week.", "Я занимаюсь спортом три раза в неделю."],
                ["I always walk the dog in the evening.", "Я всегда гуляю с собакой вечером."],
                ["I never go to bed late.", "Я никогда не ложусь спать поздно."],
                ["Do you do your homework every day?", "Ты делаешь домашнюю работу каждый день?"]
              ] }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "A school day in Britain", ru: "Школьный день в Британии",
            blocks: [
              { type: "note", title: "Сравниваем расписание", text: [
                "Британские школьники обычно начинают занятия около 9 часов. День начинается с переклички (register) и собрания (assembly), затем идут уроки по 45–60 минут, перерыв на обед и перемены. Во многих школах есть школьная форма и послеурочные клубы.",
                "В России уроки часто начинаются в 8:00–8:30 и длятся 40–45 минут. После уроков многие ходят в кружки и секции. В обеих странах учебный день похож: уроки, перемена, обед и домашняя работа."
              ] },
              { type: "words", title: "Школьный день", items: [
                ["assembly", "общее собрание"], ["register", "перекличка"], ["break time", "перемена"],
                ["lunch break", "обеденный перерыв"], ["after-school club", "кружок после уроков"],
                ["homework", "домашняя работа"], ["timetable", "расписание"], ["term", "триместр"]
              ] },
              { type: "phrase", title: "Сравниваем", items: [
                ["In Britain, school starts at about 9 o'clock.", "В Британии школа начинается около 9."],
                ["In Russia, lessons start earlier.", "В России уроки начинаются раньше."],
                ["In both countries, students have lunch at school.", "В обеих странах ученики обедают в школе."]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== MODULE 7 ============================== */
  SPOTLIGHT.modules.push({
    title: "In all weathers", ru: "В любую погоду", icon: "🌦️", color: "#6ea8ff",
    badge: "7", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Weather", ru: "Погода",
            blocks: [
              { type: "words", title: "Какая сегодня погода?", items: [
                ["sunny", "солнечно"], ["cloudy", "облачно"], ["windy", "ветрено"], ["rainy", "дождливо"],
                ["snowy", "снежно"], ["foggy", "туманно"], ["stormy", "штормово"], ["hot", "жарко"],
                ["cold", "холодно"], ["warm", "тепло"], ["cool", "прохладно"], ["wet", "сыро"],
                ["dry", "сухо"], ["weather", "погода"], ["rain", "дождь"], ["snow", "снег"]
              ] },
              { type: "phrase", title: "Говорим о погоде", items: [
                ["What's the weather like today?", "Какая сегодня погода?"],
                ["It's sunny and warm.", "Солнечно и тепло."],
                ["It's raining.", "Идёт дождь."],
                ["It's snowing.", "Идёт снег."],
                ["It's cold outside.", "На улице холодно."],
                ["I like this weather.", "Мне нравится такая погода."]
              ] }
            ]
          },
          {
            title: "Seasons & months", ru: "Времена года и месяцы",
            blocks: [
              { type: "words", title: "Seasons", items: [
                ["spring", "весна"], ["summer", "лето"], ["autumn", "осень"], ["winter", "зима"]
              ] },
              { type: "words", title: "Months", items: [
                ["January", "январь"], ["February", "февраль"], ["March", "март"], ["April", "апрель"],
                ["May", "май"], ["June", "июнь"], ["July", "июль"], ["August", "август"],
                ["September", "сентябрь"], ["October", "октябрь"], ["November", "ноябрь"], ["December", "декабрь"]
              ] },
              { type: "rule", title: "Предлоги", items: [
                { title: "in + месяц / сезон", text: "<b>in July, in winter</b>. С днями — <b>on</b>, с точным временем — <b>at</b>.", examples: [["It's often rainy in autumn.", "Осенью часто дождливо."], ["My birthday is in May.", "Мой день рождения в мае."]] }
              ] }
            ]
          },
          {
            title: "Clothes", ru: "Одежда",
            blocks: [
              { type: "words", title: "Что мы носим", items: [
                ["coat", "пальто"], ["jacket", "куртка"], ["raincoat", "дождевик"], ["sweater", "свитер"],
                ["hoodie", "худи"], ["shirt", "рубашка"], ["T-shirt", "футболка"], ["blouse", "блузка"],
                ["trousers", "брюки"], ["jeans", "джинсы"], ["shorts", "шорты"], ["skirt", "юбка"],
                ["dress", "платье"], ["socks", "носки"], ["tights", "колготки"], ["shoes", "туфли"],
                ["boots", "ботинки"], ["trainers", "кроссовки"], ["sandals", "сандалии"], ["slippers", "тапочки"],
                ["hat", "шапка"], ["cap", "кепка"], ["scarf", "шарф"], ["gloves", "перчатки"],
                ["mittens", "варежки"], ["umbrella", "зонт"], ["belt", "ремень"]
              ] },
              { type: "tip", text: "<b>Trousers, jeans, shorts, glasses</b> — всегда во множественном числе: <i>These jeans are new.</i> <b>Clothes</b> тоже не имеет единственного числа." }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Present Continuous", ru: "Present Continuous",
            blocks: [
              { type: "rule", title: "Действие прямо сейчас", items: [
                { title: "Формула", text: "<b>am / is / are + V-ing</b>.", examples: [["I am wearing a coat.", "Я надел пальто (сейчас на мне)."], ["She is reading a book.", "Она читает книгу."], ["They are playing in the snow.", "Они играют в снегу."]] },
                { title: "Правописание -ing", text: "Обычно + <b>-ing</b>; немая <b>-e</b> убирается (<b>make → making</b>); короткий слог удваивается (<b>run → running</b>); <b>ie → y</b> (<b>lie → lying</b>).", examples: [["write → writing", "писать"], ["swim → swimming", "плавать"]] },
                { title: "Отрицание и вопрос", text: "<b>am not / isn't / aren't + V-ing</b>; вопрос — <b>Is he…? Are they…?</b>", examples: [["It isn't raining now.", "Сейчас не идёт дождь."], ["Are you wearing a hat?", "Ты в шапке?"]] }
              ] },
              { type: "tip", text: "Маркеры: <b>now, at the moment, right now, today, Look! Listen!</b>" }
            ]
          },
          {
            title: "Present Simple vs Continuous", ru: "Простое и длительное",
            blocks: [
              { type: "table", title: "Сравнение", head: ["", "Present Simple", "Present Continuous"], rows: [
                ["Когда", "обычно, каждый день", "прямо сейчас"],
                ["Маркеры", "usually, often, every day", "now, at the moment"],
                ["Форма", "V / V-s", "am/is/are + V-ing"],
                ["Пример", "I wear a uniform at school.", "I am wearing a warm coat today."]
              ] },
              { type: "rule", title: "Выбираем правильное время", items: [
                { title: "Привычка", text: "Регулярное действие → Present Simple. <b>I usually go to school by bus.</b>", examples: [["She plays tennis every Sunday.", "Она играет в теннис каждое воскресенье."]] },
                { title: "Момент речи", text: "Действие происходит сейчас → Present Continuous. <b>Look! It is snowing.</b>", examples: [["They are wearing raincoats because it is raining.", "Они в дождевиках, потому что идёт дождь."]] }
              ] }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "What's the weather like?", ru: "Разговор о погоде",
            blocks: [
              { type: "phrase", title: "Диалог", items: [
                ["What's the weather like today?", "Какая сегодня погода?"],
                ["It's cold and windy.", "Холодно и ветрено."],
                ["What's your favourite season?", "Какое твоё любимое время года?"],
                ["My favourite season is summer.", "Моё любимое время года — лето."],
                ["I like winter because I can ski.", "Я люблю зиму, потому что могу кататься на лыжах."],
                ["I don't like rainy days.", "Я не люблю дождливые дни."]
              ] }
            ]
          },
          {
            title: "Buying clothes", ru: "Покупаем одежду",
            blocks: [
              { type: "phrase", title: "В магазине одежды", items: [
                ["Can I help you?", "Я могу вам помочь?"],
                ["I'm looking for a jacket.", "Я ищу куртку."],
                ["What size are you?", "Какой у вас размер?"],
                ["I wear size 38.", "Я ношу 38-й размер."],
                ["Can I try it on?", "Можно примерить?"],
                ["It fits me well.", "Оно мне подходит по размеру."],
                ["It's too big / small.", "Оно слишком большое / маленькое."],
                ["I'll take it.", "Я это беру."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Russian winter & British weather", ru: "Русская зима и британская погода",
            blocks: [
              { type: "note", title: "Погода как характер", text: [
                "В России зима длинная и снежная, лето тёплое, а весна и осень — переходные сезоны. Русская зима — это снег, мороз, санки и Новый год; именно она стала частью культуры и литературы.",
                "В Британии погода переменчивая: за день могут пройти дождь, выглянуть солнце и снова подуть ветер. Британцы шутят, что у них «четыре сезона за один день», поэтому зонт и непромокаемая куртка — привычные спутники."
              ] },
              { type: "words", title: "Погодные слова", items: [
                ["frost", "мороз"], ["snowfall", "снегопад"], ["thaw", "оттепель"],
                ["changeable", "переменчивая"], ["shower", "кратковременный дождь"], ["breeze", "лёгкий ветер"],
                ["forecast", "прогноз погоды"], ["temperature", "температура"]
              ] },
              { type: "phrase", title: "Сравниваем", items: [
                ["Russian winters are long and cold.", "Русские зимы длинные и холодные."],
                ["British weather is often changeable.", "Британская погода часто переменчива."],
                ["Take an umbrella — it may rain.", "Возьми зонт — может пойти дождь."]
              ] }
            ]
          }
        ]
      }
    ]
  });

})();
