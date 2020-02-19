import {testDeparture, add} from "./input";


describe("Time working", () => {
	test("is departureNav working", () => {
		var falseTime = new Date(2002, 2, 12, 0, 0, 0, 0)
		expect(testDeparture(falseTime)).toBe(false)
		var trueTime = new Date(2021, 2, 12, 0, 0, 0, 0)
  	expect(testDeparture(trueTime)).toBe(true)
  	expect(add(2,2)).toBe(4);

	});

});
