export const MASK_PHONE = [
  '+',
  '3',
  '7',
  '5',
  ' ',
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export const rulesPattern = {
  username: {
    required: {
      value: true,
      message: 'Поле не может быть пустым',
    },
    validate: {
      isNumber: (value: string) => /[0-9]+/gi.test(value),
      isLetter: (value: string) => /[A-Za-z]+/g.test(value),
    },
  },
  password: {
    required: {
      value: true,
      message: 'Поле не может быть пустым',
    },
    minLength: 8,
    validate: {
      isNumber: (value: string) => /[0-9]+/gi.test(value),
      isLetter: (value: string) => /[A-ZА-ЯЁ]+/g.test(value),
    },
  },
  phone: {
    required: {
      value: true,
      message: 'Поле не может быть пустым',
    },
    pattern: {
      value: /^\+375\s\((25|29|33|44)\)\s\d{3}(-\d{2}){2}$/,
      message: 'В формате +375 (xx) xxx-xx-xx',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Поле не может быть пустым',
    },
    pattern: {
      value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
      message: 'Введите корректный e-mail',
    },
  },
  lastName: {
    required: {
      value: true,
      message: 'Поле не может быть пустым',
    },
  },
  firstName: {
    required: {
      value: true,
      message: 'Поле не может быть пустым',
    },
  },
};

export const switchStep = (step: number) => {
  switch (step) {
    case 1:
      return {
        typeInputUp: 'text',
        placeholderInputUp: 'Придумайте логин для входа',
        helpsInputUp: 'Используйте для логина латинский алфавит и цифры',
        typeInputDown: 'password',
        placeholderInputDown: 'Пароль',
        helpsInputDown: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
        textButton: 'следующий шаг',
        requaredNameUp: 'username',
        requaredNameDown: 'password',
        rulesUp: {
          required: {
            value: true,
            message: 'Поле не может быть пустым',
          },
          validate: {
            isNumber: (value: string) => /[0-9]+/gi.test(value),
            isLetter: (value: string) => /[A-Za-z]+/g.test(value),
          },
        },
        rulesDown: {
          required: {
            value: true,
            message: 'Поле не может быть пустым',
          },
          minLength: 8,
          validate: {
            isNumber: (value: string) => /[0-9]+/gi.test(value),
            isLetter: (value: string) => /[A-ZА-ЯЁ]+/g.test(value),
          },
        },
      };
    case 2:
      return {
        typeInputUp: 'text',
        placeholderInputUp: 'Имя',
        helpsInputUp: '',
        typeInputDown: 'text',
        placeholderInputDown: 'Фамилия',
        helpsInputDown: '',
        textButton: 'последний шаг',
        requaredNameUp: 'firstName',
        requaredNameDown: 'lastName',
        rulesUp: {
          required: {
            value: true,
            message: 'Поле не может быть пустым',
          },
        },
        rulesDown: {
          required: {
            value: true,
            message: 'Поле не может быть пустым',
          },
        },
      };
    case 3:
      return {
        typeInputUp: 'tel',
        placeholderInputUp: 'Номер телефона',
        helpsInputUp: 'В формате +375 (xx) xxx-xx-xx ',
        typeInputDown: 'email',
        placeholderInputDown: 'E-mail',
        helpsInputDown: '',
        textButton: 'зарегистрироваться',
        requaredNameUp: 'phone',
        requaredNameDown: 'email',
        rulesUp: {
          required: {
            value: true,
            message: 'Поле не может быть пустым',
          },
          pattern: {
            value: /^\+375\s\((25|29|33|44)\)\s\d{3}(-\d{2}){2}$/,
            message: 'В формате +375 (xx) xxx-xx-xx',
          },
        },
        rulesDown: {
          required: {
            value: true,
            message: 'Поле не может быть пустым',
          },
          pattern: {
            value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
            message: 'Введите корректный e-mail',
          },
        },
      };
    default:
      return {
        typeInputUp: '',
        placeholderInputUp: '',
        helpsInputUp: '',
        typeInputDown: '',
        placeholderInputDown: '',
        helpsInputDown: '',
        textButton: '',
        requaredNameUp: 'phone',
        requaredNameDown: 'email',
        rulesUp: {
          required: true,
          pattern: /^[a-zA-Z](?=.*\d)[a-zA-Z0-9-_.]+$/,
        },
        rulesDown: {
          required: true,
          minLength: 8,
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
        },
      };
  }
};
