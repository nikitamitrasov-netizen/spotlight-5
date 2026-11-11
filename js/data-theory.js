/* Spotlight 5 — module guides: expanded theory and study plans */
(function () {

  const M = SPOTLIGHT.modules;

  function guide(mi, title, ru, intro, table, rules, dialogue, plan, tasks) {
    M[mi].branches.push({
      title: "Module guide", ru: "Гид по модулю", icon: "🧭",
      leaves: [{
        title: title, ru: ru,
        blocks: [
          { type: "lead", text: intro },
          { type: "table", title: "Карта модуля", head: ["Лексика", "Грамматика", "Речь"], rows: table },
          { type: "rule", title: "Грамматика: главное", items: rules },
          { type: "phrase", title: "Мини-диалог", items: dialogue },
          { type: "tip", text: plan },
          { type: "task", title: "Проверь себя", intro: "Выполни задания письменно, а потом проверь ответы.", items: tasks }
        ]
      }]
    });
  }

  guide(0, "Starter guide", "Как пройти вводный модуль",
    "Вводный модуль часто пролистывают, а зря: здесь закладывается всё, на чём держится пятый класс — алфавит, числа, цвета и первые фразы. Не спешите: лучше потратить на старт лишний день, чем потом спотыкаться о названия букв.",
    [
      ["Алфавит, числа 1–20, цвета, школьные предметы", "I am / you are, my / your", "Приветствие, имя, возраст, прощание"]
    ],
    [
      { title: "I am / you are", text: "Английское предложение не обходится без глагола-связки: <b>I am</b>, <b>you are</b>. В отрицании — <b>I'm not</b>, <b>you aren't</b>.", examples: [["I am a pupil.", "Я ученик."], ["You are my friend.", "Ты мой друг."]] },
      { title: "My / your", text: "Притяжательные местоимения отвечают на вопрос «чей?»: <b>my name</b>, <b>your bag</b>.", examples: [["My name is Nina.", "Меня зовут Нина."], ["Is this your pen?", "Это твоя ручка?"]] }
    ],
    [
      ["Hello! What's your name?", "Привет! Как тебя зовут?"],
      ["My name is Nina. And you?", "Меня зовут Нина. А тебя?"],
      ["How old are you?", "Сколько тебе лет?"],
      ["I'm eleven. Nice to meet you!", "Мне одиннадцать. Приятно познакомиться!"]
    ],
    "<b>План на неделю:</b> 1) выучите алфавит и названия букв; 2) доведите числа 1–20 до автоматизма; 3) выучите 10 цветов; 4) соберите 8 фраз знакомства; 5) запишите рассказ о себе из 5 предложений и прочитайте его вслух.",
    [
      { q: "Назови по буквам слово <b>school</b>.", a: "S — C — H — O — O — L." },
      { q: "Посчитай от 11 до 20.", a: "eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty." },
      { q: "Расскажи о себе: имя, возраст, город.", a: "My name is … I am … I am from …" }
    ]
  );

  guide(1, "Module 1 guide", "Как пройти Module 1: School days",
    "Этот модуль — про школу и школьный день. Главное здесь — не выучить как можно больше слов, а научиться строить простые предложения с <b>to be</b> и рассказывать о расписании.",
    [
      ["School objects, subjects, days of the week", "to be, personal and possessive pronouns, a / an", "Classroom English, рассказ о школе"]
    ],
    [
      { title: "To be: am / is / are", text: "В утверждении: <b>I am</b>, <b>he/she/it is</b>, <b>we/you/they are</b>. В вопросе глагол выходит вперёд: <b>Are you…?</b>", examples: [["She is at school.", "Она в школе."], ["Are you a pupil? — Yes, I am.", "Ты ученик? — Да."]] },
      { title: "A / an", text: "Артикль <b>a</b> ставим перед согласным звуком, <b>an</b> — перед гласным: <b>a book</b>, <b>an eraser</b>.", examples: [["a ruler", "линейка"], ["an atlas", "атлас"]] }
    ],
    [
      ["Can I come in, please?", "Можно войти?"],
      ["What's your favourite subject?", "Какой твой любимый предмет?"],
      ["My favourite subject is English.", "Мой любимый предмет — английский."],
      ["How many lessons do you have on Monday?", "Сколько у тебя уроков в понедельник?"]
    ],
    "<b>План на неделю:</b> 1) 12 школьных предметов; 2) 7 дней недели и предлог <b>on</b>; 3) формы <b>to be</b>; 4) 5 фраз для урока; 5) рассказ о своём понедельнике из 6 предложений.",
    [
      { q: "Переведи: пенал, учебник, расписание.", a: "pencil case, textbook, timetable." },
      { q: "Вставь am, is или are: I ___ a pupil. She ___ at school.", a: "am, is." },
      { q: "Ответь: What's your favourite subject?", a: "My favourite subject is …" }
    ]
  );

  guide(2, "Module 2 guide", "Как пройти Module 2: That's me",
    "Модуль о тебе, твоей стране и твоих вещах. Здесь появляются страны и национальности, множественное число и <b>have got</b> — конструкция, без которой не рассказать о семье, питомце и коллекции.",
    [
      ["Countries and nationalities, personal things, collections", "Plurals, this/that/these/those, have got", "Знакомство, покупка сувенира"]
    ],
    [
      { title: "Множественное число", text: "Обычно <b>-s</b>; после <b>-s, -sh, -ch, -x, -o</b> — <b>-es</b>; согласная + <b>y</b> → <b>-ies</b>. Запомните особые формы: <b>child — children</b>, <b>man — men</b>.", examples: [["box — boxes", "коробки"], ["city — cities", "города"]] },
      { title: "Have got", text: "<b>I/you/we/they have got</b>, <b>he/she/it has got</b>. Вопрос: <b>Have you got…?</b>", examples: [["I have got a camera.", "У меня есть фотоаппарат."], ["Has she got a pet? — Yes, she has.", "У неё есть питомец? — Да."]] }
    ],
    [
      ["Where are you from?", "Откуда ты?"],
      ["I'm from Russia. I'm Russian.", "Я из России. Я русский."],
      ["How much is this T-shirt?", "Сколько стоит эта футболка?"],
      ["Can I try it on? — Sure.", "Можно примерить? — Конечно."]
    ],
    "<b>План на неделю:</b> 1) 12 стран и национальностей; 2) 12 личных вещей; 3) множественное число; 4) <b>have got</b>; 5) диалог «В магазине сувениров».",
    [
      { q: "Образуй множественное число: box, city, child.", a: "boxes, cities, children." },
      { q: "Вставь have или has: She ___ got a cat. They ___ got bikes.", a: "has, have." },
      { q: "Расскажи, что у тебя есть в рюкзаке.", a: "I have got …" }
    ]
  );

  guide(3, "Module 3 guide", "Как пройти Module 3: My home, my castle",
    "Модуль о доме. Он удобен тем, что почти всё можно показать руками: вот диван, вот лампа, вот кот под столом. Ваша задача — научиться описывать пространство.",
    [
      ["Rooms, furniture, house types", "Prepositions of place, there is / there are", "Описание дома и комнаты"]
    ],
    [
      { title: "There is / there are", text: "<b>There is</b> — один предмет, <b>There are</b> — несколько. Вопрос: <b>Is there…? Are there…?</b>", examples: [["There is a sofa in the living room.", "В гостиной есть диван."], ["There are two chairs.", "Там два стула."]] },
      { title: "Предлоги места", text: "<b>in</b> — внутри, <b>on</b> — на поверхности, <b>under</b> — под, <b>next to</b> — рядом, <b>between</b> — между.", examples: [["The cat is under the table.", "Кот под столом."], ["The lamp is on the desk.", "Лампа на столе."]] }
    ],
    [
      ["Where is the cat?", "Где кот?"],
      ["It's under the table.", "Он под столом."],
      ["Is there a garden near the house?", "Рядом с домом есть сад?"],
      ["Yes, there is. It's small but cozy.", "Да. Он маленький, но уютный."]
    ],
    "<b>План на неделю:</b> 1) 10 комнат; 2) 15 предметов мебели; 3) <b>there is/are</b>; 4) 8 предлогов; 5) описание своей комнаты из 6 предложений.",
    [
      { q: "Переведи: гостиная, шкаф, ковёр.", a: "living room, wardrobe, carpet." },
      { q: "Вставь is или are: There ___ a lamp. There ___ two chairs.", a: "is, are." },
      { q: "Опиши, где стоит твой письменный стол.", a: "My desk is next to the window. / My desk is in my room." }
    ]
  );

  guide(4, "Module 4 guide", "Как пройти Module 4: My family",
    "Самый личный модуль: семья, внешность и характер. Здесь важно не просто перечислить родственников, а сказать, какие они и что умеют.",
    [
      ["Family members, appearance, character", "Possessive case, can / can't, adjectives", "Рассказ о семье и описание человека"]
    ],
    [
      { title: "Притяжательный падеж", text: "Один человек — <b>'s</b>: <b>my mum's bag</b>. Множественное число на <b>-s</b> — только апостроф: <b>my parents' car</b>.", examples: [["This is Tom's bike.", "Это велосипед Тома."], ["the children's room", "комната детей"]] },
      { title: "Can / can't", text: "<b>Can + глагол</b> без <b>to</b> и без <b>-s</b>. Вопрос: <b>Can she swim?</b>", examples: [["She can cook well.", "Она хорошо готовит."], ["He can't drive.", "Он не умеет водить."]] }
    ],
    [
      ["Who is this?", "Кто это?"],
      ["This is my cousin. He is twelve.", "Это мой двоюродный брат. Ему двенадцать."],
      ["What is he like?", "Какой он?"],
      ["He is kind, funny and very active.", "Он добрый, смешной и очень активный."]
    ],
    "<b>План на неделю:</b> 1) 15 членов семьи; 2) 10 слов о внешности; 3) 10 черт характера; 4) <b>'s</b> и <b>can</b>; 5) рассказ о семье из 7 предложений.",
    [
      { q: "Переведи: двоюродный брат, бабушка, племянница.", a: "cousin, grandmother, niece." },
      { q: "Переделай: the bag of my sister.", a: "my sister's bag." },
      { q: "Расскажи, что умеет твой родственник.", a: "My … can …" }
    ]
  );

  guide(5, "Module 5 guide", "Как пройти Module 5: World animals",
    "Модуль о животных — один из самых любимых. Но его главная задача — Present Simple: научиться говорить о том, что происходит обычно, а не прямо сейчас.",
    [
      ["Animals, body parts, habitats", "Present Simple (+, −, ?), adverbs of frequency", "Описание животного, диалог в зоопарке"]
    ],
    [
      { title: "Present Simple: 3-е лицо", text: "С <b>he, she, it</b> у глагола появляется <b>-s</b> или <b>-es</b>: <b>live — lives</b>, <b>eat — eats</b>, <b>watch — watches</b>.", examples: [["A tiger eats meat.", "Тигр ест мясо."], ["A penguin lives in the Antarctic.", "Пингвин живёт в Антарктике."]] },
      { title: "Do / does", text: "Вопрос и отрицание строятся через <b>do/does</b>: <b>Does it eat meat? It doesn't eat meat.</b>", examples: [["Do lions live in Africa?", "Львы живут в Африке?"], ["She doesn't like snakes.", "Она не любит змей."]] }
    ],
    [
      ["Where does the tiger live?", "Где живёт тигр?"],
      ["It lives in the forest.", "Он живёт в лесу."],
      ["Does it eat meat?", "Он ест мясо?"],
      ["Yes, it does. It is a predator.", "Да. Он хищник."]
    ],
    "<b>План на неделю:</b> 1) 20 животных; 2) 10 частей тела; 3) 8 сред обитания; 4) Present Simple; 5) рассказ о животном из 6 предложений.",
    [
      { q: "Образуй 3-е лицо: live, eat, watch.", a: "lives, eats, watches." },
      { q: "Сделай вопрос: The panda eats bamboo.", a: "Does the panda eat bamboo?" },
      { q: "Опиши любое животное по плану.", a: "It lives in … It eats … It can …" }
    ]
  );

  guide(6, "Module 6 guide", "Как пройти Module 6: Round the clock",
    "Модуль о времени и распорядке дня. Он полезен каждый день: во сколько вставать, когда начинаются уроки, сколько ждать автобус. Здесь важно довести время и Present Simple до автоматизма.",
    [
      ["Daily routine, time, days", "Present Simple: he/she/it, prepositions of time", "Рассказ о своём дне, вопрос how often"]
    ],
    [
      { title: "Который час", text: "<b>past</b> — после половины, <b>to</b> — до: <b>half past seven</b> (7:30), <b>quarter to eight</b> (7:45).", examples: [["It's seven o'clock.", "Семь часов."], ["It's ten past seven.", "Десять минут восьмого."]] },
      { title: "At / in / on", text: "<b>at</b> — точное время, <b>in</b> — месяц, сезон, часть дня, <b>on</b> — день и дата.", examples: [["at 7 o'clock", "в 7 часов"], ["in the morning", "утром"], ["on Monday", "в понедельник"]] }
    ],
    [
      ["What time do you get up?", "Во сколько ты встаёшь?"],
      ["I get up at seven.", "Я встаю в семь."],
      ["When do you have lunch?", "Когда ты обедаешь?"],
      ["At twelve. Then I have lunch.", "В двенадцать. Потом я обедаю."]
    ],
    "<b>План на неделю:</b> 1) 15 действий дня; 2) время; 3) 3-е лицо Present Simple; 4) at/in/on; 5) рассказ «Мой день» из 7 предложений.",
    [
      { q: "Скажи: 7:15, 8:45, 6:30.", a: "quarter past seven, quarter to nine, half past six." },
      { q: "Вставь at, in или on: ___ Monday, ___ 7 o'clock, ___ the morning.", a: "on, at, in." },
      { q: "Что ты делаешь после школы?", a: "I do my homework. Then I …" }
    ]
  );

  guide(7, "Module 7 guide", "Как пройти Module 7: In all weathers",
    "Погода и одежда — темы, которые всегда рядом. В этом модуле появляется Present Continuous: он нужен, чтобы сказать, что происходит прямо сейчас.",
    [
      ["Weather, seasons, months, clothes", "Present Continuous, Present Simple vs Continuous", "Разговор о погоде, покупка одежды"]
    ],
    [
      { title: "Present Continuous", text: "<b>am/is/are + V-ing</b>: <b>It is raining. I am wearing a coat.</b>", examples: [["She is reading now.", "Она сейчас читает."], ["They are playing in the snow.", "Они играют в снегу."]] },
      { title: "Simple vs Continuous", text: "Обычно — <b>Present Simple</b>; прямо сейчас — <b>Present Continuous</b>.", examples: [["I usually wear jeans.", "Я обычно ношу джинсы."], ["Today I am wearing a dress.", "Сегодня я в платье."]] }
    ],
    [
      ["What's the weather like today?", "Какая сегодня погода?"],
      ["It's cold and windy.", "Холодно и ветрено."],
      ["What are you wearing?", "Во что ты одет?"],
      ["I'm wearing a warm coat and a scarf.", "Я в тёплом пальто и шарфе."]
    ],
    "<b>План на неделю:</b> 1) 12 слов о погоде; 2) 12 месяцев; 3) 15 предметов одежды; 4) Present Continuous; 5) прогноз погоды на завтра.",
    [
      { q: "Образуй -ing: run, make, lie.", a: "running, making, lying." },
      { q: "Выбери время: Look! It ___ (rain).", a: "is raining." },
      { q: "Опиши, во что ты одет сегодня.", a: "I'm wearing …" }
    ]
  );

  guide(8, "Module 8 guide", "Как пройти Module 8: Special days",
    "Праздники и еда — отличный повод поговорить. Но грамматически модуль непростой: нужно понять, что можно посчитать, а что нельзя, и когда говорить some, any, much или many.",
    [
      ["Festivals, food, party things", "Countable / uncountable, some/any, much/many, containers", "Заказ еды, приглашение"]
    ],
    [
      { title: "Some / any", text: "<b>Some</b> — в утверждении, <b>any</b> — в вопросе и отрицании: <b>There is some milk. Is there any juice? There isn't any juice.</b>", examples: [["some apples", "немного яблок"], ["any water", "любая вода"]] },
      { title: "Much / many", text: "<b>Many</b> — с исчисляемыми, <b>much</b> — с неисчисляемыми, <b>a lot of</b> — с любыми.", examples: [["How many apples?", "Сколько яблок?"], ["How much milk?", "Сколько молока?"]] }
    ],
    [
      ["I'd like a pizza, please.", "Я хотел бы пиццу, пожалуйста."],
      ["Anything else?", "Что-нибудь ещё?"],
      ["Some juice, please. How much is it?", "Сок, пожалуйста. Сколько это стоит?"],
      ["That's five pounds.", "Это пять фунтов."]
    ],
    "<b>План на неделю:</b> 1) 10 праздников; 2) 20 продуктов; 3) исчисляемое/неисчисляемое; 4) some/any, much/many; 5) диалог «В кафе».",
    [
      { q: "Вставь some или any: There is ___ milk. Is there ___ juice?", a: "some, any." },
      { q: "Выбери much или many: How ___ apples?", a: "many." },
      { q: "Закажи еду вежливо.", a: "I'd like … , please." }
    ]
  );

  guide(9, "Module 9 guide", "Как пройти Module 9: Modern living",
    "Модуль о магазинах, деньгах и покупках. Здесь начинается Past Simple — время, без которого не рассказать, что ты купил вчера.",
    [
      ["Shops, shopping, money", "Past Simple: was/were, regular and irregular verbs, did", "Диалог в магазине, рассказ о прошлом"]
    ],
    [
      { title: "Was / were", text: "<b>I/he/she/it was</b>, <b>you/we/they were</b>. Вопрос: <b>Were you…?</b>", examples: [["I was at the shop.", "Я был в магазине."], ["They were at home.", "Они были дома."]] },
      { title: "Past Simple: -ed и did", text: "Правильные глаголы — <b>-ed</b>; неправильные — вторая форма. Вопрос и отрицание — <b>did/didn't + V</b>.", examples: [["I bought a T-shirt.", "Я купил футболку."], ["Did you buy it? — Yes, I did.", "Ты купил это? — Да."]] }
    ],
    [
      ["Can I help you?", "Я могу вам помочь?"],
      ["I'm looking for a T-shirt.", "Я ищу футболку."],
      ["How much is it?", "Сколько она стоит?"],
      ["It's ten pounds. Can I pay by card?", "Десять фунтов. Можно оплатить картой?"]
    ],
    "<b>План на неделю:</b> 1) 12 магазинов; 2) 12 слов о деньгах; 3) was/were; 4) 15 неправильных глаголов; 5) рассказ о последней покупке.",
    [
      { q: "Вставь was или were: I ___ at home. They ___ at school.", a: "was, were." },
      { q: "Поставь в Past Simple: buy, go, see.", a: "bought, went, saw." },
      { q: "Что ты купил в прошлый раз?", a: "I bought …" }
    ]
  );

  guide(10, "Module 10 guide", "Как пройти Module 10: Holidays",
    "Финальный модуль — про каникулы и путешествия. Он собирает вместе Past Simple, транспорт, отель и эмоции. Это хорошая возможность повторить весь год.",
    [
      ["Transport, travel things, holiday activities", "Past Simple review, can/could for requests", "Бронирование отеля, рассказ о поездке"]
    ],
    [
      { title: "Past Simple review", text: "Правильные глаголы — <b>-ed</b>, неправильные — вторая форма. Вопрос и отрицание — <b>did/didn't</b>.", examples: [["We travelled by train.", "Мы ехали на поезде."], ["Did you like the hotel? — Yes, I did.", "Тебе понравился отель? — Да."]] },
      { title: "Could для просьбы", text: "<b>Could you…?</b> звучит вежливее, чем <b>Can you…?</b> После <b>could</b> — глагол без <b>to</b>.", examples: [["Could you help me?", "Не могли бы вы помочь?"], ["Could I book a room?", "Можно забронировать номер?"]] }
    ],
    [
      ["I'd like to book a room.", "Я хотел бы забронировать номер."],
      ["Single or double?", "Одноместный или двухместный?"],
      ["A double room, please. How much is it per night?", "Двухместный, пожалуйста. Сколько за ночь?"],
      ["It's fifty pounds, breakfast included.", "Пятьдесят фунтов, завтрак включён."]
    ],
    "<b>План на неделю:</b> 1) 12 видов транспорта; 2) 12 слов о путешествии; 3) Past Simple; 4) 5 вежливых просьб; 5) рассказ о лучшей поездке.",
    [
      { q: "Поставь в Past Simple: go, visit, swim.", a: "went, visited, swam." },
      { q: "Попроси вежливо помочь.", a: "Could you help me, please?" },
      { q: "Расскажи о своих каникулах.", a: "Last summer I went to …" }
    ]
  );

  guide(11, "Exam guide", "Как повторить всё перед проверочной",
    "Этот гид — не новый материал, а маршрут повторения. Здесь собрано главное: времена, местоимения, предлоги и стратегия выполнения теста. Начните с того, что даётся труднее, а не с того, что уже получается.",
    [
      ["Темы модулей 1–10", "Времена, местоимения, предлоги, неправильные глаголы", "Как читать задание и проверять ответ"]
    ],
    [
      { title: "Выбор времени по маркеру", text: "<b>usually/every day</b> → Present Simple; <b>now/at the moment</b> → Present Continuous; <b>yesterday/last week</b> → Past Simple.", examples: [["I usually walk to school.", "Я обычно хожу в школу пешком."], ["I am walking now.", "Сейчас я иду."], ["I walked yesterday.", "Вчера я шёл."]] },
      { title: "Проверка вопроса", text: "После <b>do/does/did</b> глагол стоит без окончания. С <b>he/she/it</b> в Present Simple — <b>-s</b>.", examples: [["Does she like English?", "Она любит английский?"], ["Did he go to school?", "Он ходил в школу?"]] }
    ],
    [
      ["С чего начать повторение?", "С темы, которая даётся труднее всего."],
      ["Как проверить текст?", "Прочитать ещё раз и найти ответы в тексте."],
      ["Что делать с ошибками?", "Выписать их и повторить через день."],
      ["Что важно на тесте?", "Внимательно читать задание и пример."]
    ],
    "<b>План на 3 дня:</b> 1) повторите времена и местоимения; 2) отработайте 20 неправильных глаголов; 3) сделайте один полный тест и разберите ошибки. Перед сном повторите самые трудные 10 слов.",
    [
      { q: "Выбери время: I ___ to school every day. (go)", a: "go." },
      { q: "Выбери время: I ___ now. (go)", a: "am going." },
      { q: "Выбери время: I ___ yesterday. (go)", a: "went." }
    ]
  );

})();
