    // модель для БД здесь устанавливаем какие должны быть поля

const {Schema, model} = require('mongoose') // для работы с бд

// создание конфигурации для будущей модели
const schema = new Schema({
  // название поля в БД и его тип св-ва
  title: {
    type: String, // тип поля строка
    required: true // это означает что это обязательное поле
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// экспортируем модель с названием Todo и схемой модели которую описали выше
module.exports = model('Todo', schema)













