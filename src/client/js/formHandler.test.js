import {departureNav, add} from "./formHandler";


describe("Time working", () => {
	test("is departureNav working", () => {
		var falseTime = new Date(2020, 2, 12, 0, 0, 0, 0)
		expect(Client.departureNav(falseTime)).toBe(false)
		var trueTime = new Date(2021, 2, 12, 0, 0, 0, 0)
        expect(Client.departureNav(trueTime)).toBe(true)

	}); 

});


	
