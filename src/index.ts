import Cluster from "cluster";
import os from "os";

import app from "./app";
import config from "./config/config";

const numCpus = os.cpus().length;

if(Cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`); 

    for(let i = 0; i < numCpus; i++) {
        Cluster.fork();

    }

    Cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        Cluster.fork();
    });

} else {
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
};