/* Spotlight 5 — content, part 1: Starter, Modules 1–3 */
window.SPOTLIGHT = { modules: [] };

(function () {

  /* ============================== STARTER ============================== */
  SPOTLIGHT.modules.push({
    title: "Starter", ru: "Вводный модуль", icon: "✨", color: "#9db4d8",
    badge: "S", kind: "start",
    branches: [
      {
        title: "Alphabet & numbers", ru: "Алфавит и числа", icon: "🔤",
        leaves: [
          {
            title: "Alphabet", ru: "Английский алфавит",
            blocks: [
              { type: "lead", text: "26 букв: 5 гласных (<b>A, E, I, O, U</b>) и 21 согласная. Названия букв не совпадают со звуками, которые они дают в словах." },
              { type: "words", title: "Буквы и их названия", items: [
                ["Aa", "эй"], ["Bb", "би"], ["Cc", "си"], ["Dd", "ди"], ["Ee", "и"],
                ["Ff", "эф"], ["Gg", "джи"], ["Hh", "эйч"], ["Ii", "ай"], ["Jj", "джей"],
                ["Kk", "кей"], ["Ll", "эл"], ["Mm", "эм"], ["Nn", "эн"], ["Oo", "оу"],
                ["Pp", "пи"], ["Qq", "кью"], ["Rr", "ар"], ["Ss", "эс"], ["Tt", "ти"],
                ["Uu", "ю"], ["Vv", "ви"], ["Ww", "дабл-ю"], ["Xx", "экс"], ["Yy", "уай"], ["Zz", "зед"]
              ] },
              { type: "tip", text: "В британском варианте Zz называется <b>зед</b>, в американском — <b>зи</b>. На уроках в России чаще звучит британский вариант." }
            ]
          },
          {
            title: "Numbers 1–20", ru: "Числа от 1 до 20",
            blocks: [
              { type: "words", title: "Считаем по-английски", items: [
                ["one", "1 · один"], ["two", "2 · два"], ["three", "3 · три"], ["four", "4 · четыре"],
                ["five", "5 · пять"], ["six", "6 · шесть"], ["seven", "7 · семь"], ["eight", "8 · восемь"],
                ["nine", "9 · девять"], ["ten", "10 · десять"], ["eleven", "11 · одиннадцать"],
                ["twelve", "12 · двенадцать"], ["thirteen", "13 · тринадцать"], ["fourteen", "14 · четырнадцать"],
                ["fifteen", "15 · пятнадцать"], ["sixteen", "16 · шестнадцать"], ["seventeen", "17 · семнадцать"],
                ["eighteen", "18 · восемнадцать"], ["nineteen", "19 · девятнадцать"], ["twenty", "20 · двадцать"]
              ] },
              { type: "rule", title: "Как устроены числа", items: [
                { title: "13–19: добавляем -teen", text: "К основе числа добавляется <code>-teen</code>: four → <b>fourteen</b>, six → <b>sixteen</b>. В словах <b>thirteen</b> и <b>fifteen</b> основа меняется.", examples: [["thirteen", "13"], ["fifteen", "15"], ["eighteen", "18"]] },
                { title: "Десятки: добавляем -ty", text: "Позже появятся <code>twenty, thirty, forty, fifty…</code> — суффикс <code>-ty</code> помогает отличать десятки от единиц.", examples: [["twenty", "20"], ["thirty", "30"], ["forty", "40"]] }
              ] },
              { type: "tip", text: "Считайте вслух по кругу: <b>one, two, three…</b> Это лучший способ запомнить числа автоматически." }
            ]
          }
        ]
      },
      {
        title: "Colours & classroom", ru: "Цвета и класс", icon: "🎨",
        leaves: [
          {
            title: "Colours", ru: "Цвета",
            blocks: [
              { type: "words", title: "Основные цвета", items: [
                ["red", "красный"], ["blue", "синий"], ["green", "зелёный"], ["yellow", "жёлтый"],
                ["orange", "оранжевый"], ["purple", "фиолетовый"], ["pink", "розовый"], ["brown", "коричневый"],
                ["black", "чёрный"], ["white", "белый"], ["grey", "серый"], ["gold", "золотой"]
              ] },
              { type: "phrase", title: "Спрашиваем о цвете", items: [
                ["What colour is it?", "Какого это цвета?"],
                ["It's red.", "Оно красное."],
                ["What is your favourite colour?", "Какой твой любимый цвет?"],
                ["My favourite colour is blue.", "Мой любимый цвет — синий."]
              ] }
            ]
          },
          {
            title: "Classroom objects", ru: "Предметы в классе",
            blocks: [
              { type: "words", title: "Что лежит на столе", items: [
                ["pen", "ручка"], ["pencil", "карандаш"], ["ruler", "линейка"], ["eraser", "ластик"],
                ["notebook", "тетрадь"], ["book", "книга"], ["school bag", "рюкзак"], ["desk", "письменный стол"],
                ["chair", "стул"], ["board", "доска"], ["computer", "компьютер"], ["pencil case", "пенал"],
                ["sharpener", "точилка"], ["dictionary", "словарь"]
              ] },
              { type: "phrase", title: "На уроке", items: [
                ["It's a pen.", "Это ручка."],
                ["They are books.", "Это книги."],
                ["Is it a ruler?", "Это линейка?"],
                ["Yes, it is. / No, it isn't.", "Да. / Нет."]
              ] }
            ]
          }
        ]
      },
      {
        title: "First phrases", ru: "Первые фразы", icon: "💬",
        leaves: [
          {
            title: "Greetings", ru: "Приветствия и знакомство",
            blocks: [
              { type: "phrase", title: "Здороваемся", items: [
                ["Hello!", "Привет!"], ["Hi!", "Привет! (неформально)"],
                ["Good morning!", "Доброе утро!"], ["Good afternoon!", "Добрый день!"],
                ["Good evening!", "Добрый вечер!"], ["Good night!", "Спокойной ночи!"]
              ] },
              { type: "phrase", title: "Знакомимся", items: [
                ["What's your name?", "Как тебя зовут?"], ["My name is Alex.", "Меня зовут Алекс."],
                ["How are you?", "Как дела?"], ["I'm fine, thanks. And you?", "Хорошо, спасибо. А у тебя?"],
                ["Nice to meet you!", "Приятно познакомиться!"], ["Goodbye! See you!", "До свидания! Увидимся!"]
              ] },
              { type: "tip", text: "<b>Good night</b> говорят перед сном, а не при встрече вечером. При встрече — <b>Good evening</b>." }
            ]
          },
          {
            title: "I am / you are", ru: "Глагол to be: я и ты",
            blocks: [
              { type: "rule", title: "Самое важное правило", items: [
                { title: "I am = I'm", text: "По-русски мы говорим «Я ученик», без глагола. По-английски глагол <b>to be</b> обязателен: <b>I am a pupil.</b>", examples: [["I am a pupil.", "Я ученик."], ["I'm eleven.", "Мне одиннадцать."]] },
                { title: "You are = You're", text: "Для «ты» и «вы» используется одна форма — <b>you are</b>.", examples: [["You are my friend.", "Ты мой друг."], ["You're a good student.", "Ты хороший ученик."]] },
                { title: "Вопрос и отрицание", text: "Вопрос: <b>Are you…?</b> Отрицание: <b>I am not / You are not (aren't)</b>.", examples: [["Are you from Russia?", "Ты из России?"], ["I'm not late.", "Я не опоздал."]] }
              ] },
              { type: "table", title: "Личные местоимения + to be", head: ["Местоимение", "To be", "Сокращение"], rows: [
                ["I", "am", "I'm"], ["you", "are", "you're"], ["he", "is", "he's"],
                ["she", "is", "she's"], ["it", "is", "it's"], ["we", "are", "we're"],
                ["they", "are", "they're"]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== MODULE 1 ============================== */
  SPOTLIGHT.modules.push({
    title: "School days", ru: "Школьные дни", icon: "🎒", color: "#6f8cff",
    badge: "1", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "School objects", ru: "Школьные принадлежности",
            blocks: [
              { type: "words", title: "В портфеле и в классе", items: [
                ["pen", "ручка"], ["pencil", "карандаш"], ["pencil case", "пенал"], ["ruler", "линейка"],
                ["eraser", "ластик"], ["notebook", "тетрадь"], ["textbook", "учебник"], ["dictionary", "словарь"],
                ["atlas", "атлас"], ["glue", "клей"], ["scissors", "ножницы"], ["paints", "краски"],
                ["paintbrush", "кисточка"], ["sharpener", "точилка"], ["school bag", "рюкзак"],
                ["desk", "письменный стол"], ["chair", "стул"], ["blackboard", "классная доска"],
                ["computer", "компьютер"], ["bookcase", "книжный шкаф"]
              ] },
              { type: "tip", text: "<b>Scissors</b> всегда во множественном числе: <i>The scissors are on the desk.</i> Слово <b>paints</b> тоже часто используется во множественном числе — это набор красок." }
            ]
          },
          {
            title: "Subjects & days", ru: "Школьные предметы и дни недели",
            blocks: [
              { type: "words", title: "School subjects", items: [
                ["Maths", "математика"], ["English", "английский язык"], ["Russian", "русский язык"],
                ["Literature", "литература"], ["History", "история"], ["Geography", "география"],
                ["Science", "естествознание"], ["Biology", "биология"], ["Art", "изобразительное искусство"],
                ["Music", "музыка"], ["PE", "физкультура"], ["IT", "информатика"]
              ] },
              { type: "words", title: "Days of the week", items: [
                ["Monday", "понедельник"], ["Tuesday", "вторник"], ["Wednesday", "среда"],
                ["Thursday", "четверг"], ["Friday", "пятница"], ["Saturday", "суббота"], ["Sunday", "воскресенье"]
              ] },
              { type: "rule", title: "Предлоги с днями", items: [
                { title: "on + день", text: "С днями недели используем <b>on</b>: <b>on Monday</b>. Слово <b>weekday</b> — будний день, <b>weekend</b> — выходные.", examples: [["We have English on Tuesday.", "У нас английский во вторник."], ["I don't go to school at the weekend.", "На выходных я не хожу в школу."]] }
              ] }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Verb to be", ru: "Глагол to be",
            blocks: [
              { type: "rule", title: "Формы глагола", items: [
                { title: "Утверждение", text: "В английском предложении всегда есть глагол-связка. <b>I am</b>, <b>he/she/it is</b>, <b>we/you/they are</b>.", examples: [["I am a student.", "Я студент."], ["She is at school.", "Она в школе."], ["We are in the classroom.", "Мы в классе."]] },
                { title: "Отрицание", text: "Частица <b>not</b> ставится после глагола: <b>am not, is not (isn't), are not (aren't)</b>.", examples: [["He isn't a teacher.", "Он не учитель."], ["They aren't from London.", "Они не из Лондона."]] },
                { title: "Вопрос", text: "Глагол выходит на первое место: <b>Am I…? Is he…? Are you…?</b> Краткий ответ повторяет глагол.", examples: [["Are you a pupil? — Yes, I am.", "Ты ученик? — Да."], ["Is she at home? — No, she isn't.", "Она дома? — Нет."]] }
              ] },
              { type: "table", title: "Шпаргалка", head: ["Кто", "Утверждение", "Отрицание", "Вопрос"], rows: [
                ["I", "I am / I'm", "I am not / I'm not", "Am I…?"],
                ["he / she / it", "He is / He's", "He isn't", "Is he…?"],
                ["we / you / they", "We are / We're", "We aren't", "Are we…?"]
              ] }
            ]
          },
          {
            title: "Pronouns & articles", ru: "Местоимения и артикли",
            blocks: [
              { type: "table", title: "Личные и притяжательные местоимения", head: ["Личное", "Притяжательное", "Перевод"], rows: [
                ["I", "my", "я — мой"], ["you", "your", "ты — твой"], ["he", "his", "он — его"],
                ["she", "her", "она — её"], ["it", "its", "оно — его"], ["we", "our", "мы — наш"],
                ["they", "their", "они — их"]
              ] },
              { type: "rule", title: "Притяжательные местоимения", items: [
                { title: "Перед существительным", text: "Притяжательное местоимение отвечает на вопрос «чей?» и стоит перед предметом: <b>my book, her bag, their school</b>.", examples: [["This is my notebook.", "Это моя тетрадь."], ["Her name is Anna.", "Её зовут Анна."]] },
                { title: "Не путайте", text: "<b>Its</b> — «его/её» для предмета или животного, <b>it's</b> — сокращение от <b>it is</b>.", examples: [["The dog is in its house.", "Собака в своей будке."], ["It's my school.", "Это моя школа."]] }
              ] },
              { type: "rule", title: "Артикли a / an", items: [
                { title: "Когда ставим", text: "Перед исчисляемым существительным в единственном числе, если речь о любом предмете: <b>a pen, an apple</b>.", examples: [["I have got a ruler.", "У меня есть линейка."], ["She is an artist.", "Она художник."]] },
                { title: "a или an?", text: "<b>a</b> — перед согласным звуком, <b>an</b> — перед гласным звуком: <b>a book</b>, <b>an eraser</b>, <b>an hour</b> (звук гласный, буква h не читается).", examples: [["an apple", "яблоко"], ["a computer", "компьютер"], ["an hour", "час"]] }
              ] }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "Classroom English", ru: "Фразы для урока",
            blocks: [
              { type: "phrase", title: "Просим и уточняем", items: [
                ["Can I come in, please?", "Можно войти?"],
                ["Sorry, I'm late.", "Извините, я опоздал."],
                ["Can you repeat that, please?", "Повторите, пожалуйста."],
                ["How do you spell it?", "Как это пишется?"],
                ["What does this word mean?", "Что значит это слово?"],
                ["I don't understand.", "Я не понимаю."],
                ["Can I open the window?", "Можно открыть окно?"],
                ["May I go out, please?", "Можно выйти?"],
                ["Open your books, please.", "Откройте учебники, пожалуйста."],
                ["Listen and repeat.", "Слушайте и повторяйте."]
              ] }
            ]
          },
          {
            title: "About school", ru: "Говорим о школе",
            blocks: [
              { type: "phrase", title: "Вопросы и ответы", items: [
                ["What's your favourite subject?", "Какой твой любимый предмет?"],
                ["My favourite subject is Maths.", "Мой любимый предмет — математика."],
                ["How many lessons do you have on Monday?", "Сколько уроков у тебя в понедельник?"],
                ["We have six lessons.", "У нас шесть уроков."],
                ["What time does school start?", "Во сколько начинается школа?"],
                ["School starts at 8:30.", "Школа начинается в 8:30."],
                ["Do you wear a uniform?", "Ты носишь форму?"],
                ["Yes, I do. / No, I don't.", "Да. / Нет."],
                ["What do you do at break?", "Что ты делаешь на перемене?"],
                ["I play with my friends.", "Я играю с друзьями."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Schools in Russia and the UK", ru: "Школы России и Британии",
            blocks: [
              { type: "note", title: "Как устроена школа", text: [
                "В России дети идут в школу в 6–7 лет и учатся 11 лет. Пятый класс — начало средней школы: появляются новые предметы и кабинетная система. Оценки чаще всего ставят по пятибалльной шкале, а школа начинается около 8–9 часов.",
                "В Британии начальная школа (primary school) заканчивается в 11 лет, затем начинается средняя (secondary school). Ученики часто носят форму, а оценки обозначают буквами. Учебный год делится на три триместра (terms) и длится с сентября по июль."
              ] },
              { type: "words", title: "Полезные слова", items: [
                ["uniform", "школьная форма"], ["timetable", "расписание"], ["break", "перемена"],
                ["canteen", "столовая"], ["club", "кружок"], ["mark", "оценка"],
                ["term", "триместр"], ["holiday", "каникулы"]
              ] },
              { type: "phrase", title: "Сравниваем", items: [
                ["In Russia, school starts at 8 o'clock.", "В России школа начинается в 8 часов."],
                ["In the UK, students wear a uniform.", "В Британии ученики носят форму."],
                ["Both schools have lessons in the morning.", "В обеих школах уроки утром."]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== MODULE 2 ============================== */
  SPOTLIGHT.modules.push({
    title: "That's me", ru: "Это я", icon: "🌍", color: "#ff7ab6",
    badge: "2", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Countries & nationalities", ru: "Страны и национальности",
            blocks: [
              { type: "words", title: "Страна → национальность", items: [
                ["Russia — Russian", "Россия — русский / россиянин"],
                ["the UK — British", "Великобритания — британский"],
                ["the USA — American", "США — американский"],
                ["Canada — Canadian", "Канада — канадский"],
                ["Australia — Australian", "Австралия — австралийский"],
                ["New Zealand — New Zealander", "Новая Зеландия — новозеландец"],
                ["Japan — Japanese", "Япония — японский"],
                ["China — Chinese", "Китай — китайский"],
                ["France — French", "Франция — французский"],
                ["Italy — Italian", "Италия — итальянский"],
                ["Spain — Spanish", "Испания — испанский"],
                ["Germany — German", "Германия — немецкий"],
                ["Brazil — Brazilian", "Бразилия — бразильский"],
                ["Mexico — Mexican", "Мексика — мексиканский"],
                ["India — Indian", "Индия — индийский"],
                ["Egypt — Egyptian", "Египет — египетский"]
              ] },
              { type: "note", title: "Важно", text: [
                "Названия стран пишутся с большой буквы. Национальности и языки тоже: <b>He is French. He speaks French.</b>",
                "С артиклем <b>the</b> употребляются <b>the UK, the USA</b>. Названия стран-сокращений и некоторых других стран — с артиклем."
              ] }
            ]
          },
          {
            title: "My things", ru: "Мои вещи",
            blocks: [
              { type: "words", title: "Личные вещи", items: [
                ["watch", "часы (наручные)"], ["camera", "фотоаппарат"], ["mobile phone", "мобильный телефон"],
                ["laptop", "ноутбук"], ["MP3 player", "MP3-плеер"], ["headphones", "наушники"],
                ["keys", "ключи"], ["wallet", "кошелёк"], ["umbrella", "зонт"], ["sunglasses", "солнечные очки"],
                ["gloves", "перчатки"], ["scarf", "шарф"], ["hat", "шапка"], ["cap", "кепка"],
                ["bag", "сумка"], ["trainers", "кроссовки"], ["helmet", "шлем"], ["skateboard", "скейтборд"]
              ] },
              { type: "words", title: "Коллекции", items: [
                ["stamp", "марка"], ["coin", "монета"], ["badge", "значок"], ["sticker", "наклейка"],
                ["comic", "комикс"], ["figurine", "фигурка"]
              ] },
              { type: "phrase", title: "Говорим о коллекции", items: [
                ["I collect stamps.", "Я коллекционирую марки."],
                ["I have got a collection of coins.", "У меня есть коллекция монет."],
                ["My collection is small but interesting.", "Моя коллекция небольшая, но интересная."]
              ] }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Plurals", ru: "Множественное число",
            blocks: [
              { type: "rule", title: "Правила", items: [
                { title: "+ s", text: "Обычно просто добавляем <b>-s</b>: <b>book → books</b>.", examples: [["pen → pens", "ручки"], ["desk → desks", "столы"]] },
                { title: "+ es", text: "После <b>-s, -ss, -sh, -ch, -x, -o</b> добавляем <b>-es</b>: <b>box → boxes</b>, <b>watch → watches</b>.", examples: [["bus → buses", "автобусы"], ["potato → potatoes", "картофелины"]] },
                { title: "y → ies", text: "Согласная + <b>y</b> → <b>ies</b>: <b>city → cities</b>. Гласная + y → просто <b>-s</b>: <b>boy → boys</b>.", examples: [["family → families", "семьи"], ["toy → toys", "игрушки"]] },
                { title: "f / fe → ves", text: "Некоторые слова меняют окончание: <b>leaf → leaves</b>, <b>knife → knives</b>, <b>shelf → shelves</b>.", examples: [["wolf → wolves", "волки"], ["wife → wives", "жёны"]] }
              ] },
              { type: "table", title: "Особые формы", head: ["Единственное", "Множественное", "Перевод"], rows: [
                ["man", "men", "мужчина"], ["woman", "women", "женщина"], ["child", "children", "ребёнок"],
                ["person", "people", "человек / люди"], ["mouse", "mice", "мышь"], ["foot", "feet", "ступня"],
                ["tooth", "teeth", "зуб"], ["fish", "fish", "рыба"], ["sheep", "sheep", "овца"]
              ] }
            ]
          },
          {
            title: "this / that / these / those", ru: "Указательные местоимения",
            blocks: [
              { type: "table", title: "Близко и далеко", head: ["", "Один предмет", "Несколько"], rows: [
                ["Близко", "this — этот", "these — эти"], ["Далеко", "that — тот", "those — те"]
              ] },
              { type: "rule", title: "Как употреблять", items: [
                { title: "this / these", text: "Предмет рядом с говорящим. <b>This is my pen.</b> / <b>These are my pens.</b>", examples: [["This is my bag.", "Это моя сумка."], ["These are my books.", "Это мои книги."]] },
                { title: "that / those", text: "Предмет далеко. <b>That is his bike.</b> / <b>Those are her flowers.</b>", examples: [["That is your desk.", "Тот стол — твой."], ["Those are their toys.", "Те игрушки — их."]] },
                { title: "Вопрос", text: "<b>What's this? — It's a watch.</b> <b>What are these? — They're watches.</b>", examples: [["What's that?", "Что это там?"], ["What are those?", "Что то там за предметы?"]] }
              ] }
            ]
          },
          {
            title: "have got", ru: "Конструкция have got",
            blocks: [
              { type: "rule", title: "У меня есть…", items: [
                { title: "Утверждение", text: "<b>I / you / we / they have got</b>, <b>he / she / it has got</b>. В разговорной речи: <b>I've got</b>, <b>she's got</b>.", examples: [["I have got a new bike.", "У меня есть новый велосипед."], ["She has got a cat.", "У неё есть кошка."]] },
                { title: "Отрицание", text: "<b>haven't got</b> / <b>hasn't got</b>.", examples: [["I haven't got a camera.", "У меня нет фотоаппарата."], ["He hasn't got a sister.", "У него нет сестры."]] },
                { title: "Вопрос", text: "<b>Have you got…?</b> / <b>Has she got…?</b> Краткие ответы: <b>Yes, I have. / No, she hasn't.</b>", examples: [["Have you got a pet?", "У тебя есть питомец?"], ["Has he got a laptop?", "У него есть ноутбук?"]] }
              ] },
              { type: "tip", text: "В американском английском чаще говорят <b>Do you have…?</b> и <b>I have…</b>, но <b>have got</b> тоже понимают." }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "Buying a souvenir", ru: "Покупаем сувенир",
            blocks: [
              { type: "phrase", title: "В магазине", items: [
                ["Can I help you?", "Я могу вам помочь?"],
                ["I'm looking for a souvenir.", "Я ищу сувенир."],
                ["How much is it?", "Сколько это стоит?"],
                ["How much are they?", "Сколько они стоят?"],
                ["Can I have this T-shirt, please?", "Можно мне эту футболку?"],
                ["Can I try it on?", "Можно примерить?"],
                ["It's too big / small.", "Это слишком большое / маленькое."],
                ["I'll take it.", "Я это беру."],
                ["Here you are. — Thank you.", "Вот, пожалуйста. — Спасибо."]
              ] }
            ]
          },
          {
            title: "About me", ru: "Рассказ о себе",
            blocks: [
              { type: "phrase", title: "Знакомство", items: [
                ["Where are you from?", "Откуда ты?"],
                ["I'm from Russia. I'm Russian.", "Я из России. Я русский."],
                ["How old are you?", "Сколько тебе лет?"],
                ["I'm eleven years old.", "Мне одиннадцать лет."],
                ["When is your birthday?", "Когда у тебя день рождения?"],
                ["It's on the 5th of May.", "Пятого мая."],
                ["This is my friend Alex.", "Это мой друг Алекс."],
                ["He is from Canada.", "Он из Канады."]
              ] },
              { type: "tip", text: "С датами используем порядковые числительные: <b>the fifth of May</b> или <b>May 5th</b>." }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Souvenirs", ru: "Сувениры России и Британии",
            blocks: [
              { type: "note", title: "Что привозят туристы", text: [
                "Из России часто привозят матрёшку, самовар, балалайку, изделия Гжели и Хохломы, дымковскую игрушку и ушанку. Это не просто предметы — за каждым стоит традиция.",
                "Из Британии везут чай, шотландское печенье, открытки с Юнион Джеком, модели красного двухэтажного автобуса и Биг-Бена, плюшевых медведей."
              ] },
              { type: "words", title: "Российские сувениры", items: [
                ["matryoshka", "матрёшка"], ["samovar", "самовар"], ["balalaika", "балалайка"],
                ["Gzhel", "гжель"], ["Khokhloma", "хохлома"], ["Dymkovo toy", "дымковская игрушка"],
                ["ushanka", "ушанка"], ["amber", "янтарь"]
              ] },
              { type: "words", title: "Британские сувениры", items: [
                ["tea", "чай"], ["shortbread", "шотландское печенье"], ["Union Jack", "флаг Великобритании"],
                ["double-decker bus", "двухэтажный автобус"], ["red phone box", "красная телефонная будка"],
                ["Big Ben", "Биг-Бен"], ["teddy bear", "плюшевый медведь"], ["postcard", "открытка"]
              ] }
            ]
          }
        ]
      }
    ]
  });

  /* ============================== MODULE 3 ============================== */
  SPOTLIGHT.modules.push({
    title: "My home, my castle", ru: "Мой дом — моя крепость", icon: "🏠", color: "#ffb454",
    badge: "3", kind: "module",
    branches: [
      {
        title: "Vocabulary", ru: "Лексика", icon: "📚",
        leaves: [
          {
            title: "Rooms", ru: "Комнаты",
            blocks: [
              { type: "words", title: "Комнаты в доме", items: [
                ["living room", "гостиная"], ["bedroom", "спальня"], ["kitchen", "кухня"],
                ["bathroom", "ванная"], ["hall", "прихожая"], ["dining room", "столовая"],
                ["study", "кабинет"], ["garage", "гараж"], ["attic", "чердак"],
                ["basement", "подвал"], ["toilet", "туалет"], ["balcony", "балкон"],
                ["garden", "сад"]
              ] },
              { type: "phrase", title: "Где это?", items: [
                ["What's your favourite room?", "Какая твоя любимая комната?"],
                ["My favourite room is my bedroom.", "Моя любимая комната — спальня."],
                ["The kitchen is downstairs.", "Кухня на первом этаже."],
                ["The bedrooms are upstairs.", "Спальни наверху."]
              ] }
            ]
          },
          {
            title: "Furniture", ru: "Мебель и предметы",
            blocks: [
              { type: "words", title: "Мебель", items: [
                ["sofa", "диван"], ["armchair", "кресло"], ["chair", "стул"], ["table", "стол"],
                ["bed", "кровать"], ["wardrobe", "шкаф для одежды"], ["bookcase", "книжный шкаф"],
                ["shelf", "полка"], ["desk", "письменный стол"], ["lamp", "лампа"],
                ["mirror", "зеркало"], ["carpet", "ковёр"], ["curtains", "шторы"],
                ["fridge", "холодильник"], ["cooker", "плита"], ["sink", "раковина"],
                ["bath", "ванна"], ["shower", "душ"], ["washbasin", "умывальник"],
                ["washing machine", "стиральная машина"]
              ] },
              { type: "tip", text: "Мебель неисчисляемая? Нет! <b>Furniture</b> — неисчисляемое слово: <i>There is a lot of furniture.</i> Но конкретные предметы считаются: <i>two chairs, three beds</i>." }
            ]
          }
        ]
      },
      {
        title: "Grammar", ru: "Грамматика", icon: "🧩",
        leaves: [
          {
            title: "Prepositions of place", ru: "Предлоги места",
            blocks: [
              { type: "words", title: "Где находится предмет", items: [
                ["in", "в"], ["on", "на"], ["under", "под"], ["behind", "за"],
                ["in front of", "перед"], ["next to", "рядом с"], ["between", "между"],
                ["opposite", "напротив"], ["above", "над"], ["below", "под (ниже)"],
                ["near", "около"], ["over", "над"]
              ] },
              { type: "rule", title: "Как строить предложение", items: [
                { title: "Порядок слов", text: "Предмет + <b>is/are</b> + предлог + место: <b>The cat is under the table.</b>", examples: [["The book is on the desk.", "Книга на столе."], ["The shoes are next to the bed.", "Туфли рядом с кроватью."]] },
                { title: "Вопрос", text: "<b>Where is…?</b> / <b>Where are…?</b>", examples: [["Where is the mirror?", "Где зеркало?"], ["It's on the wall.", "Оно на стене."]] }
              ] },
              { type: "table", title: "Сравните", head: ["Предлог", "Пример", "Перевод"], rows: [
                ["in", "The pens are in the bag.", "Ручки в сумке."],
                ["on", "The lamp is on the table.", "Лампа на столе."],
                ["under", "The cat is under the chair.", "Кошка под стулом."],
                ["behind", "The garden is behind the house.", "Сад за домом."],
                ["between", "The chair is between the desk and the bed.", "Стул между столом и кроватью."]
              ] }
            ]
          },
          {
            title: "There is / there are", ru: "Оборот there is / there are",
            blocks: [
              { type: "rule", title: "Говорим, что что-то есть", items: [
                { title: "Один предмет", text: "<b>There is a …</b> — «есть / находится».", examples: [["There is a sofa in the living room.", "В гостиной есть диван."], ["There is a lamp on the desk.", "На столе есть лампа."]] },
                { title: "Несколько предметов", text: "<b>There are …</b> — во множественном числе.", examples: [["There are two chairs in the kitchen.", "На кухне два стула."], ["There are some pictures on the wall.", "На стене есть картины."]] },
                { title: "Отрицание и вопрос", text: "<b>There isn't / There aren't</b>. Вопрос: <b>Is there…? Are there…?</b>", examples: [["There isn't a TV in my room.", "В моей комнате нет телевизора."], ["Are there any books on the shelf?", "На полке есть книги?"]] }
              ] },
              { type: "table", title: "Краткие ответы", head: ["Вопрос", "Да", "Нет"], rows: [
                ["Is there a garden?", "Yes, there is.", "No, there isn't."],
                ["Are there any chairs?", "Yes, there are.", "No, there aren't."]
              ] },
              { type: "tip", text: "В вопросах и отрицаниях с множественным числом часто появляется <b>any</b>: <i>Are there any pictures?</i> В утверждении — <b>some</b>: <i>There are some pictures.</i>" }
            ]
          }
        ]
      },
      {
        title: "Speaking", ru: "Говорение", icon: "💬",
        leaves: [
          {
            title: "Describing a home", ru: "Описываем дом",
            blocks: [
              { type: "phrase", title: "Мой дом", items: [
                ["I live in a flat.", "Я живу в квартире."],
                ["It's on the fifth floor.", "Она на пятом этаже."],
                ["There are three rooms in my flat.", "В моей квартире три комнаты."],
                ["My room is small but cozy.", "Моя комната маленькая, но уютная."],
                ["There is a bed, a desk and a wardrobe.", "Там есть кровать, стол и шкаф."],
                ["I like my room because it's quiet.", "Мне нравится моя комната, потому что там тихо."],
                ["The windows face the garden.", "Окна выходят в сад."],
                ["Come in, please!", "Входи, пожалуйста!"]
              ] },
              { type: "tip", text: "Порядковые числительные для этажей: <b>first, second, third, fourth, fifth</b>. <i>I live on the third floor.</i>" }
            ]
          }
        ]
      },
      {
        title: "Culture", ru: "Страноведение", icon: "🌍",
        leaves: [
          {
            title: "Russian izba & British homes", ru: "Русская изба и британские дома",
            blocks: [
              { type: "note", title: "Два мира — два дома", text: [
                "Русская изба строилась из дерева, без единого гвоздя. Главное место занимала печь: она грела, лечила и кормила. Окна украшали резными наличниками, а на крыше часто был конёк — фигурка коня.",
                "В Британии распространены террасные дома (terraced), дома на две семьи (semi-detached), отдельные дома (detached) и сельские коттеджи (cottage). У многих есть небольшой сад, а камины и по сей день остаются символом уюта."
              ] },
              { type: "words", title: "Дома и детали", items: [
                ["izba", "изба"], ["stove", "печь"], ["wooden", "деревянный"],
                ["carved window frames", "резные наличники"], ["dacha", "дача"],
                ["terraced house", "террасный дом"], ["semi-detached house", "дом на две семьи"],
                ["detached house", "отдельный дом"], ["cottage", "коттедж"], ["fireplace", "камин"]
              ] },
              { type: "phrase", title: "Сравниваем", items: [
                ["The izba is made of wood.", "Изба сделана из дерева."],
                ["A British cottage often has a garden.", "У британского коттеджа часто есть сад."],
                ["Both homes are warm and cozy.", "Оба дома тёплые и уютные."]
              ] }
            ]
          }
        ]
      }
    ]
  });

})();
