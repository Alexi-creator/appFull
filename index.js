const express = require('express')
const mongoose = require('mongoose') // для работы с Mongo
const path = require('path') // для работы с Mongo
const exphbs = require('express-handlebars') // для работы с шаблонизатором
const router = require('./routes/todos.js') // для работы с роутами


const PORT = process.env.PORT || 3000

// используем роутинг который импортировали из другого файла где его подключили
const todoRoutes = router

// инициализируем переменные для работы с express и handlebars
const app = express()
const hbs = exphbs.create({
  // передаем настройки

  // указываем дефлотный шаблон для наших страниц
  defaultLayout: 'main',
  // указываем расширение для файлов шаблонов, чтобы писать короче
  extname: 'hbs'
})

// подключаем движок для рендеренга страниц
// 1-й паметр любое название, 2-й наш выше созданный объект
app.engine('hbs', hbs.engine)

// теперь можно использовать движок шаблонизатора в связке express и handlebars 
// регеситрируем 
app.set('view engine', 'hbs') // 2-й параметр(строка hbs) должна совпадать с 1-м параметром выше ф-и app.engine
// регестрируем где будут храниться все наши виды(шаблоны)
app.set('views', 'views') // 1-й параметр стандартное названи шаблонизатора, а 2-й параметр это название папки где будут храниться наши виды, его можно придумать любое

// чтобы express мог парсить req.body при отправке данных формы
app.use(express.urlencoded({extended: true}))

// для работы со статическими файлами(например index.css)
// указываем путь до такой папки, это текущий путь +(конкатенация) public
app.use(express.static(path.join(__dirname, 'public')))

// регестрируем middleware
// роутинг
app.use(todoRoutes)

// подключение в БД

// пароль пользователя бд, создавался на их сайте
const passBD = 451111

async function start() {
  try {
    // сначало пытаемся подключиться к БД синхронно
    // 1-й параметр это сслыка на облачную БД из их сайта, после ее копирования и вставки сюда, нужно ее отредактировать, вставить пароль и удалить символы после ? (query запрос), и написать вместо удаленного название таблицы с которой хотим работать (можно придумать любое название)
    // 2-ой параметр это настройки
    await mongoose.connect(`mongodb+srv://ilya:${passBD}@cluster0.aw7mh.mongodb.net/todos`, {
      // чтобы не было ошибок в консоле при разработке
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology:true
    })
    // если подлючились к БД, синхронно далее запускаем сервер(прослушивание порта) 
    app.listen(PORT, () => {
      console.log('Server started...');
    })
  } catch (e) {
    console.log(e);
  }
}

// запускаем выше написанную ф-ю которая подключаеться к БД и запускает прослушку порта
start()


























