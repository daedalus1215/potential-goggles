import { randomDate, randomNumber, randomString } from "@/testUtils/randomUtils";
import { dateTimeFixture } from "./dateTimeFixture";

export const aggregateActivityFixture = () => ({
    activities: [{
        _id: randomString(),
        title: randomString(),
        date: randomDate(),
        totalTimeToday: randomNumber(),
        times: [dateTimeFixture()]
    }],
    total: randomNumber()
});