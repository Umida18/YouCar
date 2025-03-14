export const formatPhoneNumber = (value: string) => {
  // Оставляем только цифры
  let digits = value.replace(/\D/g, "");

  // Если ввели 8 в начале — заменяем на +7
  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }

  // Ограничиваем длину номера до 11 цифр (российский формат)
  if (digits.length > 11) {
    digits = digits.slice(0, 11);
  }

  // Форматируем по маске +7 (XXX) XXX-XX-XX
  let formatted = "+7";
  if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
  if (digits.length >= 4) formatted += `) ${digits.slice(4, 7)}`;
  if (digits.length >= 7) formatted += `-${digits.slice(7, 9)}`;
  if (digits.length >= 9) formatted += `-${digits.slice(9, 11)}`;

  return formatted;
};
