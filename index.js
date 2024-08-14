import 'dotenv/config';
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Fb from './firebase.js';


const read = readline.createInterface({input, output});
let exit = false;
const fb = new Fb();

while (!exit) {
  const menu = await read.question("0-Sair.\n1-Nova cadastro.\n2-Consultar todos.\n3-Consultar ordenado pelo nome.\n");
  if (menu == 1) {
    console.log("----------------------\n");
    const name = await read.question("Digite o nome do usuário\n");
    const email = await read.question("Digite o e-mail do usuário\n");
    console.log(`\nUsuário ${name} possui o e-mail ${email}\n`);
    console.log("----------------------\n");

    fb.addRegister("clientes", {
      name: name,
      email: email
    })

  } else if (menu == 2) {
    fb.getRegisters("clientes", (snapshot) => {
      snapshot.forEach((item) => {
        console.log(item.val());
      });
    });
  } else if (menu == 3) {
    const response = fb.getRegistersByName("clientes");
    fb.getRegisters("clientes", (snapshot) => {
      snapshot.forEach((item) => {
        console.log(item.val());
      });
    });
  } else if (menu == 0) {
    exit = true;
  }
}

console.log("Final do programa");
read.close();