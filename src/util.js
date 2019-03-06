
export function template(field, value) {
  const data = typeof value === 'number' ? value : JSON.stringify(value);
  const UpperCaseField = field.replace(field[0], field[0].toUpperCase());
  const observable = `@observable ${field} = ${data};\n\n`;
  const action = `@action set${UpperCaseField} = (${field}) => {
    this.${field} = ${field};    
  }\n\n`;
  const getter = `@computed get get${UpperCaseField}() {
    return this.${field};
  }\n\n`;
  return { observable, action, getter };
}
