/* Spotlight 5 — reading & writing, one branch for every module */
(function () {

  const M = SPOTLIGHT.modules;

  function add(mi, o) {
    const LEVELS = ["A1", "A1", "A1", "A1", "A1+", "A1+", "A1+", "A1+", "A2", "A2", "A2", "A2"];
    const plain = String(o.paragraphs.join(" ")).replace(/<[^>]+>/g, " ");
    const words = plain.split(/\s+/).filter(Boolean).length;
    M[mi].branches.push({
      title: "Reading & writing", ru: "Чтение и письмо", icon: "📚",
      leaves: [
        {
          title: o.readTitle, ru: o.readRu, level: LEVELS[mi] || "A1", words: words,
          blocks: [
            { type: "lead", text: o.lead },
            { type: "text", title: o.textTitle, paragraphs: o.paragraphs, glossary: o.glossary },
            { type: "choice", title: "Понял ли ты текст?", intro: "Выбери правильный вариант. Если ошибся — вернись к нужному месту в тексте и перечитай.", items: o.choices },
            { type: "task", title: "Ответь на вопросы", intro: "Отвечай полными предложениями: так ты тренируешь и понимание текста, и грамматику.", items: o.questions },
            { type: "project", title: "Обсуди в классе", text: o.project }
          ]
        },
        {
          title: o.writeTitle, ru: o.writeRu,
          blocks: [
            { type: "lead", text: o.writeLead },
            { type: "task", title: "Письменное задание", intro: "Сначала напиши черновик, потом проверь его по образцу ниже.", items: o.writeTasks },
            { type: "task", title: "Сверься с образцом", intro: "Не копируй слово в слово — возьми структуру и замени детали на свои.", items: [{ q: "Прочитай образец и сравни с ним свой текст.", a: o.model }] },
            { type: "project", title: "Мини-проект", text: o.projectWrite }
          ]
        }
      ]
    });
  }

  /* ------------------------------ STARTER ------------------------------ */
  add(0, {
    readTitle: "My first English lesson", readRu: "Мой первый урок английского",
    lead: "Первый текст не должен пугать. Здесь всего несколько коротких предложений — ровно столько, сколько нужно, чтобы рассказать о себе. Прочитай его вслух, даже если пока не уверен в произношении.",
    textTitle: "Nina's first lesson",
    paragraphs: [
      "Hi! My name is Nina. I am eleven. I am a pupil. My school is big and nice.",
      "My English teacher is Mrs Brown. She is kind and funny. In the lesson we read, write and sing songs. I like English.",
      "My favourite word is <b>sunflower</b>. It is long, but it is beautiful. After school I go home and have dinner. In the evening I do my homework. Goodbye!"
    ],
    glossary: [["pupil", "ученик"], ["teacher", "учитель"], ["kind", "добрый"], ["favourite", "любимый"], ["homework", "домашняя работа"]],
    choices: [
      { q: "Nina is eleven.", options: ["Верно", "Неверно"], correct: 0, explain: "В тексте есть предложение I am eleven." },
      { q: "Nina's school is small.", options: ["Верно", "Неверно"], correct: 1, explain: "Нина говорит: My school is big and nice — школа большая." },
      { q: "Nina likes English.", options: ["Верно", "Неверно"], correct: 0, explain: "Она прямо говорит: I like English." }
    ],
    questions: [
      { q: "What is the girl's name?", a: "Her name is Nina." },
      { q: "How old is she?", a: "She is eleven." },
      { q: "What is her favourite word?", a: "Her favourite word is sunflower." },
      { q: "What does she do in the evening?", a: "She does her homework." }
    ],
    project: "Нарисуй маленькое солнце и напиши вокруг него 4 слова, которые ты уже знаешь по-английски.",
    writeTitle: "Write about yourself", writeRu: "Пишем о себе",
    writeLead: "Самое первое письмо о себе — это 4–5 коротких предложений. В них есть имя, возраст, город и любимое занятие. Никаких сложных конструкций: только am, is, are и обычные слова.",
    writeTasks: [
      { q: "Напиши 4 предложения: как тебя зовут, сколько тебе лет, откуда ты, что ты любишь.", a: "Начни так: My name is … I am … I am from … I like …" },
      { q: "Добавь одно предложение о школе.", a: "Например: I am a pupil. My school is big. My favourite subject is Art." }
    ],
    model: "My name is Misha. I am eleven. I am from Russia. I am a pupil. My school is big. I like English and Art. My favourite colour is blue.",
    projectWrite: "Сделай визитку: имя, возраст, город, любимый предмет. Покажи её однокласснику и расскажи о себе, не подглядывая."
  });

  /* ------------------------------ MODULE 1 ------------------------------ */
  add(1, {
    readTitle: "Monday at School No. 5", readRu: "Понедельник в школе № 5",
    lead: "Этот текст — рассказ пятиклассника о своём понедельнике. Обрати внимание, как он называет уроки, школьные предметы и время. Потом попробуй рассказать так же о своём дне.",
    textTitle: "Six lessons and a chess game",
    paragraphs: [
      "Hi! I am Igor. I am a pupil at School No. 5. On Monday I have six lessons: Maths, Russian, English, History, Art and PE. My favourite subject is English.",
      "Our classroom is big. There is a blackboard, a computer and a bookcase in it. We have English on Tuesday and Friday. At break I play with my friends.",
      "I don't wear a uniform, but my friend Dima wears a uniform. After school I go home and do my homework. In the evening I read or play chess."
    ],
    glossary: [["pupil", "ученик"], ["subject", "предмет"], ["break", "перемена"], ["uniform", "форма"], ["chess", "шахматы"]],
    choices: [
      { q: "Igor has five lessons on Monday.", options: ["Верно", "Неверно"], correct: 1, explain: "У Игоря шесть уроков: six lessons." },
      { q: "English is his favourite subject.", options: ["Верно", "Неверно"], correct: 0, explain: "Он говорит: My favourite subject is English." },
      { q: "Igor wears a uniform.", options: ["Верно", "Неверно"], correct: 1, explain: "Форму носит его друг Дима, а не Игорь: my friend Dima wears a uniform." }
    ],
    questions: [
      { q: "What lessons does Igor have on Monday?", a: "He has Maths, Russian, English, History, Art and PE." },
      { q: "When does he have English?", a: "He has English on Tuesday and Friday." },
      { q: "What is there in the classroom?", a: "There is a blackboard, a computer and a bookcase." },
      { q: "What does he do after school?", a: "He goes home and does his homework." }
    ],
    project: "Сравни свой понедельник с днём Игоря: сколько у тебя уроков, какой предмет любимый и что ты делаешь на перемене.",
    writeTitle: "Write about your school day", writeRu: "Пишем о школьном дне",
    writeLead: "Рассказ о школьном дне удобно строить по схеме: когда начинается, сколько уроков, любимый предмет, что делаешь на перемене и после школы.",
    writeTasks: [
      { q: "Напиши 5 предложений о своём школьном дне.", a: "Используй: On Monday I have… My favourite subject is… At break I… After school I…" },
      { q: "Добавь предложение о том, чего у тебя нет в школе.", a: "Например: I don't wear a uniform. We don't have lessons on Saturday." }
    ],
    model: "On Monday I have six lessons. They are Russian, Maths, English, History, Art and PE. My favourite subject is English. At break I play with my friends. After school I go home and do my homework.",
    projectWrite: "Сделай расписание мечты на пятницу: пять уроков, две перемены и одно весёлое дело после школы. Расскажи о нём классу."
  });

  /* ------------------------------ MODULE 2 ------------------------------ */
  add(2, {
    readTitle: "My pen friend from Canada", readRu: "Мой друг по переписке из Канады",
    lead: "Письмо Эммы — хороший пример того, как рассказать о стране, семье и вещах. Заметь, как she и her сменяют друг друга: так текст звучит естественно.",
    textTitle: "A letter from Emma",
    paragraphs: [
      "Hi! I am Emma. I am from Canada, but my mum's family is from Italy. I am twelve. I have got a lot of things: a camera, a laptop and a collection of coins.",
      "My favourite thing is my old watch. It is from my grandfather. I have got two brothers. They are twins, and they are very funny. We speak English and Italian at home.",
      "My mum is Italian, and my dad is Canadian. I collect coins from different countries. Write to me and tell me about your collection!"
    ],
    glossary: [["pen friend", "друг по переписке"], ["collection", "коллекция"], ["twins", "близнецы"], ["country", "страна"], ["different", "разные"]],
    choices: [
      { q: "Emma is from Italy.", options: ["Верно", "Неверно"], correct: 1, explain: "Эмма из Канады, а её мама — из Италии: my mum is Italian." },
      { q: "Emma has got two brothers.", options: ["Верно", "Неверно"], correct: 0, explain: "Она пишет: I have got two brothers." },
      { q: "Her favourite thing is a camera.", options: ["Верно", "Неверно"], correct: 1, explain: "Любимая вещь Эммы — старые часы: my old watch." }
    ],
    questions: [
      { q: "How old is Emma?", a: "She is twelve." },
      { q: "What does she collect?", a: "She collects coins." },
      { q: "Where is her mum from?", a: "Her mum is from Italy." },
      { q: "What languages do they speak at home?", a: "They speak English and Italian." }
    ],
    project: "Расскажи о своей коллекции или любимой вещи: откуда она, почему дорога и что с ней связано.",
    writeTitle: "Write about your favourite thing", writeRu: "Пишем о любимой вещи",
    writeLead: "Описание вещи — это не только цвет и размер. Добавь историю: кто подарил, почему она важна. Тогда текст захочется дочитать.",
    writeTasks: [
      { q: "Опиши любимую вещь в 4–5 предложениях: что это, откуда, почему нравится.", a: "Используй: I have got… It is… It is from… I like it because…" },
      { q: "Добавь одно предложение о том, где эта вещь сейчас.", a: "Например: It is on my desk. I take it to school every day." }
    ],
    model: "I have got an old camera. It is from my uncle. It is black and small. I like it because I take photos of my friends. My favourite photo is a picture of our cat.",
    projectWrite: "Принеси в класс маленькую вещь и расскажи о ней в четырёх предложениях. Одноклассники задают два вопроса."
  });

  /* ------------------------------ MODULE 3 ------------------------------ */
  add(3, {
    readTitle: "Grandma's house", readRu: "Дом бабушки",
    lead: "В этом тексте много there is, there are и предлогов места. Читай медленно и представляй комнаты: так предлоги запоминаются сами.",
    textTitle: "An old house in a village",
    paragraphs: [
      "My grandmother lives in a small village. Her house is old and white. There are three rooms: a kitchen, a bedroom and a living room. There is a big stove in the kitchen.",
      "My grandma's cat sleeps under the table. In the garden there are apple trees and a small bench. I like the attic: there are many old books and photographs there.",
      "My favourite photograph is on the wall. It is a picture of my grandma when she was young. Her house is not modern, but it is very cozy."
    ],
    glossary: [["village", "деревня"], ["stove", "печь"], ["attic", "чердак"], ["bench", "скамейка"], ["cozy", "уютный"]],
    choices: [
      { q: "The house is new.", options: ["Верно", "Неверно"], correct: 1, explain: "Дом старый: Her house is old and white." },
      { q: "There are three rooms in the house.", options: ["Верно", "Неверно"], correct: 0, explain: "There are three rooms: a kitchen, a bedroom and a living room." },
      { q: "The cat sleeps on the table.", options: ["Верно", "Неверно"], correct: 1, explain: "Кошка спит под столом: under the table." }
    ],
    questions: [
      { q: "Where does the grandmother live?", a: "She lives in a small village." },
      { q: "What is there in the garden?", a: "There are apple trees and a small bench." },
      { q: "What is in the attic?", a: "There are many old books and photographs." },
      { q: "Why does the author like the house?", a: "Because it is very cozy." }
    ],
    project: "Нарисуй план дома бабушки и подпиши комнаты по-английски. Проверь, где стоит печь и где спит кот.",
    writeTitle: "Describe your home", writeRu: "Описываем дом",
    writeLead: "Когда описываешь дом, начни с общего (квартира или дом, сколько комнат), потом перейди к любимой комнате и деталям. Предлоги места сделают текст точным.",
    writeTasks: [
      { q: "Напиши 5 предложений о своей комнате: что там есть и где стоит.", a: "Используй: There is… There are… My favourite place is…" },
      { q: "Добавь предложение о виде из окна.", a: "Например: From my window I can see a garden and a small tree." }
    ],
    model: "My room is small but cozy. There is a bed, a desk and a bookcase. My desk is next to the window. There are some posters on the wall. I like my room because it is quiet.",
    projectWrite: "Сделай план своей квартиры и подпиши комнаты по-английски. Расскажи, где твоё любимое место и почему."
  });

  /* ------------------------------ MODULE 4 ------------------------------ */
  add(4, {
    readTitle: "The Ivanov family", readRu: "Семья Ивановых",
    lead: "Здесь встретились почти все темы модуля: члены семьи, внешность, характер и can. Попробуй найти по одному примеру на каждую.",
    textTitle: "Five people, one big table",
    paragraphs: [
      "The Ivanovs are a friendly family. There are five of them: mum, dad, two children and a grandmother. Mum is a doctor. She is kind and hard-working.",
      "Dad is a chef; he can cook very well. His cakes are delicious. The children are Max and Lena. Max is tall and has got curly hair. He is brave and funny.",
      "Lena is shy but very creative. She can draw beautiful pictures. Their grandmother lives with them. She tells funny stories. On Sundays they have dinner together."
    ],
    glossary: [["friendly", "дружный"], ["hard-working", "трудолюбивый"], ["chef", "повар"], ["shy", "застенчивый"], ["creative", "творческий"]],
    choices: [
      { q: "There are four people in the family.", options: ["Верно", "Неверно"], correct: 1, explain: "В семье пять человек: five of them." },
      { q: "Dad can cook well.", options: ["Верно", "Неверно"], correct: 0, explain: "Он повар: he can cook very well." },
      { q: "Lena is shy.", options: ["Верно", "Неверно"], correct: 0, explain: "Lena is shy but very creative." }
    ],
    questions: [
      { q: "What does mum do?", a: "She is a doctor." },
      { q: "What does dad do?", a: "He is a chef." },
      { q: "What does Max look like?", a: "He is tall and has got curly hair." },
      { q: "What can Lena do?", a: "She can draw beautiful pictures." }
    ],
    project: "Придумай семью из четырёх человек и опиши каждого одним предложением: кто он, как выглядит, что умеет.",
    writeTitle: "Write about your family", writeRu: "Пишем о семье",
    writeLead: "Рассказ о семье получится живым, если добавить не только имена и профессии, но и характер, привычки и одно общее дело.",
    writeTasks: [
      { q: "Напиши 5 предложений о своей семье.", a: "Используй: There are… My mum is… She can… My… is…" },
      { q: "Добавь предложение о том, что вы делаете вместе.", a: "Например: On Sundays we cook dinner together." }
    ],
    model: "There are four people in my family. My mum is a teacher. She is kind and clever. My dad is an engineer. He can fix everything. I have got a younger sister. She is funny and creative.",
    projectWrite: "Сделай семейное дерево с подписями по-английски и расскажи о трёх родственниках."
  });

  /* ------------------------------ MODULE 5 ------------------------------ */
  add(5, {
    readTitle: "A letter from the zoo", readRu: "Письмо из зоопарка",
    lead: "Макс пишет из зоопарка и использует Present Simple: животные что-то делают обычно, а не прямо сейчас. Найди в тексте глаголы с -s — их не так много, но они важны.",
    textTitle: "Max at the zoo",
    paragraphs: [
      "Hi, it's Max. Today I am at the zoo with my class. We see a lot of animals. The elephants eat grass and apples. The monkeys are funny: they jump and play.",
      "My favourite animal is the Amur tiger. It lives in the forest and eats meat. It is big and strong, but it is also in danger. The zoo helps rare animals.",
      "I want to be a zoologist. What is your favourite animal? Write back!"
    ],
    glossary: [["zoo", "зоопарк"], ["rare", "редкий"], ["in danger", "в опасности"], ["zoologist", "зоолог"], ["forest", "лес"]],
    choices: [
      { q: "Max is at the zoo with his family.", options: ["Верно", "Неверно"], correct: 1, explain: "Он в зоопарке с классом: with my class." },
      { q: "The Amur tiger lives in the forest.", options: ["Верно", "Неверно"], correct: 0, explain: "It lives in the forest and eats meat." },
      { q: "Max wants to be a teacher.", options: ["Верно", "Неверно"], correct: 1, explain: "Он хочет стать зоологом: I want to be a zoologist." }
    ],
    questions: [
      { q: "What do the elephants eat?", a: "They eat grass and apples." },
      { q: "What does the tiger eat?", a: "It eats meat." },
      { q: "Why does the zoo help animals?", a: "Because some animals are rare and in danger." },
      { q: "What does Max want to be?", a: "He wants to be a zoologist." }
    ],
    project: "Выбери животное и расскажи о нём по плану: где живёт, что ест, что умеет, почему оно интересное.",
    writeTitle: "Write about an animal", writeRu: "Пишем о животном",
    writeLead: "Хороший рассказ о животном отвечает на четыре вопроса: где оно живёт, что ест, что умеет и чем оно особенное. Пятое предложение можно посвятить своему отношению.",
    writeTasks: [
      { q: "Опиши животное в 5 предложениях.", a: "Используй: It lives in… It eats… It can… It has got…" },
      { q: "Добавь предложение о том, почему это животное важно.", a: "Например: It is in the Red Book, so we must protect it." }
    ],
    model: "The snow leopard lives in the mountains. It eats meat. It can jump very high. It has got thick fur and a long tail. It is a rare animal, so we must protect it.",
    projectWrite: "Сделай мини-плакат «Animal of Russia» с рисунком и четырьмя фактами о животном."
  });

  /* ------------------------------ MODULE 6 ------------------------------ */
  add(6, {
    readTitle: "Tom's Monday", readRu: "Понедельник Тома",
    lead: "Этот текст почти целиком состоит из Present Simple в третьем лице. Читай и замечай окончание -s: gets, brushes, goes, watches. Так проще запомнить правило.",
    textTitle: "From seven to ten",
    paragraphs: [
      "Tom is eleven. On Monday he gets up at seven o'clock. He has a shower, brushes his teeth and has breakfast. He goes to school at eight. Lessons start at nine.",
      "He has lunch at twelve. After school he walks the dog and does his homework. In the evening he watches TV with his sister. He goes to bed at ten.",
      "He is usually tired on Monday, but he likes school. His favourite lesson is Science."
    ],
    glossary: [["get up", "вставать"], ["brush teeth", "чистить зубы"], ["tired", "уставший"], ["usually", "обычно"], ["Science", "естествознание"]],
    choices: [
      { q: "Tom gets up at eight.", options: ["Верно", "Неверно"], correct: 1, explain: "Он встаёт в семь: gets up at seven o'clock." },
      { q: "Lessons start at nine.", options: ["Верно", "Неверно"], correct: 0, explain: "Lessons start at nine." },
      { q: "Tom has got a sister.", options: ["Верно", "Неверно"], correct: 0, explain: "Он смотрит телевизор с сестрой: with his sister." }
    ],
    questions: [
      { q: "What does Tom do before breakfast?", a: "He has a shower and brushes his teeth." },
      { q: "When does he have lunch?", a: "He has lunch at twelve." },
      { q: "What does he do after school?", a: "He walks the dog and does his homework." },
      { q: "What is his favourite lesson?", a: "His favourite lesson is Science." }
    ],
    project: "Составь своё расписание на понедельник и сравни с расписанием Тома: что совпадает, а что нет.",
    writeTitle: "My day", writeRu: "Мой день",
    writeLead: "В рассказе о дне важны порядок и время. Используй then, after that, in the evening — и текст перестанет быть просто списком.",
    writeTasks: [
      { q: "Напиши 6 предложений о своём дне.", a: "Используй: I get up at… Then I… After school… In the evening…" },
      { q: "Добавь предложение о том, что ты делаешь не каждый день.", a: "Например: On Friday I go to the swimming pool." }
    ],
    model: "I get up at seven. I have breakfast and go to school. Lessons start at eight. After school I do my homework and walk the dog. In the evening I read a book. I go to bed at ten.",
    projectWrite: "Сделай фото-историю «Мой день» из четырёх кадров с подписями по-английски."
  });

  /* ------------------------------ MODULE 7 ------------------------------ */
  add(7, {
    readTitle: "A rainy day in London", readRu: "Дождливый день в Лондоне",
    lead: "В этом тексте всё происходит прямо сейчас, поэтому почти каждый глагол стоит в Present Continuous. Найди три предложения с am, is или are + -ing.",
    textTitle: "Rain, tea and films",
    paragraphs: [
      "Today is Saturday. The weather in London is awful: it is raining and windy. My friends and I are at home. We are not playing football today.",
      "My sister is drawing a picture. My dad is cooking soup. My mum is reading a book. I am wearing a warm sweater and socks.",
      "I like rainy days because we can stay home, drink tea and watch films. What is the weather like in your city? Do you like rainy days?"
    ],
    glossary: [["awful", "ужасная"], ["windy", "ветрено"], ["soup", "суп"], ["sweater", "свитер"], ["stay", "оставаться"]],
    choices: [
      { q: "It is sunny in London.", options: ["Верно", "Неверно"], correct: 1, explain: "В тексте: it is raining and windy." },
      { q: "The family is at home.", options: ["Верно", "Неверно"], correct: 0, explain: "My friends and I are at home." },
      { q: "The author likes rainy days.", options: ["Верно", "Неверно"], correct: 0, explain: "Он говорит: I like rainy days." }
    ],
    questions: [
      { q: "What is the weather like?", a: "It is raining and windy." },
      { q: "What is dad doing?", a: "He is cooking soup." },
      { q: "What is mum doing?", a: "She is reading a book." },
      { q: "Why does the author like rainy days?", a: "Because they can stay home, drink tea and watch films." }
    ],
    project: "Нарисуй погоду за окном и подпиши три предложения в Present Continuous: what is happening right now?",
    writeTitle: "Weather in my city", writeRu: "Погода в моём городе",
    writeLead: "Описание погоды становится интереснее, если добавить, во что ты одет и что делают окружающие. Present Continuous здесь незаменим.",
    writeTasks: [
      { q: "Напиши 5 предложений о погоде сегодня.", a: "Используй: It is… today. I am wearing… My friends are…" },
      { q: "Добавь предложение о любимой погоде.", a: "Например: I like sunny weather because I can ride my bike." }
    ],
    model: "Today it is cold and snowy. I am wearing a warm coat, a scarf and gloves. My sister is making a snowman. My parents are drinking tea. I like snowy weather.",
    projectWrite: "Сделай прогноз погоды на завтра и расскажи его как диктор телевидения."
  });

  /* ------------------------------ MODULE 8 ------------------------------ */
  add(8, {
    readTitle: "Maslenitsa at our house", readRu: "Масленица у нас дома",
    lead: "Праздничный текст почти всегда про еду, гостей и традиции. Здесь есть some, any и much/many — попробуй объяснить, почему выбрано каждое слово.",
    textTitle: "Pancakes, guests and fireworks",
    paragraphs: [
      "Every year we celebrate Maslenitsa. My mum makes a lot of pancakes. We eat them with butter, honey or jam. There is some tea and milk on the table, but there isn't any juice.",
      "Our guests bring sweets and biscuits. My little brother eats too many pancakes! In the evening we go to the square. There are fireworks and a big fire.",
      "People say goodbye to winter. It is my favourite holiday. Do you celebrate Maslenitsa?"
    ],
    glossary: [["celebrate", "праздновать"], ["pancake", "блин"], ["honey", "мёд"], ["guest", "гость"], ["fireworks", "фейерверк"]],
    choices: [
      { q: "Mum makes pancakes.", options: ["Верно", "Неверно"], correct: 0, explain: "My mum makes a lot of pancakes." },
      { q: "There is some juice on the table.", options: ["Верно", "Неверно"], correct: 1, explain: "В тексте: there isn't any juice." },
      { q: "The family goes to the square in the evening.", options: ["Верно", "Неверно"], correct: 0, explain: "In the evening we go to the square." }
    ],
    questions: [
      { q: "What do they eat pancakes with?", a: "They eat them with butter, honey or jam." },
      { q: "Who eats too many pancakes?", a: "The little brother does." },
      { q: "What do guests bring?", a: "They bring sweets and biscuits." },
      { q: "What do people do in the square?", a: "They watch fireworks and a big fire." }
    ],
    project: "Расскажи о любимом празднике: когда его отмечают, с кем, что вы едите и что делаете вместе.",
    writeTitle: "My favourite holiday", writeRu: "Мой любимый праздник",
    writeLead: "Чтобы рассказ о празднике не превратился в список продуктов, добавь атмосферу: кто приходит, что вы делаете вместе и почему ты ждёшь этот день.",
    writeTasks: [
      { q: "Напиши 5 предложений о любимом празднике.", a: "Используй: We celebrate… We eat… There is… I like it because…" },
      { q: "Добавь предложение о подарке или угощении.", a: "Например: My grandma makes a big cake with berries." }
    ],
    model: "My favourite holiday is New Year. We celebrate it at home. There is a lot of food on the table. We eat salads, fruit and sweets. I like it because the whole family is together.",
    projectWrite: "Сделай открытку-приглашение на праздник на английском: дата, время, место и одно вкусное обещание."
  });

  /* ------------------------------ MODULE 9 ------------------------------ */
  add(9, {
    readTitle: "Saturday at the shopping centre", readRu: "Суббота в торговом центре",
    lead: "Этот рассказ целиком в Past Simple. Найди глаголы в прошедшем времени (went, bought, had, ate) и обрати внимание: после didn't глагол стоит без окончания.",
    textTitle: "A blue T-shirt and a pizza",
    paragraphs: [
      "Yesterday I went to the shopping centre with my mum. It was big and noisy. First we went to the clothes shop. I bought a blue T-shirt and a pair of trainers.",
      "Then we had lunch in a café. I ate a pizza and drank some juice. Mum paid by card. We didn't buy any food, because the supermarket was closed.",
      "We came home at six. It was a good day, but my feet hurt!"
    ],
    glossary: [["shopping centre", "торговый центр"], ["noisy", "шумный"], ["pair", "пара"], ["pay by card", "платить картой"], ["hurt", "болеть"]],
    choices: [
      { q: "They went to the shopping centre yesterday.", options: ["Верно", "Неверно"], correct: 0, explain: "Yesterday I went to the shopping centre." },
      { q: "The supermarket was open.", options: ["Верно", "Неверно"], correct: 1, explain: "В тексте: the supermarket was closed." },
      { q: "They came home at six.", options: ["Верно", "Неверно"], correct: 0, explain: "We came home at six." }
    ],
    questions: [
      { q: "What did the author buy?", a: "They bought a blue T-shirt and a pair of trainers." },
      { q: "What did they eat?", a: "They ate a pizza." },
      { q: "How did mum pay?", a: "She paid by card." },
      { q: "Why didn't they buy food?", a: "Because the supermarket was closed." }
    ],
    project: "Расскажи, что ты покупал в прошлый раз, где это было и сколько стоило. Не забудь про Past Simple.",
    writeTitle: "My last shopping trip", writeRu: "Моя последняя покупка",
    writeLead: "В рассказе о покупке важны три вещи: где ты был, что купил и сколько это стоило. Добавь одну деталь, которая запомнилась.",
    writeTasks: [
      { q: "Напиши 5 предложений о походе в магазин.", a: "Используй: Yesterday I went… I bought… It cost…" },
      { q: "Добавь предложение о том, что ты не купил и почему.", a: "Например: I didn't buy the trainers because they were too expensive." }
    ],
    model: "Last Saturday I went to the shop with my dad. I bought a new notebook and a pen. The notebook cost 100 roubles. We didn't buy any sweets. I paid by card.",
    projectWrite: "Разыграй с одноклассником диалог «В магазине»: продавец, покупатель, вопрос о цене и чек."
  });

  /* ------------------------------ MODULE 10 ------------------------------ */
  add(10, {
    readTitle: "Our trip to Sochi", readRu: "Наша поездка в Сочи",
    lead: "Рассказ о каникулах — это цепочка событий в Past Simple. Читай и мысленно ставь стрелочки: что было сначала, что потом, чем всё закончилось.",
    textTitle: "Train, sea and sandcastles",
    paragraphs: [
      "Last summer my family went to Sochi. We travelled by train. It was a long journey, but we liked it. We stayed in a small hotel near the sea.",
      "The weather was sunny and hot. Every morning I swam in the sea and built sandcastles. In the afternoon we went sightseeing.",
      "We visited a park and took a lot of photos. I bought a magnet for my friend. It was a wonderful holiday. Where did you go last summer?"
    ],
    glossary: [["journey", "поездка"], ["stay", "останавливаться"], ["sandcastle", "замок из песка"], ["sightseeing", "осмотр достопримечательностей"], ["wonderful", "чудесный"], ["magnet", "магнит"]],
    choices: [
      { q: "They travelled by plane.", options: ["Верно", "Неверно"], correct: 1, explain: "Они ехали на поезде: we travelled by train." },
      { q: "They stayed near the sea.", options: ["Верно", "Неверно"], correct: 0, explain: "We stayed in a small hotel near the sea." },
      { q: "The weather was cold.", options: ["Верно", "Неверно"], correct: 1, explain: "Погода была солнечная и жаркая: sunny and hot." }
    ],
    questions: [
      { q: "Where did they go?", a: "They went to Sochi." },
      { q: "How did they travel?", a: "They travelled by train." },
      { q: "What did they do every morning?", a: "They swam in the sea and built sandcastles." },
      { q: "What did the author buy?", a: "They bought a magnet." }
    ],
    project: "Расскажи о своей лучшей поездке: куда ты ездил, на чём, где жил и что делал. Используй Past Simple.",
    writeTitle: "My best holiday", writeRu: "Мои лучшие каникулы",
    writeLead: "Хороший рассказ о каникулах отвечает на вопросы where, how, where stayed, what did. В конце добавь одну фразу-впечатление.",
    writeTasks: [
      { q: "Напиши 6 предложений о своих каникулах.", a: "Используй: Last summer I went… We travelled by… I stayed…" },
      { q: "Добавь предложение о самом ярком моменте.", a: "Например: The best moment was a boat trip at sunset." }
    ],
    model: "Last summer I went to the village with my grandparents. We travelled by car. I swam in the river and played with my dog. The weather was warm. I had a great time.",
    projectWrite: "Сделай коллаж из фотографий или рисунков о каникулах и подпиши их по-английски."
  });

  /* ------------------------------ EXAM ------------------------------ */
  add(11, {
    readTitle: "A letter from Alex", readRu: "Письмо от Алекса",
    lead: "Это итоговый текст: в нём встретились Present Simple, can, have got и Past Simple. Прочитай его как письмо друга, а потом проверь, какие времена ты узнал.",
    textTitle: "Manchester, Friday",
    paragraphs: [
      "Hi! My name is Alex. I am twelve and I live in Manchester. I have got a big family: my parents, my sister and my dog.",
      "I go to school by bus. My favourite day is Friday because we have PE and Art. At the weekend I play football and help my mum.",
      "Last summer we went to the lake. We swam, fished and cooked dinner on a fire. I can play the guitar, but I can't sing well. Write back and tell me about your family and your favourite day."
    ],
    glossary: [["live", "жить"], ["weekend", "выходные"], ["fire", "костёр"], ["favourite", "любимый"], ["write back", "ответить письмом"]],
    choices: [
      { q: "Alex lives in London.", options: ["Верно", "Неверно"], correct: 1, explain: "Alex lives in Manchester." },
      { q: "His favourite day is Friday.", options: ["Верно", "Неверно"], correct: 0, explain: "My favourite day is Friday." },
      { q: "Alex can sing very well.", options: ["Верно", "Неверно"], correct: 1, explain: "Он говорит: I can't sing well." }
    ],
    questions: [
      { q: "How old is Alex?", a: "He is twelve." },
      { q: "How does he go to school?", a: "He goes to school by bus." },
      { q: "What did they do at the lake?", a: "They swam, fished and cooked dinner on a fire." },
      { q: "What can he do?", a: "He can play the guitar." }
    ],
    project: "Напиши ответ Алексу: 5–6 предложений о своей семье и любимом дне. Не забудь задать встречный вопрос.",
    writeTitle: "A letter to Alex", writeRu: "Письмо Алексу",
    writeLead: "Письмо другу — это не сочинение на оценку. Пиши так, как рассказал бы вслух: коротко, по делу и с вопросом в конце.",
    writeTasks: [
      { q: "Ответь Алексу по плану: имя, возраст, семья, любимый день.", a: "Начни так: Hi Alex! My name is… I am… There are…" },
      { q: "Закончи письмо вопросом.", a: "Например: What is your favourite subject? Do you like football?" }
    ],
    model: "Hi Alex! My name is Sasha. I am eleven. I live in Angarsk. There are four people in my family: mum, dad, my sister and me. My favourite day is Saturday because I play football. Write back soon!",
    projectWrite: "Отправь письмо однокласснику (или положи в конверт) и попроси ответить. Сравните, что у вас общего."
  });

})();
