const process_invoke = require("./Service/service_invoke");
const process_balancer = require("./Service/service_balancer");

const PORT = process.argv[2];

if (!PORT) {
  console.log(PORT);
  throw new Error("É necessario informar o parametro de porta");
}

const process_ports = process_invoke();

process_ports.push({
  host: "172.25.220.122",
  port: "3000",
});

const balancer_server = process_balancer(process_ports);

balancer_server.listen(PORT, function () {
  console.table({
    Message: "O balanceador de serviço está rodando",
    Port: PORT,
  });
});
