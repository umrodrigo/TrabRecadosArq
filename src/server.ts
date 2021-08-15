import { Database } from './core/infra';
import { App } from './core/presentation';



Database.getConnection()
    .then((_) => {
        const app = new App();
        app.init();
        app.start(8080);
}).catch(console.error);