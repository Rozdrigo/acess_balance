const { spawn } = require("child_process");
const { ports } = require("../config.json");

function process_invoke() {
  let response = ports.map(function (element, index) {
    const processo = spawn("node", [
      "C:/repository/SO_APLICATION/APLICATION/src/index.js",
      element,
    ]);

    processo.stdout.on("data", (dados) => {
      console.log(`Saída do subprocesso N ${index}: ${dados}`);
    });

    processo.stderr.on("data", (erro) => {
      console.error(`Erro do subprocesso N ${index}: ${erro}`);
    });

    processo.on("close", (codigo) => {
      console.log(`O subprocesso  N ${index} finalizou com código  ${codigo}`);
    });

    return {
      host: "localhost",
      port: element,
    };
  });

  return response;
}

module.exports = process_invoke;
