var x = 0;

function streamStats() {

	var data = {
		x: x * 10,
		y: Math.floor(Math.random() * 1000)
	};
	x++;
	return data;

}

module.exports = {

	streamStats: streamStats

};