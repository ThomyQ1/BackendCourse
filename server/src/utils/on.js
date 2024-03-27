process.on("exit", (code) => {
  console.log("El proceso ya terminó");
});

process.on("uncaughtException", (error) =>
  console.log("Ocurrió un error: " + error.message)
);

console.log(process.pid);

process.exit(1);
