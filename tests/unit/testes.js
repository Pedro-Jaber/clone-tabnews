function callbackFunction() {
  console.log("Me chamaram?");
}

test("Nome do teste", callbackFunction);

test("Outro teste", function () {
  console.log("Ue? Me chamaram, mas ta diferente.");
});

test("Mais um teste", () => {
  console.log("Caramba oq ta acontecendo, ta tudo sumindo!");
});

test("Espero que 1 seja 1", () => {
  expect(1).toBe(1);
});
