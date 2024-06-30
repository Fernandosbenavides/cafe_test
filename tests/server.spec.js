const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  // TEST RUTA GET
  test("GET /cafes devuelve status 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // TEST DE ELIMINAR UN CAFE CON ID QUE NO EXISTE
  test("DELETE /cafes/:id con un id que no existe devuelve 404", async () => {
    const response = await request(server).delete("/cafes/534").set('Authorization', 'Bearer token');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No se encontró ningún cafe con ese id");
  });

  // TEST DE RUTA POST, AGREGA CAFES CORRECTAMENTE
  test("POST /cafes agrega un nuevo café y devuelve 201", async () => {
    const newCafe = { id: 5, nombre: "Chai-Latte" };
    const response = await request(server).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.arrayContaining([newCafe]));
  });

  // TEST DE PUT INTENTANTANDO ACTUALIZAR UN CAFE ENVIANDO UNA ID DIFERENTE.
  test("PUT /cafes/:id devuelve 400 si el id en los parámetros es diferente al id dentro del payload", async () => {
    const updatedCafe = { id: 6, nombre: "Espresso" };
    const response = await request(server).put("/cafes/1").send(updatedCafe);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
  });

  //FALLA INTENCIONAL PARA PROBAR
  test("GET /cafes devuelve status 200 pero se espera un status 404 (falla intencionalmente)", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(404);
  });

});

module.exports = server;