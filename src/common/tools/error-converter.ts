/* eslint-disable prettier/prettier */
export class ErrorConverter {
  public static convertErrorToText(errorCode, keyPattern, keyValue): string {
    // errorCode - код ошибки от МонгоДБ, keyPattern - название свойства, keyValue - значение, с котором произошла ошибка
    let result;
    const [key] = Object.entries(keyValue);
    switch (errorCode) {
      case 11000:
        result = `Ошибка! ${key} - уже занят, попробуйте другое.`;
        break;
    }
    return result;
  }
}
