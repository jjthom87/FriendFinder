var a = [1,2,3,1,2,3];
var b = [[4,3,2,3,2,3],[5,4,7,9,9,1],[1,5,4,3,2,1],[4,5,1,2,3,4],[1,1,1,1,1,1]]

function MatchMaker(){
	this.c = [];
	this.count = 0;
	this.sum = 0;
	this.index = function(array,arrays){
		if (this.c.length < arrays.length){
			for (var i = 0; i < array.length; i++){
				this.sum += (array[i] - (arrays[this.count][i]));
		}
		this.c.push(this.sum);
		this.count++;
		this.index(array,arrays);
		} else {
			for(var j = 0; j < this.c.length; j++) {
				if (this.c[j] < 0){
				this.c[j] = this.c[j]*-1;
				}
			}
			if (this.c.length === 1) {
				alert("You are officially the first member. Your match will come");
				} else {
				this.c.sort(function(a,b){
					return a === b ? 0 : a < b ? -1: 1
				});
			return this.c[0];
			}
		}
	}
}
var newMatch = new MatchMaker();
// newMatch.index(a,b);

module.exports['match'] = newMatch;


