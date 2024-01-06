import { DateTime } from "@/interfaces";
import { randomDate, randomNumber, randomString } from "@/testUtils/randomUtils";

export const dateTimeFixture = ():DateTime => ({
    id: randomString(),
    date: randomDate().toString(),
    time: randomNumber().toString(),
});