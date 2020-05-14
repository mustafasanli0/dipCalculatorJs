function Calculator(divClass) {
  let result = "";

  const btnClass = {
    number: "btn btn-light click",
    operation: "btn btn-info click",
    digit: "decimal function btn btn-secondary click",
    c: "all-clear function btn btn-danger btn-sm click",
    equal: "equal-sign operator btn btn-default click",
  };
  const inputClass = {
    result: "calculator-screen z-depth-1",
  };
  const button = {
    numbers: [],
    operations: [],
    options: [],
  };
  const template = {
    calculator: `<div class="calculator"></div>`,
    calculatorKeys: `<div class="calculator-keys"></div>`,
    result: `<div class="divResult"></div>`,
  };
  const renderAllComponent = (elem) => {
    createComponent(["operations", "numbers", "options"]);
    renderComponent(["result"], "calculator");
    renderComponent(["operations", "numbers", "options"], "calculator-keys");
    clickButton();
  };

  const clickButton = () => {
    $(`.click`).click(function () {
      operations = $(this).attr("value");
      if (validateOperations(operations)) {
        doOperations(operations);
        renderComponent(["result"], "calculator");
        console.log(`lastBtn: ${operations}`);
        console.log(`commands: ${result}`);
      } else console.log("Please Enter Valid Data");
    });
  };

  const validateOperations = (operations) => {
    if (
      operations == "+" ||
      operations == "-" ||
      operations == "*" ||
      operations == "*" ||
      operations == "/" ||
      Number.isInteger(parseInt(operations)) ||
      operations == "." ||
      operations == "clear" ||
      operations == '='
    )
      return true;
    return false;
  };

  const doOperations = (currentOperations) => {
    try {
      if (currentOperations == "=") {
        operationsResult = eval(result);
        operationsResult > configs.treshold
          ? console.log(`Error: Above The Treshold: ${configs.treshold}`)
          : (result = String(operationsResult));
      } else if (currentOperations == "clear") result = result.slice(0, -1);
      else result += currentOperations;
    } catch (error) {
      console.log(error);
    }
  };

  const createComponent = (elemTypeArr) => {
    elemTypeArr.forEach((elemType) => {
      switch (elemType) {
        case "numbers":
          for (let i = 9; i > -1; i--) {
            button.numbers.push(
              `<button type="button" value="${i}" class="${btnClass.number}">${i}</button>`
            );
          }
          break;

        case "options":
          button.options.push(
            `<button type="button" class="${btnClass.digit}" value=".">.</button>`
          );
          button.options.push(
            ` <button type="button" class="${btnClass.c}" value="clear">C</button>`
          );
          button.options.push(
            `<button type="button" class="${btnClass.equal}" value="=">=</button>`
          );
          break;

        case "operations":
          button.operations.push(
            `<button type="button" class="${btnClass.operation}" value="+">+</button>`
          );
          button.operations.push(
            `<button type="button" class="${btnClass.operation}"value="-">-</button>`
          );
          button.operations.push(
            `<button type="button" class="${btnClass.operation}" value="*">&times;</button>`
          );
          button.operations.push(
            `<button type="button" class="${btnClass.operation}"value="/">&divide;</button>`
          );
          break;

        default:
          break;
      }
    });

    console.log(button);
  };
  const renderComponent = (elemTypeArr, divClass) => {
    elemTypeArr.forEach((elemType) => {
      switch (elemType) {
        case "numbers":
          $(`.${divClass}`).append(button.numbers);
          break;

        case "options":
          $(`.${divClass}`).append(button.options);
          break;

        case "operations":
          $(`.${divClass}`).append(button.operations);
          break;

        case "result":
          $(`.${divClass} .divResult`).html(
            `<input type="text" class="${inputClass.result}" value="${result}" disabled />`
          );
          break;

        default:
          break;
      }
    });
  };
  const renderTemplate = () => {
    $(`body`).prepend(template.calculator);
    $(`.${divClass}`).append(template.calculatorKeys);
    $(`.${divClass}`).prepend(template.result);
  };
  return {
    renderTemplate,
    renderAllComponent,
  }; // return Public Api
}
