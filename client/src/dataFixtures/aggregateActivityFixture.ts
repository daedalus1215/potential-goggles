import { randomDate, randomNumber, randomString } from "@/testUtils/randomUtils";
import { dateTimeFixture } from "./dateTimeFixture";

export const aggregateActivityFixture = () => ({
    activities: [{
        taskId: randomString(),
        title: randomString(),
        date: randomDate(),
        totalTimeToday: randomNumber(),
        times: [dateTimeFixture()]
    }],
    total: randomNumber()
});