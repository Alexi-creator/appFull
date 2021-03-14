const Router = require('express') // для работы с роутингом
const Todo = require('../models/Todo.js') // для работы с моделью

// инициализируемся от этого модуля и экспортируемся для работы с ним из других мест
const router = Router()

// обрабатываем запрос на корень /
router.get('/', async (req, res) => {
  // синхронно вызываем модель из models/Todo.js
  // и получаем массив данных
  const todos = await Todo.find({}).lean()

  // после рендерим шаблон
  // отдаем index это шаблон index.hbs он попадет в {{{body}}} в main.hbs
  // данный шаблон собереться вместе с main.hbs и другими частями которые указаны в main.hbs
  // 2-ой параметр это объект со свойствами которые передаем нашему собранному шаблону и можем вставить если напишем {{ title }}
  res.render('index', {
    title: 'Todos list',
    isIndex: true, // это для активной ссылки меню в зависимости от страницы на которой находимся
    todos // передаем так же в шаблон как параметр массив с данными 
  }) 
})

// ответ для страницы create при методе get
router.get('/create', (req, res) => {
  // отдаем create это шаблон create.hbs
  res.render('create', {
    title: 'Create todo',
    isCreate: true
  })
})

// ответ для страницы create при методе post (для отправки данных из формы)
router.post('/create', async (req, res) => {
  // создаем объект для отправки в БД с данными из формы
  const todo = new Todo({
    // для поля title описанного в моделе заносим значение из
    // запроса формы input name="title", чтобы express понимал что такое body
    // дописываем логику в middleware index.js
    title: req.body.title
  })
  // далее сохраняем модель
  await todo.save()
  // после синхронного выполнения сохранения модели, делаем редирект на
  // главную страницу где будет показан результат, т.к. начнеться загрузка
  // всех элементов которые есть(которые занесли только что)
  res.redirect('/')
})


// отправка данных на изменение в БД элемента по его id
router.post('/complete', async (req, res) => {
  // поиск в БД записи по id
  const todo = await Todo.findById(req.body.id)
  // меняем у найденного элемента в БД поле completed на противоложное булевое
  // !! оператор сначало делает строку булевой а потом изменяет само булевое значение на противоположное
  todo.completed = !!req.body.completed
  // и сохраняем в БД изменную запись
  await todo.save()
  // и делаем обновление страницы редиректом
  res.redirect('/')
})



module.exports = router















