const completedMessages = {
  ATTENTION_NO_PRIORITY: `Заметка была успешно добавлена!
    Так как приоритет не был указан Вами, он автоматически был поставлен на "Неважно".`,
  ATTENTION_NOTE_ADDED: "Заметка была успешно добавлена!",
  WARNING_NO_NAME_AND_TEXT: "Вы не указали название заметки и ее содержание!",
  WARNING_NO_NAME: "Вы не указали название заметки!",
  WARNING_NO_TEXT: "Вы не указали содержание заметки!",
  WARNING_LONG_NAME: "Длина названия заметки не может быть больше 40 символов!",
  WARNING_LONG_NOTE_TEXT:
    "Длина содержания заметки не может быть больше 300 символов!",
}

export default completedMessages
