import {app} from "./app"
import {runDb} from "./db/db";
import {SETTINGS} from "./settings";

app.listen(SETTINGS.port, async () => {
    await runDb()
})